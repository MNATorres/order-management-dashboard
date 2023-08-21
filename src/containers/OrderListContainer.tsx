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
    if (filterValue === "DeliverSoon") {
      const filtered = orders.filter(isNearDelivery);
      setFilteredOrders(filtered);
    } else if (filterValue === "") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) => order.status === filterValue);
      setFilteredOrders(filtered);
    }
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

  return (
    <div>
      <OrderList orders={filteredOrders} onFilter={handleFilter} />
    </div>
  );
}
