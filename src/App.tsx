import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import OrderList from "./components/OrderList/OrderList";
import { OrdersProvider } from "./hooks/useFilterOrders";

function App() {
  return (
    <div className={styles.container}>
      <OrdersProvider>
        <Header />
        <OrderList />
      </OrdersProvider>
    </div>
  );
}

export default App;
