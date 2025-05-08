import React, { useState } from 'react';
import styles from './Partnership.module.css';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Collaboration() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      'your_service_id',     // Replace with actual ID
      'your_template_id',    // Replace with actual template ID
      formData,
      'your_user_id'         // Replace with actual user/public key
    ).then(() => {
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    }).catch(() => {
      toast.error('Something went wrong. Try again!');
    });
  };

  return (
    <div className={styles.section}>
      <div className={styles.overlay}>
        <h2>🤝 Partner with Us</h2>
        <p>Join us in advancing God's work through the following initiatives:</p>

        <div className={styles.cardsContainer}>
          <div className={styles.card}>
            <img src="/images/farming.jpg" alt="Farming" />
            <h3>🌱 Vegetable Farming</h3>
            <p>Support our sustainable garden that feeds the community and educates youth.</p>
          </div>
          <div className={styles.card}>
            <img src="/images/preschool.jpg" alt="Preschool" />
            <h3>📚 Pre-school Education</h3>
            <p>Help us shape the future through early childhood learning opportunities.</p>
          </div>
          <div className={styles.card}>
            <img src="/images/classroom.jpg" alt="Classroom" />
            <h3>🏫 Build a Classroom</h3>
            <p>Contribute to our mission of expanding safe and inspiring learning spaces.</p>
          </div>
        </div>

        <p className={styles.formIntro}>Fill out the form below to get involved or ask questions:</p>
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className={styles.textareaField}
          />
          <button type="submit" className={styles.contactButton}>
            📩 Send Message
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default Collaboration;
