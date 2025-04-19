import React from 'react';
import styles from './Home.module.css';
import Footer from '../components/Footer'; // ✅ Keep Footer only

function Home() {
  return (
    <div className={styles.container}>
      {/* ✅ Header removed (already included in App.jsx) */}

      {/* Welcome Section */}
      <div className={styles.welcome}>
        <p>
          We are delighted to welcome you to the online home of the Mzilikazi/Barbourfields Church of the Nazarene...
        </p>
        <p className={styles.additionalInfo}>
          You will find more information on the links above
        </p>
      </div>

      {/* Services and Images */}
      <div className={styles.imageContainer}>
        <div className={styles.servicesAndAddress}>
          <div className={styles.services}>
            <h2 className={styles.servicesHeader}>Sunday Services</h2>
            <p><strong>Join us every Sunday from 09:00 AM to 12:30 PM for worship.</strong></p>
            <p><strong>Join our youth services every Saturday from 14:00 PM to 16:00 PM.</strong></p>
            <p><strong>Join our women services every Thursday from 14:00 PM to 16:00 PM.</strong></p>
          </div>

          <div className={styles.addressSection}>
            <h3 className={styles.addressHeader}>Church Address</h3>
            <p>Location: 41396 Barbourfields, Bulawayo, Zimbabwe</p>
          </div>
        </div>

        <div className={styles.centerImageContainer}>
          <img
            src="https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/images/IMG-20240830-WA0029.jpg?raw=true"
            alt="Service 1"
            className={`${styles.serviceImage} ${styles.vibration}`}
          />
          <p className={styles.msipha}>Mr. & Mrs. Msipha</p>
        </div>

        <img
          src="https://github.com/Monwabisindlovu/portfolio-landing_page/blob/main/holiness-movement-church-of-the-nazarene-christianity-church-leaf-plant-black-and-white-symbol-logo-brand.png?raw=true"
          alt="Holy Bible"
          className={styles.sideImage}
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
