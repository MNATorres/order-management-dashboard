import { useContext } from "react";
import { OrdersContext } from "../components/providers/OrdersProvider";

export function useFilteredOrders() {
  const context = useContext(OrdersContext);
  if (context == null) throw Error("Orders context no initialized");
  return context;
}
