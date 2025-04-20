import React from 'react';
import Slider from 'react-slick';
import styles from './Home.module.css';
import Footer from '../components/Footer';
import pastorImg from '../assets/pastor.jpg';

// Sample image imports (replace with your actual ones)
import event1 from '../assets/event1.jpg';
import event2 from '../assets/event2.jpg';
import event3 from '../assets/event3.jpg';

function Home() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

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


      {/* Address Section with Google Map */}
      <div className={styles.addressSection}>
        <h3 className={styles.addressHeader}>Church Address</h3>
        <p>Location: 41396 Barbourfields, Bulawayo, Zimbabwe</p>
        <div className={styles.mapContainer}>
          <iframe
            src="https://www.google.com/maps/embed?pb=...your_google_map_embed_link_here..."
            width="200"
            height="150"
            allowFullScreen=""
            loading="lazy"
            title="Church Location"
          ></iframe>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
