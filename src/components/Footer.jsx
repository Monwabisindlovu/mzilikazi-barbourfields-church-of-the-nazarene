import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="church-description">
          <p>
            The Church of the Nazarene is a Protestant Christian church in the
            Wesleyan-Holiness tradition. Organized in 1908, the denomination is
            now home to about 2.5 million members worshipping in more than
            30,000 congregations in 165 world areas.
          </p>
        </div>

        <div className="quick-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="https://www.nazarene.org/manual" target="_blank" rel="noopener noreferrer">Church Manual</a></li>
            {/* Updated to use mailto for email */}
            <li><a href="mailto:innomsipha@gmail.com">innomsipha@gmail.com</a></li>
          </ul>
        </div>

        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=...your_google_map_embed_link_here..."
            allowFullScreen=""
            loading="lazy"
            title="Church Location"
          ></iframe>
        </div>

        <div className="church-info">
          <h4>Church Address</h4>
          <p>41396 Barbourfields, Bulawayo, Zimbabwe</p>
        </div>

        <p className="footer-credit">
  <span>© 2024 Mzilikazi/Barbourfields Church of the Nazarene. All rights reserved.</span>
  <br />
  <span>Designed by Monwabisindlovu</span>
</p>

      </div>
    </footer>
  );
}

export default Footer;
