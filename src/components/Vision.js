import React from 'react';
import styles from './Vision.module.css';

function Vision() {
  return (
    <div className={styles.container}>
      <h2>Our Vision</h2>
      <p>
        The vision of the Church of the Nazarene is centered around the mission to make Christlike disciples in the nations. It emphasizes the following key aspects:
      </p>
      <ul>
        <li><strong>Discipleship:</strong> The Church of the Nazarene aims to nurture individuals to become Christlike through spiritual growth and a deepening relationship with God.</li>
        <li><strong>Holiness:</strong> The church upholds the belief in the pursuit of personal holiness and the transformation of life through the Holy Spirit.</li>
        <li><strong>Global Mission:</strong> It seeks to spread the message of Jesus Christ across the world, focusing on both local and international communities.</li>
        <li><strong>Community and Service:</strong> The church emphasizes the importance of living out one's faith in service to others, reflecting Christ's love and compassion in practical ways.</li>
        <li><strong>Empowerment:</strong> It aims to equip and empower individuals for ministry and service within their communities, helping them to actively participate in the mission of the church.</li>
      </ul>
      <p>
        These elements are part of the broader vision to build a global community of believers who are committed to living out their faith and sharing the gospel of Jesus Christ.
      </p>
      <a 
        href="https://asiapacificnazarene.org/about-us/mission-statement/#:~:text=The%20mission%20of%20the%20Church%20of%20the%20Nazarene%20is%20to" 
        target="_blank" 
        rel="noopener noreferrer" 
        className={styles.readMoreLink}
      >
        Read more on the global Nazarene website
      </a>
    </div>
  );
}

export default Vision;
