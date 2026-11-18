
import { useState, useEffect } from "react";
import "./FarmerDashboard.css";
import SensorChart from "./SensorChart";

function FarmerDashboard({ onLogout }) {
  const [language, setLanguage] = useState("English");
const [sensorData, setSensorData] = useState({
  temperature: 0,
  humidity: 0,
  light: 0,
  airflow: 0,
  status: "Loading",
});

useEffect(() => {
  const fetchSensorData = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/sensors"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch sensor data");
      }

      const data = await response.json();
      setSensorData(data);
    } catch (error) {
      console.error("Sensor API error:", error);
    }
  };

  fetchSensorData();

  const interval = setInterval(fetchSensorData, 5000);

  return () => clearInterval(interval);
}, []);
  const translations = {
    English: {
      appName: "Smart Sericulture",
      portal: "Farmer Portal",
      welcome: "Welcome, Farmer! 👋",
      description: "Monitor your sericulture farm.",
      farm: "My Farm – Farm 01",
      status: "Farm Status: Active",
      profile: "Farmer Profile",
      farmerName: "Farmer Name",
      farmerNameValue: "Ramesh Kumar",
      farmerId: "Farmer ID",
      mobile: "Mobile Number",
      location: "Farm Location",
      conditions: "Environmental Conditions",
      temperature: "Temperature",
      humidity: "Humidity",
      light: "Light Intensity",
      airflow: "Airflow",
      normal: "Normal",
      warning: "Warning",
      history: "Sensor History",
      historyDescription:
        "Temperature and humidity readings over time",
      alert: "Recent Alert",
      alertMessage:
        "Light intensity is above the configured threshold.",
      logout: "Logout",
      justNow: "Just now",
      temperatureUnit: "°C",
      humidityUnit: "%",
      lightUnit: "lux",
      airflowUnit: "m/s",
      locationValue: "Mysuru, Karnataka",
    },

    Kannada: {
      appName: "ಸ್ಮಾರ್ಟ್ ರೇಷ್ಮೆ ಕೃಷಿ",
      portal: "ರೈತರ ಪೋರ್ಟಲ್",
      welcome: "ಸ್ವಾಗತ ರೈತರೇ! 👋",
      description:
        "ನಿಮ್ಮ ರೇಷ್ಮೆ ಕೃಷಿ ಫಾರ್ಮ್ ಅನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ.",
      farm: "ನನ್ನ ಫಾರ್ಮ್ – ಫಾರ್ಮ್ 01",
      status: "ಫಾರ್ಮ್ ಸ್ಥಿತಿ: ಸಕ್ರಿಯ",
      profile: "ರೈತರ ವಿವರಗಳು",
      farmerName: "ರೈತರ ಹೆಸರು",
      farmerNameValue: "ರಮೇಶ್ ಕುಮಾರ್",
      farmerId: "ರೈತ ಐಡಿ",
      mobile: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
      location: "ಫಾರ್ಮ್ ಸ್ಥಳ",
      conditions: "ಪರಿಸರದ ಪರಿಸ್ಥಿತಿಗಳು",
      temperature: "ತಾಪಮಾನ",
      humidity: "ತೇವಾಂಶ",
      light: "ಬೆಳಕಿನ ತೀವ್ರತೆ",
      airflow: "ಗಾಳಿಯ ಹರಿವು",
      normal: "ಸಾಮಾನ್ಯ",
      warning: "ಎಚ್ಚರಿಕೆ",
      history: "ಸೆನ್ಸರ್ ಇತಿಹಾಸ",
      historyDescription:
        "ಕಾಲಾನುಸಾರ ತಾಪಮಾನ ಮತ್ತು ತೇವಾಂಶದ ಅಳತೆಗಳು",
      alert: "ಇತ್ತೀಚಿನ ಎಚ್ಚರಿಕೆ",
      alertMessage:
        "ಬೆಳಕಿನ ತೀವ್ರತೆಯು ನಿಗದಿತ ಮಿತಿಗಿಂತ ಹೆಚ್ಚಾಗಿದೆ.",
      logout: "ಲಾಗ್ ಔಟ್",
      justNow: "ಈಗಷ್ಟೇ",
      temperatureUnit: "°C",
      humidityUnit: "%",
      lightUnit: "ಲಕ್ಸ್",
      airflowUnit: "ಮೀ/ಸೆ",
      locationValue: "ಮೈಸೂರು, ಕರ್ನಾಟಕ",
    },

    Hindi: {
      appName: "स्मार्ट रेशम पालन",
      portal: "किसान पोर्टल",
      welcome: "स्वागत है किसान! 👋",
      description:
        "अपने रेशम पालन फार्म की निगरानी करें।",
      farm: "मेरा फार्म – फार्म 01",
      status: "फार्म की स्थिति: सक्रिय",
      profile: "किसान की जानकारी",
      farmerName: "किसान का नाम",
      farmerNameValue: "रमेश कुमार",
      farmerId: "किसान आईडी",
      mobile: "मोबाइल नंबर",
      location: "फार्म का स्थान",
      conditions: "पर्यावरण की स्थिति",
      temperature: "तापमान",
      humidity: "आर्द्रता",
      light: "प्रकाश की तीव्रता",
      airflow: "वायु प्रवाह",
      normal: "सामान्य",
      warning: "चेतावनी",
      history: "सेंसर इतिहास",
      historyDescription:
        "समय के अनुसार तापमान और आर्द्रता की रीडिंग",
      alert: "हाल का अलर्ट",
      alertMessage:
        "प्रकाश की तीव्रता निर्धारित सीमा से अधिक है।",
      logout: "लॉग आउट",
      justNow: "अभी",
      temperatureUnit: "°C",
      humidityUnit: "%",
      lightUnit: "लक्स",
      airflowUnit: "मी/से",
      locationValue: "मैसूर, कर्नाटक",
    },
  };

  const t = translations[language];

  return (
    <div className="farmer-dashboard">

      {/* Header */}
      <header className="farmer-header">
        <h2>🐛 {t.appName}</h2>

        <div className="farmer-header-actions">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="English">English</option>
            <option value="Kannada">ಕನ್ನಡ</option>
            <option value="Hindi">हिन्दी</option>
          </select>

          <span>👨‍🌾 {t.portal}</span>

          <button onClick={onLogout}>
            {t.logout}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="farmer-content">

        {/* Welcome */}
        <h1>{t.welcome}</h1>
        <p>{t.description}</p>

        {/* Farm Information */}
        <div className="farm-info">
          <h3>🌱 {t.farm}</h3>
          <p>{t.status}</p>
        </div>

        {/* Farmer Profile */}
        <div className="farmer-profile">
          <h2>👤 {t.profile}</h2>

          <div className="profile-details">
            <p>
              <strong>{t.farmerName}:</strong>{" "}
              {t.farmerNameValue}
            </p>

            <p>
              <strong>{t.farmerId}:</strong> FARM001
            </p>

            <p>
              <strong>{t.mobile}:</strong> 9876543210
            </p>

            <p>
              <strong>{t.location}:</strong> {t.locationValue}
            </p>
          </div>
        </div>

        {/* Environmental Conditions */}
        <h2>{t.conditions}</h2>

        <div className="farmer-sensor-grid">

          {/* Temperature */}
          <div className="farmer-sensor">
            🌡️
            <h3>{t.temperature}</h3>
            <h2>
              {sensorData.temperature} {t.temperatureUnit}
            </h2>
            <span>{t.normal}</span>
          </div>

          {/* Humidity */}
          <div className="farmer-sensor">
            💧
            <h3>{t.humidity}</h3>
            <h2>
              {sensorData.humidity}{t.humidityUnit}
            </h2>
            <span>{t.normal}</span>
          </div>

          {/* Light Intensity */}
          <div className="farmer-sensor">
            ☀️
            <h3>{t.light}</h3>
            <h2>
              {sensorData.light} {t.lightUnit}
            </h2>
            <span className="warning-text">
              {t.warning}
            </span>
          </div>

          {/* Airflow */}
          <div className="farmer-sensor">
            🌬️
            <h3>{t.airflow}</h3>
            <h2>
              {sensorData.airflow} {t.airflowUnit}
            </h2>
            <span>{t.normal}</span>
          </div>

        </div>

        {/* Sensor History */}
        <div className="farmer-history">
          <h2>📈 {t.history}</h2>

          <p>{t.historyDescription}</p>

          <SensorChart language={language} />
        </div>

        {/* Recent Alert */}
        <div className="farmer-alert">
          <h3>🔔 {t.alert}</h3>

          <p>{t.alertMessage}</p>

          <small>
            {t.farm} · {t.justNow}
          </small>
        </div>

      </main>
    </div>
  );
}

export default FarmerDashboard;
