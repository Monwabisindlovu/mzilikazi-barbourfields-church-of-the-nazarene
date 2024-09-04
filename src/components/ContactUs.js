import React from 'react';
import styles from './ContactUs.module.css';

function ContactUs() {
  return (
    <div className={styles.container}>
      <h2>Contact Us</h2>
      <p>Get in touch with us for more information or assistance.</p>
      <p>
        <strong>Email:</strong> <a href="mailto:innomsipha@gmail.com">innomsipha@gmail.com</a>
      </p>
      <p>
        <strong>Phone:</strong>
        <br />
        <a href="tel:+263774094307">+263774094307</a>
        <br />
        <a href="tel:+263712920101">+263712920101</a>
      </p>
    </div>
  );
}

export default ContactUs;
