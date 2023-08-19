import styles from './styles.module.scss'


export default function Header() {
  return (
    <div className={styles.title}>
      <p>Order Management Dashboard</p>
      <img
        className={styles.logo}
        src="https://blog.tiendamia.com/wp-content/uploads/2022/08/logo-tm-white.png"
        alt="TiendaMia"
      />
    </div>
  );
}
