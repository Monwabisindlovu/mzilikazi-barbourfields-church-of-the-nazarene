import React from 'react';
import styles from './Leadership.module.css';

function Leadership() {
  return (
    <div className={styles.container}>
      <h2>Leadership</h2>

      {/* Pastor Section */}
      <div className={styles.pastorContainer}>
        <img
          src="https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/pastor.jpg?raw=true"
          alt="Pastor in Charge"
          className={styles.pastorImage}
        />
        <p className={styles.pastorName}>Pastor in Charge Rev I. Msipha</p>
      </div>

      {/* Other Leaders Section */}
      <div className={styles.leaderContainer}>
        <div className={styles.leaderCard}>
          <img
            src="https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/buhle1.jpg?raw=true"
            alt="Secretary Buhle"
            className={styles.leaderImage}
          />
          <div className={styles.leaderName}>Secretary</div>
          <div className={styles.leaderPerson}>Buhle</div>
        </div>

        <div className={styles.leaderCard}>
          <img
            src="https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/mrs%20ncube.jpg?raw=true"
            alt="Church Treasurer Mrs. P. Ncube"
            className={styles.leaderImage}
          />
          <div className={styles.leaderName}>Church Treasurer</div>
          <div className={styles.leaderPerson}>Mrs. P. Ncube</div>
        </div>

        <div className={styles.leaderCard}>
          <img
            src="https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/mr%20ngulube.jpg?raw=true"
            alt="Sunday School Leader Mr. R. Ngulube"
            className={styles.leaderImage}
          />
          <div className={styles.leaderName}>Sunday School Leader</div>
          <div className={styles.leaderPerson}>Mr. R. Ngulube</div>
        </div>

        <div className={styles.leaderCard}>
          <img
            src="https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/mrs%20msipha.jpg?raw=true"
            alt="Children's Ministry Mrs. C. Msipha"
            className={styles.leaderImage}
          />
          <div className={styles.leaderName}>Children's Ministry</div>
          <div className={styles.leaderPerson}>Mrs. C. Msipha</div>
        </div>

        <div className={styles.leaderCard}>
          <img
            src="https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/mrs%20ncube.jpg?raw=true"
            alt="Chairman Mr. N. Ncube"
            className={styles.leaderImage}
          />
          <div className={styles.leaderName}>Chairman</div>
          <div className={styles.leaderPerson}>Mr. N. Ncube</div>
        </div>
      </div>
    </div>
  );
}

export default Leadership;
