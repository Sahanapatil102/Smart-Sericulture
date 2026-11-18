import { useState } from "react";
import "./Alerts.css";

function Alerts() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      farm: "Farm 001",
      parameter: "Temperature",
      value: "36°C",
      severity: "Critical",
      status: "New",
      time: "10:30 AM"
    },
    {
      id: 2,
      farm: "Farm 002",
      parameter: "Humidity",
      value: "45%",
      severity: "Warning",
      status: "New",
      time: "11:00 AM"
    }
  ]);

  const acknowledgeAlert = (id) => {
    setAlerts(alerts.map(alert =>
      alert.id === id
        ? { ...alert, status: "Acknowledged" }
        : alert
    ));
  };

  const resolveAlert = (id) => {
    setAlerts(alerts.map(alert =>
      alert.id === id
        ? { ...alert, status: "Resolved" }
        : alert
    ));
  };

  return (
    <div className="alerts-container">
      <h2>Alert Management</h2>
      <p>Monitor and manage farm sensor alerts.</p>

      <div className="alerts-list">
        {alerts.map(alert => (
          <div className="alert-card" key={alert.id}>
            <h3>{alert.parameter} Alert</h3>

            <p><strong>Farm:</strong> {alert.farm}</p>
            <p><strong>Reading:</strong> {alert.value}</p>
            <p><strong>Severity:</strong> {alert.severity}</p>
            <p><strong>Time:</strong> {alert.time}</p>
            <p><strong>Status:</strong> {alert.status}</p>

            {alert.status === "New" && (
              <button onClick={() => acknowledgeAlert(alert.id)}>
                Acknowledge
              </button>
            )}

            {alert.status === "Acknowledged" && (
              <button onClick={() => resolveAlert(alert.id)}>
                Mark as Resolved
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Alerts;
