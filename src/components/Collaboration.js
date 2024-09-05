import React from 'react';
import styles from './Collaboration.module.css';

function Collaboration() {
  return (
    <div className={styles.section}>
      <h2>Partner with Us</h2>
      <p>We are grateful for the continued support of our community as we work to fulfill our mission. Those who feel led to partner with us are welcome to join in advancing God's work.</p>
      <p>
        Currently, we are seeking partnerships in vegetable farming, pre-school education, and building a classroom to support our growing community. 
        If you are interested in learning more about how you can partner with us, please reach out privately to explore how we can work together for the glory of God.
      </p>
      {/* Add more content or a form for contact information here */}
    </div>
  );
}

export default Collaboration;
