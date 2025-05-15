import React, { useState, useEffect } from 'react';
import styles from './Partnership.module.css';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Environment variables
const SERVICE_ID       = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID      = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const AUTO_REPLY_ID    = process.env.REACT_APP_EMAILJS_AUTO_REPLY_TEMPLATE_ID;
const PUBLIC_KEY       = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

function Collaboration() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    if (PUBLIC_KEY) {
      emailjs.init(PUBLIC_KEY);
      console.log("EmailJS initialized with Public Key:", PUBLIC_KEY);
    } else {
      console.error("EmailJS Public Key is missing.");
      console.log("Env value:", process.env.REACT_APP_EMAILJS_PUBLIC_KEY);
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!SERVICE_ID || !TEMPLATE_ID || !AUTO_REPLY_ID || !PUBLIC_KEY) {
    toast.error("Email service configuration is missing.");
    return;
  }

  // Send message to admin
  emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
    .then(() => {
      // Send auto-reply to user
      const autoReplyParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        time: new Date().toLocaleString()
      };
      return emailjs.send(SERVICE_ID, AUTO_REPLY_ID, autoReplyParams, PUBLIC_KEY);
    })
    .then(() => {
      toast.success('Message sent & confirmation email delivered!');
      setFormData({ name: '', email: '', message: '' });
    })
    .catch((err) => {
      console.error('EmailJS error:', err);
      toast.error('Something went wrong. Please try again.');
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

        <p className={styles.formIntro}>
          Fill out the form below to get involved or ask questions:
        </p>
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
