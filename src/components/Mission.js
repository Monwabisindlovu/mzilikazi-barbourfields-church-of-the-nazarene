import React from 'react';
import styles from './Mission.module.css';

function Mission() {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <img
          src="https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/statement-of-mission.png?raw=true"
          alt="Church's mission statement"
          className={styles.image}
        />
        <div className={styles.text}>
          <h2 className={styles.title}>Our Mission</h2>
          <p>To make Christlike disciples in</p>
          <div className={styles.rotatingText}>
            <span className={`${styles.word} ${styles.word1}`}>Mzilikazi</span>
            <span className={`${styles.word} ${styles.word2}`}>Bulawayo</span>
            <span className={`${styles.word} ${styles.word3}`}>Zimbabwe</span>
            <span className={`${styles.word} ${styles.word4}`}>Worldwide</span>
          </div>
          <p className={styles.statement}>
            Our Statement of Mission defines who we are, why we exist, and our reason for being.
          </p>
          <a
            href="https://www.nazarene.org/mission"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Read more on the global Nazarene website
          </a>
        </div>
      </div>
    </div>
  );
}

export default Mission;
