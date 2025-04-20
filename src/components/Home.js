import React from 'react';
import styles from './Home.module.css';
import Footer from '../components/Footer';
import pastorImg from '../assets/pastor.jpg';
import MoreAboutNazarenes from '../components/MoreAboutNazarenes';



function Home() {

  return (
    <div className={styles.container}>
      {/* Welcome Section */}
      <div className={styles.welcome}>
        <p>
          We are delighted to welcome you to the online home of the Mzilikazi Church of the Nazarene...
        </p>
        <div className={styles.verseInsideWelcome}>
          <p className={styles.verseRef}>Matthew 11:28</p>
          <p className={styles.verseText}>
            "Come to me, all you who are weary and burdened, and I will give you rest."
          </p>
        </div>
      </div>
      <div className={styles.servicesSection}>
  <div className={styles.servicesText}>
    <h2 className={styles.servicesHeader}>Join Our Services</h2>
    <p><strong>Sunday (Service): 09:00 AM – 12:30 PM</strong></p>
    <p><strong>Saturday (Youth): 14:00 PM – 16:00 PM</strong></p>
    <p><strong>Thursday (Women): 14:00 PM – 16:00 PM</strong></p>
  </div>

  <div className={styles.pastorSection}>
    <img src={pastorImg} alt="Pastor" className={styles.pastorImage} />
    <p className={styles.pastorName}>Pastor Rev I. Msipha</p>
    <p className={styles.verseText}>
  A bond-servant of the Lord Jesus Christ.
</p>
  </div>
</div>
<div>
  {/* Some other components */}
  <MoreAboutNazarenes />
  {/* More content */}
</div>

      <Footer />
    </div>
  );
}

export default Home;