import React from 'react';
import styles from './Leadership.module.css';

function Leadership() {
  return (
    <div className={styles.container}>
      <h2>Leadership</h2>

      {/* Head Pastor */}
      <div className={styles.pastorContainer}>
        <img
          src="https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/pastor.jpg?raw=true"
          alt="Pastor in Charge"
          className={styles.pastorImage}
        />
        <p className={styles.pastorName}>Pastor in Charge Rev I. Msipha</p>
      </div>

      {/* Secondary Leaders: Secretary and Church Treasurer */}
      <div className={styles.leaderContainer}>
        <div className={styles.leader}>
          <img
            src="https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/buhle1.jpg?raw=true"
            alt="Secretary Buhle"
            className={styles.secretaryImage}
          />
          <div className={styles.secretaryName}>Secretary</div>
          <div className={styles.secretaryPerson}>Buhle</div>
        </div>

        <div className={styles.leader}>
          <img
            src="https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/mrs%20ncube.jpg?raw=true"
            alt="Church Treasurer Mrs. P. Ncube"
            className={styles.treasurerImage}
          />
          <div className={styles.treasurerName}>Church Treasurer</div>
          <div className={styles.treasurerPerson}>Mrs. P. Ncube</div>
        </div>
      </div>

      {/* Additional Leadership Roles */}
      <div className={styles.leaderContainer}>
        <div className={styles.leader}>
          <img
            src="https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/mr%20ngulube.jpg?raw=true"
            alt="Sunday School Leader Mr. R. Ngulube"
            className={styles.schoolLeaderImage}
          />
          <div className={styles.schoolLeaderName}>Sunday School Leader</div>
          <div className={styles.schoolLeaderPerson}>Mr. R. Ngulube</div>
        </div>

        <div className={styles.leader}>
          <img
            src="https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/mrs%20msipha.jpg?raw=true"
            alt="Children's Ministry Mrs. C. Msipha"
            className={styles.childrenLeaderImage}
          />
          <div className={styles.childrenLeaderName}>Children's Ministry</div>
          <div className={styles.childrenLeaderPerson}>Mrs. C. Msipha</div>
        </div>

        <div className={styles.leader}>
          <img
            src="https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/mr%20ncube.jpg?raw=true"
            alt="Chairman Mr. N. Ncube"
            className={styles.chairmanImage}
          />
          <div className={styles.chairmanName}>Chairman</div>
          <div className={styles.chairmanPerson}>Mr. N. Ncube</div>
        </div>
      </div>
    </div>
  );
}

export default Leadership;
