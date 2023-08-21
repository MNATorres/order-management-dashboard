import { useEffect, useState } from "react";
import OrderList from "../components/OrderList/OrderList";
import { MockedOrder } from "../services/api";
import { getOrderList } from "../services/OrdersService";

export default function OrderListContainer() {
  const [orders, setOrders] = useState<MockedOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<MockedOrder[]>([]); 

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
  }, []);

  const handleFilter = (filterValue: string) => {
    if (filterValue === "") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) => order.status === filterValue);
      setFilteredOrders(filtered);
    }
  };

  return (
    <div>
      <OrderList orders={filteredOrders} onFilter={handleFilter} />
    </div>
  );
}
