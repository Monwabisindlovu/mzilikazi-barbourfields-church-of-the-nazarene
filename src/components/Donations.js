import React from 'react';
import styles from './Donations.module.css';

function Donations() {
  return (
    <div className={styles.section}>
      <h2>Donations</h2>
      <p>Your generous donations help us continue our mission. Thank you for your support!</p>
      <p>
        We are looking forward to partnering with anyone interested in vegetable farming, pre-school education, 
        and other community development projects. Our immediate goal is to build a classroom to support our 
        growing community. If you are interested in contributing or partnering with us, please reach out to 
        learn more about how you can get involved.
      </p>
      {/* Add more content or a donation form here */}
    </div>
  );
}

export default Donations;
