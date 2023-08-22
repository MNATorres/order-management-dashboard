import React from "react";
import { useEffect, useState } from "react";
import { OrderData } from "../../domain/OrderData";
import { Filter } from "../../domain/Filters";
import { getOrderList } from "../../services/OrdersService";
import { mapToStatus } from "../../utils/mappers";

interface OrderContextType {
  orders: OrderData[];
  startDate: Date | undefined;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
  setStartDate: (date: Date | undefined) => void;
  filterOrders: (filter: Filter) => void;
}

export const OrdersContext = React.createContext<OrderContextType | null>(null);

export const OrdersProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const fetchOrders = async (filterValue: Filter = Filter.NoFilter) => {
    try {
      const ordersData = await getOrderList({
        status: mapToStatus(filterValue),
        startDate,
        endDate,
        nearExpiration: filterValue === Filter.DeliverSoon
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
