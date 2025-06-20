import React, { createContext, useState, useContext } from 'react';
import './Notification.css';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (type, text) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications((prev) => [...prev, { id, type, text }]);

    // Автоматическое скрытие через 5 секунд
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      <div className="notification-container">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`notification ${notif.type}`}
            onClick={() => removeNotification(notif.id)}
          >
            {notif.text}
          </div>
        ))}
      </div>
      {children}
    </NotificationContext.Provider>
  );
};