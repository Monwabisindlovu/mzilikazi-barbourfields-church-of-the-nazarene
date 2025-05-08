import React, { useEffect } from 'react';
import styles from './Vision.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Vision() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className={styles.container} id="vision">
      <div className={styles.heroBanner}>
        <h2 className={styles.heroTitle} data-aos="fade-down">Our Vision</h2>
      </div>

      <p className={styles.intro} data-aos="fade-up">
        The vision of the Church of the Nazarene is centered around the mission to make Christlike disciples in the nations. It emphasizes the following key aspects:
      </p>

      <ul className={styles.visionList}>
        <li className={styles.visionCard} data-aos="fade-right">
          <span className={styles.highlight}>👥 Discipleship:</span> The Church of the Nazarene aims to nurture individuals to become Christlike through spiritual growth and a deepening relationship with God.
        </li>
        <li className={styles.visionCard} data-aos="fade-left">
          <span className={styles.highlight}>✨ Holiness:</span> The church upholds the belief in the pursuit of personal holiness and the transformation of life through the Holy Spirit.
        </li>
        <li className={styles.visionCard} data-aos="fade-right">
          <span className={styles.highlight}>🌍 Global Mission:</span> It seeks to spread the message of Jesus Christ across the world, focusing on both local and international communities.
        </li>
        <li className={styles.visionCard} data-aos="fade-left">
          <span className={styles.highlight}>🤝 Community and Service:</span> The church emphasizes the importance of living out one's faith in service to others, reflecting Christ's love and compassion in practical ways.
        </li>
        <li className={styles.visionCard} data-aos="fade-right">
          <span className={styles.highlight}>💪 Empowerment:</span> It aims to equip and empower individuals for ministry and service within their communities, helping them to actively participate in the mission of the church.
        </li>
      </ul>

      <p className={styles.conclusion} data-aos="fade-up">
        These elements are part of the broader vision to build a global community of believers who are committed to living out their faith and sharing the gospel of Jesus Christ.
      </p>

      <a
                 href="https://asiapacificnazarene.org/about-us/mission-statement/#:~:text=The%20mission%20of%20the%20Church%20of%20the%20Nazarene%20is%20to"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Read more on the global Nazarene website
                </a>
    </div>
  );
}

export default Vision;
