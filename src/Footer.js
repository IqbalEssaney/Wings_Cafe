// src/components/Footer.js
import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="footer">
        <p>Wings Cafe has been a beloved establishment in the heart of our community, dedicated to serving delicious food and providing a warm, welcoming atmosphere. Inspired by a passion for quality and a commitment to sustainability, we pride ourselves on using locally sourced ingredients to craft our dishes. Our friendly staff is here to ensure that every visit feels like coming home. Whether you’re here for a quick bite, a cozy meal with friends, or to enjoy our specialty coffee, Wings Cafe is the perfect place to unwind and savor the flavors of our menu. Join us in our mission to create memorable dining experiences for everyone!</p>
      <p>About Wings Cafe | Since 2010 </p>
      <div className="social-links">
        <a href="#facebook" className="social-icon facebook">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="#instagram" className="social-icon instagram">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="#twitter" className="social-icon twitter">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
