import React from 'react';
import styles from './UpcomingEvents.module.css';

import christmasSticker from '../assets/xmas-sticker.avif';
import sportsDay from '../assets/sportsday.avif';
import prisonerWithBible from '../assets/prisonerwithbible (1).jpg';
import nightPrayer from '../assets/nightprayer.jpg';
import leadershipSeminar from '../assets/Leadership Seminar.jpg';
import hospitalVector from '../assets/hospital-vector.jpg';
import elderlyVisit from '../assets/elderly.jpg';

// Events array with extra fields
const events = [
  {
    name: "Christmas Party (Orphans and Widows)",
    category: "Community",
    date: "Dec 24, 2025",
    image: christmasSticker,
    header: "Christmas Celebration",
    description: "Join us in spreading joy to orphans and widows with music, food, and gifts.",
    location: "Mzilikazi Church Grounds",
    venue: "Main Hall",
    startTime: "14:00",
    endTime: "18:00"
  },
  {
    name: "Prison Visitations",
    category: "Outreach",
    date: "Nov 10, 2025",
    image: prisonerWithBible,
    header: "Prison Outreach",
    description: "Bringing hope and prayer to inmates through gospel and encouragement.",
    location: "Bulawayo Central Prison",
    venue: "Chapel Room",
    startTime: "10:00",
    endTime: "13:00"
  },
  {
    name: "Old People's Home Visitation",
    category: "Compassion",
    date: "Oct 18, 2025",
    image: elderlyVisit,
    header: "Compassionate Care",
    description: "Sharing love, songs, and company with the elderly at local homes.",
    location: "Ekuphumuleni Geriatric Home",
    venue: "Lounge Area",
    startTime: "15:00",
    endTime: "17:00"
  },
  {
    name: "Hospital Visitation",
    category: "Health",
    date: "Sep 30, 2025",
    image: hospitalVector,
    header: "Healing Visits",
    description: "Encouraging and praying for patients in nearby hospitals.",
    location: "United Bulawayo Hospitals",
    venue: "Ward C3",
    startTime: "09:00",
    endTime: "12:00"
  },
  {
    name: "Sports Events",
    category: "Fun",
    date: "Aug 12, 2025",
    image: sportsDay,
    header: "Youth Sports Day",
    description: "A day of soccer, races, and fun for community youth.",
    location: "Mzilikazi Sports Grounds",
    venue: "Field A",
    startTime: "10:00",
    endTime: "16:00"
  },
  {
    name: "Leadership Seminar",
    category: "Spiritual",
    date: "Jul 5, 2025",
    image: leadershipSeminar,
    header: "Equipped to Lead",
    description: "Empowering current and future leaders with spiritual principles.",
    location: "Church Conference Room",
    venue: "Seminar Hall",
    startTime: "09:00",
    endTime: "13:00"
  },
  {
    name: "All Night Prayer",
    category: "Prayer",
    date: "Jun 2, 2025",
    image: nightPrayer,
    header: "Night of Intercession",
    description: "An all-night prayer session seeking God's face together.",
    location: "Church Sanctuary",
    venue: "Main Hall",
    startTime: "21:00",
    endTime: "05:00"
  }
];

// Sort events by date (soonest first)
const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

function UpcomingEvents() {
  // Handle Learn More click
  const handleLearnMore = (event) => {
    alert(
      `📅 ${event.header}\n\n` +
      `📝 ${event.description}\n\n` +
      `📍 Location: ${event.location || "To be announced"}\n` +
      `🏛 Venue: ${event.venue || "TBA"}\n` +
      `⏰ Time: ${event.startTime || "TBA"} - ${event.endTime || "TBA"}`
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Upcoming Events</h2>
      <p className={styles.description}>Stay tuned and get involved in our life-changing events!</p>

      <ul className={styles.eventList}>
        {sortedEvents.map((event, index) => (
          <li
            key={event.name}
            className={styles.eventItem}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <img src={event.image} alt={event.header} className={styles.eventImage} />
            <h3 className={styles.eventHeader}>{event.header}</h3>
            <span className={styles.eventName}>{event.name}</span>
            <div className={styles.eventMeta}>
              <span className={styles.tag}>{event.category}</span>
              <span className={styles.date}>{event.date}</span>
            </div>
            <p className={styles.eventDescription}>{event.description}</p>
            <button
              className={styles.button}
              onClick={() => handleLearnMore(event)}
            >
              Learn More
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UpcomingEvents;
