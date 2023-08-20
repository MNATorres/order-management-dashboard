import { useEffect, useState } from "react";
import OrderList from "../components/OrderList/OrderList";
import { MockedOrder } from "../services/api";
import { getOrderList } from "../services/OrdersService";

export default function OrderListContainer() {
  const [orders, setOrders] = useState<MockedOrder[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const ordersData = await getOrderList();
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    fetchOrders();
  }, []);

  console.log(orders.map)

  return (
    <div>
      <OrderList orders={orders} />
    </div>
  );
}
