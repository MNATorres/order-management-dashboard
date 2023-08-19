import OrderListContainer from "./containers/OrderListContainer";
import styles from "./App.module.scss";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <OrderListContainer />
    </div>
  );
}

export default App;
