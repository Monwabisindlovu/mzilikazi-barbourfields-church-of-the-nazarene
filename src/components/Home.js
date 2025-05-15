import React from 'react';
import styles from './Home.module.css';
import Footer from '../components/Footer';
import pastorImg from '../assets/pastor.jpg';
import MoreAboutNazarenes from '../components/MoreAboutNazarenes';

function Home() {
  return (
    <div className={styles.container}>
      {/* Welcome Section */}
      <section className={`${styles.card} ${styles.fadeIn}`}>
        <div className={styles.welcome}>
          <h1 className={styles.heading}>Welcome to Mzilikazi Church of the Nazarene</h1>
          <p className={styles.introText}>
            We are delighted to welcome you to our online home. Discover a family of faith,
            hope, and love as we worship and grow together in Christ.
          </p>
          <div className={styles.verseBox}>
            <p className={styles.verseRef}>Matthew 11:28</p>
            <p className={styles.verseText}>
              "Come to me, all you who are weary and burdened, and I will give you rest."
            </p>
          </div>
        </div>
      </section>

      {/* Services & Pastor Section */}
      <section className={`${styles.card} ${styles.fadeIn}`}>
        <div className={styles.servicesSection}>
          <div className={styles.servicesText}>
            <h2 className={styles.servicesHeader}>Join Our Services</h2>
            <p><strong>Sunday Service:</strong> 09:00 AM – 12:30 PM</p>
            <p><strong>Youth (Saturday):</strong> 14:00 PM – 16:00 PM</p>
            <p><strong>Women (Thursday):</strong> 14:00 PM – 16:00 PM</p>
          </div>

          <div className={styles.pastorSection}>
            <img src={pastorImg} alt="Pastor" className={styles.pastorImage} />
            <p className={styles.pastorName}>Pastor Rev I. Msipha</p>
            <p className={styles.pastorQuote}>A bond-servant of the Lord Jesus Christ.</p>
          </div>
        </div>
      </section>

      {/* More About Nazarenes */}
      <section className={`${styles.card} ${styles.fadeIn}`}>
        <MoreAboutNazarenes />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;