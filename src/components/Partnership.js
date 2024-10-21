import React, { useState } from 'react';
import styles from './Partnership.module.css';

function Collaboration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert(`Thank you for reaching out, ${name}!`);
    // You can integrate email sending logic here
  };

  return (
    <div className={styles.section}>
      <h2>🤝 Partner with Us</h2>
      <p>
        We are grateful for the continued support of our community as we work to fulfill our mission. Those who feel led to partner with us are welcome to join in advancing God's work.
      </p>
      <p>
        Currently, we are seeking partnerships in <strong>vegetable farming 🌱</strong>, <strong>pre-school education 📚</strong>, and <strong>building a classroom 🏫</strong> to support our growing community.
      </p>
      <p>
        If you are interested in learning more about how you can partner with us, please fill out the form below:
      </p>

      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={styles.inputField}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.inputField}
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className={styles.textareaField}
        />
        <button type="submit" className={styles.contactButton}>Get in Touch</button>
      </form>
    </div>
  );
}

export default Collaboration;
