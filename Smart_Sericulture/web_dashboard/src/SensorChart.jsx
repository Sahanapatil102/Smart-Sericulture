
import { useState, useEffect } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);

function SensorChart({ language = "English" }) {
  const [history, setHistory] = useState([]);

  const chartTranslations = {
    English: {
      temperature: "Temperature (°C)",
      humidity: "Humidity (%)",
    },
    Kannada: {
      temperature: "ತಾಪಮಾನ (°C)",
      humidity: "ತೇವಾಂಶ (%)",
    },
    Hindi: {
      temperature: "तापमान (°C)",
      humidity: "आर्द्रता (%)",
    },
  };

  const t =
    chartTranslations[language] || chartTranslations.English;

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/api/sensors"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch sensor data");
        }

        const sensor = await response.json();

        const currentTime = new Date().toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }
        );

        setHistory((previousHistory) => [
          ...previousHistory.slice(-5),
          {
            time: currentTime,
            temperature: sensor.temperature,
            humidity: sensor.humidity,
          },
        ]);
      } catch (error) {
        console.error("Chart API error:", error);
      }
    };

    fetchSensorData();

    const interval = setInterval(fetchSensorData, 5000);

    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: history.map((item) => item.time),

    datasets: [
      {
        label: t.temperature,
        data: history.map((item) => item.temperature),
        borderColor: "#e76f51",
        backgroundColor: "rgba(231, 111, 81, 0.15)",
        tension: 0.4,
        yAxisID: "yTemperature",
      },
      {
        label: t.humidity,
        data: history.map((item) => item.humidity),
        borderColor: "#2a9d8f",
        backgroundColor: "rgba(42, 157, 143, 0.15)",
        tension: 0.4,
        yAxisID: "yHumidity",
      },
    ],
  };

  const options = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
    },
  },

  scales: {
    yTemperature: {
      type: "linear",
      position: "left",
      beginAtZero: false,
      title: {
        display: true,
        text: t.temperature,
      },
    },

    yHumidity: {
      type: "linear",
      position: "right",
      beginAtZero: false,
      grid: {
        drawOnChartArea: false,
      },
      title: {
        display: true,
        text: t.humidity,
      },
    },
  },
};

  return (
    <div
      style={{
        height: "350px",
        width: "650px",
        maxWidth: "100%",
        margin: "0 auto",
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
}

export default SensorChart;
