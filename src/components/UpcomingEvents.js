import React from 'react';
import styles from './UpcomingEvents.module.css';

const events = [
  {
    name: "🎄 Christmas Party (Orphans and Widows)",
    category: "Community",
    date: "Dec 24, 2025"
  },
  {
    name: "🚔 Prison Visitations",
    category: "Outreach",
    date: "Nov 10, 2025"
  },
  {
    name: "🏠 Old People's Home Visitation",
    category: "Compassion",
    date: "Oct 18, 2025"
  },
  {
    name: "🏥 Hospital Visitation",
    category: "Health",
    date: "Sep 30, 2025"
  },
  {
    name: "⚽ Sports Events",
    category: "Fun",
    date: "Aug 12, 2025"
  },
  {
    name: "📚 Leadership Seminar",
    category: "Spiritual",
    date: "Jul 5, 2025"
  },
  {
    name: "🌙 All Night Prayer",
    category: "Prayer",
    date: "Jun 2, 2025"
  }
];

function UpcomingEvents() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📅 Upcoming Events</h2>
      <p className={styles.description}>Stay tuned and get involved in our life-changing events!</p>

      <ul className={styles.eventList}>
        {events.map((event, index) => (
          <li
            key={event.name}
            className={styles.eventItem}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className={styles.eventName}>{event.name}</span>
            <div className={styles.eventMeta}>
              <span className={styles.tag}>{event.category}</span>
              <span className={styles.date}>{event.date}</span>
            </div>
            <button className={styles.button}>Learn More</button>
          </li>
        ))}
      </ul>

      <div className={styles.ctaWrapper}>
        <button className={styles.ctaButton}>See All Events</button>
      </div>
    </div>
  );
}

export default UpcomingEvents;
