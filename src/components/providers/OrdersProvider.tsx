import React from "react";
import { useEffect, useState } from "react";
import { OrderData } from "../../domain/OrderData";
import { Filter } from "../../domain/Filters";
import { Status } from "../../domain/Status";
import { getOrderList } from "../../services/OrdersService";

interface OrderContextType {
    orders: OrderData[];
    startDate: Date | undefined;
    endDate: Date | undefined;
    setEndDate: (date: Date | undefined) => void;
    setStartDate: (date: Date | undefined) => void;
    filterOrders: (filter: Filter) => void
}

export const OrdersContext = React.createContext<OrderContextType | null>(null);

export const OrdersProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const fetchOrders = async (filterValue: Filter = Filter.NoFilter) => {
    try {
      const ordersData = await getOrderList({
        status:
          filterValue === Filter.NoFilter
            ? undefined
            : (filterValue as any as Status),
        startDate,
        endDate,
      });
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleFilter = (filterValue: Filter) => {
    fetchOrders(filterValue);
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

  return (
    <OrdersContext.Provider
      value={{
        orders: orders,
        filterOrders: handleFilter,
        setStartDate,
        setEndDate,
        endDate,
        startDate,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
