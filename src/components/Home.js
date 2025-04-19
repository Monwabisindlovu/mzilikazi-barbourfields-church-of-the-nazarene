import React from 'react';
import styles from './Home.module.css';
import Footer from '../components/Footer'; // ✅ Keep Footer only
import pastorImg from '../assets/pastor.jpg'; // ✅ Add pastor image

function Home() {
  return (
    <div className={styles.container}>
      {/* ✅ Header removed (already included in App.jsx) */}

      {/* Welcome Section */}
      <div className={styles.welcome}>
        <p>
          We are delighted to welcome you to the online home of the Mzilikazi Church of the Nazarene...
        </p>
      </div>

      {/* Services + Pastor Image Section */}
      <div className={styles.servicesLayout}>
        <div className={styles.servicesText}>
          <h2>Join Our Services</h2>
          <p><strong>Sunday (Service): 09:00 AM – 12:30 PM</strong></p>
          <p><strong>Saturday (Youth): 14:00 PM – 16:00 PM</strong></p>
          <p><strong>Thursday (Women): 14:00 PM – 16:00 PM</strong></p>
        </div>

        <div className={styles.pastorSection}>
          <img src={pastorImg} alt="Pastor" className={styles.pastorImage} />
          <p className={styles.pastorName}>Pastor Rev I. Msipha</p>
        </div>
      </div>

      {/* Address Section */}
      <div className={styles.addressSection}>
        <h3 className={styles.addressHeader}>Church Address</h3>
        <p>Location: 41396 Barbourfields, Bulawayo, Zimbabwe</p>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
