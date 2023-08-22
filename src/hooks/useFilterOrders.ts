import { useEffect, useState } from "react";
import { MockedOrder } from "../services/api";
import { getOrderList } from "../services/OrdersService";

export function useFilteredOrders() {
  const [orders, setOrders] = useState<MockedOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<MockedOrder[]>([]);
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

    if (filterValue === "DeliverSoon") {
      filtered = filtered.filter(isNearDelivery);
    } else if (filterValue !== "") {
      filtered = filtered.filter((order) => order.status === filterValue);
    }

    if (startDate && endDate) {
      filtered = filtered.filter((order) =>
        isTravelingAndInDateRange(order, startDate, endDate)
      );
    }
    setFilteredOrders(filtered);
  };

  const isNearDelivery = (order: MockedOrder) => {
    if (order.status === "Approve") {
      const currentDate = new Date();
      const [day, month, year] = order.shippingPromise.split("/").map(Number);
      const deliveryDate = new Date(year, month - 1, day);
      const timeDifference = deliveryDate.getTime() - currentDate.getTime();
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
      
      return daysDifference <= 2;
    }
    return false;
  };

  const isTravelingAndInDateRange = (
    order: MockedOrder,
    start: Date,
    end: Date
  ) => {
    if (order.status === "Traveling") {
      const [day, month, year] = order.createDate.split("/").map(Number);
      const orderCreateDate = new Date(year, month - 1, day);

      const isInRange = orderCreateDate >= start && orderCreateDate <= end;
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
