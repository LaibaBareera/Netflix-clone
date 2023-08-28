import React from 'react';
import '../CSS/Footer.css'; // Import your custom CSS for styling

function Footer() {
  return (
    <div className="footer">
      <div className="footer__top">
        <div className="footer__links">
          <a href="#">FAQ</a>
          <a href="#">Help Center</a>
          <a href="#">Account</a>
          <a href="#">Media Center</a>
        </div>
        <div className="footer__links">
          <a href="#">Investor Relations</a>
          <a href="#">Jobs</a>
          <a href="#">Terms of Use</a>
          <a href="#">Privacy</a>
        </div>
        <div className="footer__links">
          <a href="#">Speed Test</a>
          <a href="#">Legal Notices</a>
          <a href="#">Cookie Preferences</a>
          <a href="#">Contact Us</a>
        </div>
        <div className="footer__links">
          <a href="#">Account</a>
          <a href="#">Ways to Watch</a>
          <a href="#">Corporate Information</a>
          <a href="#">Netflix Originals</a>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="footer__lang">
          <select>
            <option>English</option>
            {/* Other language options */}
          </select>
        </div>
        <div className="footer__social">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-twitter"></i>
        </div>
      </div>
    </div>
  );
}

export default Footer;
