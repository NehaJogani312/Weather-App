import styles from './App.module.css';
import Home from './pages/Home';

function App() {
  return (
    <div className={styles.App}>
      <Home/>
      <div className={styles.ellipse1}></div>
      <div className={styles.ellipse2}></div>
      <div className={styles.ellipse3}></div>
      <div className={styles.ellipse4}></div>
    </div>
  );
}

export default App;
