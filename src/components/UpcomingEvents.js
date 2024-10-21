import React from 'react';
import styles from './UpcomingEvents.module.css'; // Importing the styles

function UpcomingEvents() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📅 Upcoming Events</h2>
      <p className={styles.description}>Stay tuned for our exciting upcoming events and activities!</p>
      <ul className={styles.eventList}>
        <li className={styles.eventItem}>🎄 Christmas Party (Orphans and Widows)</li>
        <li className={styles.eventItem}>🚔 Prison Visitations</li>
        <li className={styles.eventItem}>🏠 Old People's Home Visitation</li>
        <li className={styles.eventItem}>🏥 Hospital Visitation</li>
        <li className={styles.eventItem}>⚽ Sports Events</li>
        <li className={styles.eventItem}>📚 Leadership Seminar</li> {/* Added Leadership Seminar */}
        <li className={styles.eventItem}>🌙 All Night Prayer</li> {/* Added All Night Prayer */}
      </ul>
    </div>
  );
}

export default UpcomingEvents;
