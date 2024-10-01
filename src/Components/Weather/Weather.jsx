import { useEffect } from "react";
import { getImageUrl } from "../../utils";
import styles from "./Weather.module.css";
import { useState } from "react";
import clear_icon from "/assets/clear.png";
import drizzle_icon from "/assets/drizzle.png";
import rain_icon from "/assets/rain.png";
import snow_icon from "/assets/snow.png";
import { useRef } from "react";

const Weather = () => {
	const inputRef = useRef();
	const [weatherData, setWeatherData] = useState(false);

	const allIcons = {
		"01d": clear_icon,
		"01n": clear_icon,
		"02n": clear_icon,
		"03d": clear_icon,
		"03n": clear_icon,
		"04d": drizzle_icon,
		"04n": drizzle_icon,
		"09d": rain_icon,
		"09n": rain_icon,
		"10d": rain_icon,
		"10n": rain_icon,
		"13d": snow_icon,
		"13n": snow_icon,
	};

	const search = async city => {
		if (city == "") {
			alert("Enter City Name");
			return;
		}
		try {
			const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
				import.meta.env.VITE_APP_ID
			}`;

			const response = await fetch(url);
			const data = await response.json();

			if (!response.ok) {
				alert(data.message);
				return;
			}

			console.log(data);
			const icon = allIcons[data.weather[0].icon] || getImageUrl("clear.png");
			setWeatherData({
				humidity: data.main.humidity,
				windSpeed: data.wind.speed,
				temperature: Math.floor(data.main.temp),
				location: data.name,
				icon: icon,
			});
			// eslint-disable-next-line no-unused-vars
		} catch (error) {
			setWeatherData(false);
			console.error("Error in fetching weather data");
		}
	};
	useEffect(() => {
		search("London");
	});

	return (
		<div className={styles.weather}>
			<div className={styles.searchBar}>
				<input ref={inputRef} type="text" placeholder="search" />
				<img
					src={getImageUrl("search.png")}
					alt="search-icon"
					onClick={() => search(inputRef.current.value)}
				/>
			</div>
			{weatherData ? (
				<>
					<img
						className={styles.weatherIcon}
						src={weatherData.icon}
						alt="Clear-icon"
					/>
					<p className={styles.temperature}>{weatherData.temperature}</p>
					<p className={styles.location}>{weatherData.location}</p>
					<div className={styles.weatherData}>
						<div className={styles.col}>
							<img src={getImageUrl("humidity.png")} alt="humidity-image" />
							<div>
								<p>{weatherData.humidity}%</p>
								<span>Humidity</span>
							</div>
						</div>
						<div className={styles.col}>
							<img src={getImageUrl("wind.png")} alt="wind-image" />
							<div>
								<p>{weatherData.windSpeed}km/hr</p>
								<span>Wind</span>
							</div>
						</div>
					</div>
				</>
			) : (
				<></>
			)}
		</div>
	);
};

export default Weather;
