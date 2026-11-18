import { useState } from "react";
import "./App.css";
import SensorChart from "./SensorChart";
import Login from "./Login";
import FarmerDashboard from "./FarmerDashboard";
import Alerts from "./Alerts";
const sensorData = {
  English: [
    { name: "Temperature", value: "27.5", unit: "°C", status: "Normal", icon: "🌡️" },
    { name: "Humidity", value: "75", unit: "%", status: "Normal", icon: "💧" },
    { name: "Light Intensity", value: "450", unit: "lux", status: "Warning", icon: "☀️" },
    { name: "Airflow", value: "0.8", unit: "m/s", status: "Normal", icon: "🌬️" },
  ],

  Kannada: [
    { name: "ತಾಪಮಾನ", value: "27.5", unit: "°C", status: "ಸಾಮಾನ್ಯ", icon: "🌡️" },
    { name: "ತೇವಾಂಶ", value: "75", unit: "%", status: "ಸಾಮಾನ್ಯ", icon: "💧" },
    { name: "ಬೆಳಕಿನ ತೀವ್ರತೆ", value: "450", unit: "lux", status: "ಎಚ್ಚರಿಕೆ", icon: "☀️" },
    { name: "ಗಾಳಿಯ ಹರಿವು", value: "0.8", unit: "m/s", status: "ಸಾಮಾನ್ಯ", icon: "🌬️" },
  ],

  Hindi: [
    { name: "तापमान", value: "27.5", unit: "°C", status: "सामान्य", icon: "🌡️" },
    { name: "आर्द्रता", value: "75", unit: "%", status: "सामान्य", icon: "💧" },
    { name: "प्रकाश की तीव्रता", value: "450", unit: "lux", status: "चेतावनी", icon: "☀️" },
    { name: "वायु प्रवाह", value: "0.8", unit: "m/s", status: "सामान्य", icon: "🌬️" },
  ],
};

const translations = {
  English: {
    dashboard: "Admin Dashboard",
    monitor: "Monitor your sericulture farms",
    welcome: "Welcome to Smart Sericulture 👋",
    description: "Monitor environmental conditions and protect your silkworms.",
    environmental: "Environmental Monitoring",
    live: "Live Sensor Data",
    alerts: "Recent Alerts",  
    farmers: "Farmers",
    farms: "Farms",
    reports: "Reports",
    settings: "Settings",
    online: "System Online",
    updated: "Last updated: Just now",
    viewAll: "View All",

    alert1: "Light Intensity Warning",
    alert1Message: "Light intensity is above the configured threshold.",
    alert2: "Temperature Normal",
    alert2Message: "Temperature is within the configured range.",

    farmTime1: "Farm 01 · Just now",
    farmTime2: "Farm 01 · 5 minutes ago",
    footer: "Smart Sericulture Monitoring System © 2026",

    admin: "Admin",
    systemName: "Smart Sericulture System",
  },

  Kannada: {
    dashboard: "ನಿರ್ವಾಹಕರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    monitor: "ನಿಮ್ಮ ರೇಷ್ಮೆ ಕೃಷಿ ಫಾರ್ಮ್‌ಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ",
    welcome: "ಸ್ಮಾರ್ಟ್ ರೇಷ್ಮೆ ಕೃಷಿಗೆ ಸ್ವಾಗತ 👋",
    description: "ಪರಿಸರದ ಸ್ಥಿತಿಯನ್ನು ಗಮನಿಸಿ ರೇಷ್ಮೆ ಹುಳುಗಳನ್ನು ರಕ್ಷಿಸಿ.",
    environmental: "ಪರಿಸರ ಮೇಲ್ವಿಚಾರಣೆ",
    live: "ನೇರ ಸೆನ್ಸರ್ ಮಾಹಿತಿ",
    alerts: "ಇತ್ತೀಚಿನ ಎಚ್ಚರಿಕೆಗಳು",
    farmers: "ರೈತರು",
    farms: "ಫಾರ್ಮ್‌ಗಳು",
    reports: "ವರದಿಗಳು",
    settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    online: "ಸಿಸ್ಟಮ್ ಆನ್‌ಲೈನ್",
    updated: "ಕೊನೆಯ ನವೀಕರಣ: ಈಗಷ್ಟೇ",
    viewAll: "ಎಲ್ಲವನ್ನೂ ವೀಕ್ಷಿಸಿ",

    alert1: "ಬೆಳಕಿನ ತೀವ್ರತೆಯ ಎಚ್ಚರಿಕೆ",
    alert1Message: "ಬೆಳಕಿನ ತೀವ್ರತೆಯು ನಿಗದಿತ ಮಿತಿಗಿಂತ ಹೆಚ್ಚಾಗಿದೆ.",
    alert2: "ತಾಪಮಾನ ಸಾಮಾನ್ಯವಾಗಿದೆ",
    alert2Message: "ತಾಪಮಾನವು ನಿಗದಿತ ವ್ಯಾಪ್ತಿಯಲ್ಲಿದೆ.",

    farmTime1: "ಫಾರ್ಮ್ 01 · ಈಗಷ್ಟೇ",
    farmTime2: "ಫಾರ್ಮ್ 01 · 5 ನಿಮಿಷಗಳ ಹಿಂದೆ",
    footer: "ಸ್ಮಾರ್ಟ್ ರೇಷ್ಮೆ ಕೃಷಿ ಮೇಲ್ವಿಚಾರಣಾ ವ್ಯವಸ್ಥೆ © 2026",

    admin: "ನಿರ್ವಾಹಕರು",
    systemName: "ಸ್ಮಾರ್ಟ್ ರೇಷ್ಮೆ ಕೃಷಿ ವ್ಯವಸ್ಥೆ",
  },

  Hindi: {
    dashboard: "एडमिन डैशबोर्ड",
    monitor: "अपने रेशम पालन फार्म की निगरानी करें",
    welcome: "स्मार्ट सेरीकल्चर में आपका स्वागत है 👋",
    description: "पर्यावरण की स्थिति की निगरानी करें और रेशम के कीड़ों की रक्षा करें।",
    environmental: "पर्यावरण निगरानी",
    live: "लाइव सेंसर डेटा",
    alerts: "हाल के अलर्ट",
    farmers: "किसान",
    farms: "फार्म",
    reports: "रिपोर्ट",
    settings: "सेटिंग्स",
    online: "सिस्टम ऑनलाइन",
    updated: "अंतिम अपडेट: अभी",
    viewAll: "सभी देखें",

    alert1: "प्रकाश की तीव्रता की चेतावनी",
    alert1Message: "प्रकाश की तीव्रता निर्धारित सीमा से अधिक है।",
    alert2: "तापमान सामान्य है",
    alert2Message: "तापमान निर्धारित सीमा के भीतर है।",

    farmTime1: "फार्म 01 · अभी",
    farmTime2: "फार्म 01 · 5 मिनट पहले",
    footer: "स्मार्ट सेरीकल्चर निगरानी प्रणाली © 2026",

    admin: "एडमिन",
    systemName: "स्मार्ट सेरीकल्चर सिस्टम",
  },
}


function App() {
const [language, setLanguage] = useState("English");
const t = translations[language];
const sensors = sensorData[language];
const [userRole, setUserRole] = useState(null);
const [activePage, setActivePage] = useState("dashboard");
if (!userRole) {
  return <Login onLogin={setUserRole} />;
}

if (userRole === "Farmer") {
  return <FarmerDashboard onLogout={() => setUserRole(null)} />;
}
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>🐛 Smart Sericulture</h2>

        <p className="menu-title">
          {language === "Kannada" ? "ಮುಖ್ಯ ಮೆನು" :
          language === "Hindi" ? "मुख्य मेनू" : "MAIN MENU"}
        </p>

        <nav>
          <a
            className={activePage === "dashboard" ? "active" : ""}
            onClick={() => setActivePage("dashboard")}
            style={{ cursor: "pointer" }}
          >
            📊 {language === "Kannada" ? "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್" :
                language === "Hindi" ? "डैशबोर्ड" : "Dashboard"}
          </a>

          <a>
            🌡️ {language === "Kannada" ? "ಸೆನ್ಸರ್ ಮೇಲ್ವಿಚಾರಣೆ" :
                language === "Hindi" ? "सेंसर निगरानी" : "Sensor Monitoring"}
          </a>

          <a
            onClick={() => setActivePage("alerts")}
            style={{ cursor: "pointer" }}
          >
            🔔 {language === "Kannada" ? "ಎಚ್ಚರಿಕೆಗಳು" :
                language === "Hindi" ? "अलर्ट" : "Alerts"}
          </a>
          <a>👨‍🌾 {t.farmers}</a>
          <a>🌱 {t.farms}</a>
          <a>📈 {t.reports}</a>
          <a>⚙️ {t.settings}</a>
        </nav>

        <div className="sidebar-bottom">
          <span>
            {language === "Kannada" ? "ನಿರ್ವಾಹಕ ಫಲಕ" :
            language === "Hindi" ? "एडमिन पैनल" : "Admin Panel"}
          </span>
          <small>{t.systemName}</small>
        </div>
      </aside>

      {/* Main Dashboard */}
      <main className="main-content">
        {/* Top Header */}
        <header className="topbar">
          <div>
            <h1>{t.dashboard}</h1>
            <p>{t.monitor}</p>
          </div>

          <div className="admin-profile">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="Kannada">ಕನ್ನಡ</option>
              <option value="Hindi">हिन्दी</option>
            </select>
            <div className="admin-profile">
              <span>👤 {t.admin}</span>
              <button onClick={() => setUserRole(null)}>Logout</button>
            </div>
          </div>
        </header>

                {/* Conditional Page Content */}
        {activePage === "alerts" ? (
          <Alerts />
        ) : (
          <>
            {/* Welcome Section */}
            <section className="welcome">
              <div>
                <h2>{t.welcome}</h2>
                <p>{t.description}</p>
              </div>

              <span className="online-badge">
                ● {t.online}
              </span>
            </section>

            {/* Sensor Cards */}
            <section className="sensor-grid">
              {sensors.map((sensor) => (
                <div className="sensor-card" key={sensor.name}>
                  <div className="sensor-heading">
                    <span>{sensor.name}</span>
                    <span className="sensor-icon">{sensor.icon}</span>
                  </div>

                  <h2>
                    {sensor.value}
                    <small>{sensor.unit}</small>
                  </h2>

                  <span
                    className={`status ${
                      sensor.status === "Normal" ||
                      sensor.status === "ಸಾಮಾನ್ಯ" ||
                      sensor.status === "सामान्य"
                        ? "normal"
                        : "warning"
                    }`}
                  >
                    ● {sensor.status}
                  </span>
                </div>
              ))}
            </section>

            {/* Graph Section */}
            <section className="graph-section">
            <div className="panel graph-panel">
              <div className="panel-heading">
                <h3>{t.environmental}</h3>
                <span>{t.live}</span>
              </div>

              <div className="large-chart">
                <SensorChart />
              </div>

              <p className="last-updated">{t.updated}</p>
            </div>
            </section>

            {/* Bottom Section */}
            <section className="bottom-grid">

            {/* Recent  Alerts - Left Side */}
            <div className="panel">
                <div className="panel-heading">
                  <h3>{t.alerts}</h3>
                  <span>{t.viewAll}</span>
                </div>

              <div className="alerts-side-by-side">

                <div className="alert warning-alert">
                  <strong>⚠️ {t.alert1}</strong>
                  <p>{t.alert1Message}</p>
                  <small>{t.farmTime1}</small>
                </div>

                <div className="alert normal-alert">
                  <strong>✓ {t.alert2}</strong>
                  <p>{t.alert2Message}</p>
                  <small>{t.farmTime2}</small>
                </div>
              </div>
            </div>
            </section>

            {/* Footer */}
            <footer>{t.footer}</footer>
          </>
        )}
              </main>
    </div>
  );
}

export default App;