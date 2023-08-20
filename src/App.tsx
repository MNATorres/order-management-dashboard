import OrderListContainer from "./containers/OrderListContainer";
import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import OrderDetailsContainer from "./containers/OrderDetailsContainer";

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <OrderListContainer />
    </div>
  );
}

export default App;
