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

      {/* Secretary and Church Treasurer */}
      <div className={styles.secondaryLeaders}>
        <div className={styles.secondaryRole}>
          <img
            src="https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/buhle.jpg?raw=true"  // Replace with actual image URL
            alt="Secretary Buhle"
            className={styles.roleImage}
          />
          <p className={styles.roleName}>Secretary</p>
          <p className={styles.rolePerson}>Buhle</p>
        </div>
        <div className={styles.secondaryRole}>
          <img
            src="https://example.com/treasurer-image.jpg"  // Replace with actual image URL
            alt="Church Treasurer Mrs. P. Ncube"
            className={styles.roleImage}
          />
          <p className={styles.roleName}>Church Treasurer</p>
          <p className={styles.rolePerson}>Mrs. P. Ncube</p>
        </div>
      </div>

      {/* Additional Leadership Roles */}
      <div className={styles.additionalLeaders}>
        <div className={styles.additionalRole}>
          <img
            src="https://example.com/sunday-school-image.jpg"  // Replace with actual image URL
            alt="Sunday School Leader Mr. R. Ngulube"
            className={styles.roleImage}
          />
          <p className={styles.roleName}>Sunday School Leader</p>
          <p className={styles.rolePerson}>Mr. R. Ngulube</p>
        </div>
        <div className={styles.additionalRole}>
          <img
            src="https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/mrs%20msipha.jpg?raw=true"  // Replace with actual image URL
            alt="Children's Ministry Mrs. C. Msipha"
            className={styles.roleImage}
          />
          <p className={styles.roleName}>Children's Ministry</p>
          <p className={styles.rolePerson}>Mrs. C. Msipha</p>
        </div>
        <div className={styles.additionalRole}>
          <img
            src="https://example.com/chairman-image.jpg"  // Replace with actual image URL
            alt="Chairman Mr. N. Ncube"
            className={styles.roleImage}
          />
          <p className={styles.roleName}>Chairman</p>
          <p className={styles.rolePerson}>Mr. N. Ncube</p>
        </div>
      </div>
    </div>
  );
}

export default Leadership;
