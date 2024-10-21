import React from 'react';
import styles from './ContactUs.module.css'; // Importing the CSS styles
import { FaEnvelope, FaPhone } from 'react-icons/fa'; // Importing icons

function ContactUs() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Contact Us</h2>
      <p className={styles.description}>Get in touch with us for more information or assistance.</p>
      <div className={styles.contactInfo}>
        <p>
          <FaEnvelope className={styles.icon} /> {/* Email icon */}
          <strong>Email:</strong> <a href="mailto:innomsipha@gmail.com">innomsipha@gmail.com</a>
        </p>
        <p>
          <FaPhone className={styles.icon} /> {/* Phone icon */}
          <strong>Phone:</strong>
          <br />
          <a href="tel:+263774094307">+263774094307</a>
          <br />
          <a href="tel:+263712920101">+263712920101</a>
        </p>
      </div>
    </div>
  );
}

export default ContactUs;
