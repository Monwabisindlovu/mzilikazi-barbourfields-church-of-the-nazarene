import React from 'react';
import styles from './AboutUs.module.css';

function AboutUs() {
  return (
    <div className={styles.container}>
      <a 
        href="https://www.nazarene.org/index.php/manual" 
        target="_blank" 
        rel="noopener noreferrer" 
        className={styles.manualLink}
      >
        You can read our manual here
      </a>
      <div className={styles.text}>
        <h2>About Us</h2>
        <p>Learn more about our mission and values.</p>
        <p>Our community is dedicated to fostering an inclusive and supportive environment.</p>
        
        {/* Articles of Faith */}
        <div className={styles.section}>
          <div className={styles.imageContainerLeft}>
            <img 
              src="https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/articles-of-faith.png?raw=true" 
              alt="Articles of Faith" 
              className={styles.image} 
            />
          </div>
          <div className={styles.textContainer}>
            <h3>Our Articles of Faith</h3>
            <p>
              Our Articles of faith are our foundational beliefs, and set forth the essential truths which guide every area of practice.
            </p>
            <a href="https://www.nazarene.org/who-we-are/articles-faith" target="_blank" rel="noopener noreferrer">
              Read more on the global Nazarene website
            </a>
          </div>
        </div>
        
        {/* Core Values */}
        <div className={styles.section}>
          <div className={styles.textContainer}>
            <h3>Our Core Values</h3>
            <p>
              Our Core Values are the essence of our identity and support the vision of our denomination and help shape our culture.
            </p>
            <a href="https://www.nazarene.org/who-we-are/core-values" target="_blank" rel="noopener noreferrer">
              Read more on the global Nazarene website
            </a>
          </div>
          <div className={styles.imageContainerRight}>
            <img 
              src="https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/core-values.png?raw=true" 
              alt="Core Values" 
              className={styles.image} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
