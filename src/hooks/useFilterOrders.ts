import { useEffect, useState } from "react";
import { getOrderList } from "../services/OrdersService";
import { OrderData } from "../domain/OrderData";
import { Status } from "../domain/Status";
import { Filter } from "../domain/Filters";

export function useFilteredOrders() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderData[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const ordersData = await getOrderList();
        setOrders(ordersData);
        setFilteredOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    fetchOrders();
  }, [startDate, endDate]);

  const handleFilter = (filterValue: string) => {
    let filtered = orders;

    if (filterValue === Filter.DeliverSoon) {
      filtered = filtered.filter(isNearDelivery);
    } else if (filterValue !== Filter.NoFilter) {
      filtered = filtered.filter((order) => order.status === filterValue);
    }

    if (startDate && endDate) {
      filtered = filtered.filter((order) =>
        isTravelingAndInDateRange(order, startDate, endDate)
      );
    }
    console.log(filtered)
    setFilteredOrders(filtered);
  };

  const isNearDelivery = (order: OrderData) => {
    if (order.status === Status.Approve) {
      const timeDifference = order.shippingPromise.getTime() - Date.now();
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
      return daysDifference <= 2;
    }
    return false;
  };

  const isTravelingAndInDateRange = (
    order: OrderData,
    start: Date,
    end: Date
  ) => {
    if (order.status === Status.Traveling) {

      const isInRange = order.createDate >= start && order.createDate <= end;
      return isInRange;
    }
    return false;
  };

  return {
    orders: filteredOrders,
    filterOrders: handleFilter,
    setStartDate,
    setEndDate,
    endDate,
    startDate,
  };
}
