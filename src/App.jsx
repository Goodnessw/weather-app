import styles from "./App.module.css";
import Weather from "./Components/Weather/Weather";

const App = () => {
	return (
		<div className={styles.App}>
			<Weather />
		</div>
	);
};

export default App;
