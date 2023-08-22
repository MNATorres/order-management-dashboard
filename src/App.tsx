import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import OrderList from "./components/OrderList/OrderList";

function App() {
  return (
    <div className={styles.container}>
        <Header />
        <OrderList />
    </div>
  );
}

export default App;
