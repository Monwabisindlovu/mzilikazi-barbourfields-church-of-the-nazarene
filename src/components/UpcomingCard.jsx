// src/components/UpcomingCard.jsx
import React from 'react';
import styles from './UpcomingCard.module.css';

const UpcomingCard = ({ title, description, date, mediaUrl, mediaType }) => {
  return (
    <div className={styles.card}>
      {mediaUrl && (
        mediaType === 'image' ? (
          <img src={mediaUrl} alt={title} className={styles.media} />
        ) : (
          <video controls className={styles.media}>
            <source src={mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )
      )}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.date}>{date}</p>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default UpcomingCard;
