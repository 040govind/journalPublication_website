import React from 'react';
import '../style//footer.css';

const Footer = () => {
  return (
    <div className="wrapper">
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <h6>About</h6>
            <p className="footer-text">Scanfcode.com <i>CODE WANTS TO BE SIMPLE </i> is an initiative to help the upcoming programmers with the code. Scanfcode focuses on providing the most efficient code or snippets as the code wants to be simple. We will help programmers build up concepts in different programming languages that include C, C++, Java, HTML, CSS, JavaScript, PHP, and more.</p>
          </div>

          <div className="footer-content">
            <h6>Categories</h6>
            <ul className="footer-links">
              <li><a href="http://scanfcode.com/category/c-language/">C</a></li>
              <li><a href="http://scanfcode.com/category/front-end-development/">UI Design</a></li>
              <li><a href="http://scanfcode.com/category/back-end-development/">PHP</a></li>
              <li><a href="http://scanfcode.com/category/java-programming-language/">Java</a></li>
              <li><a href="http://scanfcode.com/category/android/">Android</a></li>
              <li><a href="http://scanfcode.com/category/templates/">Templates</a></li>
            </ul>
          </div>

          <div className="footer-content">
            <h6>Quick Links</h6>
            <ul className="footer-links">
              <li><a href="http://scanfcode.com/about/">About Us</a></li>
              <li><a href="http://scanfcode.com/contact/">Contact Us</a></li>
              <li><a href="http://scanfcode.com/contribute-at-scanfcode/">Contribute</a></li>
              <li><a href="http://scanfcode.com/privacy-policy/">Privacy Policy</a></li>
              <li><a href="http://scanfcode.com/sitemap/">Sitemap</a></li>
            </ul>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-container">
          <div className="footer-content">
            <p className="footer-copyright">&copy; 2022 All Rights Reserved by <a href="#">Scanfcode</a>.</p>
          </div>

          <div className="footer-content footer-social-icons">
            <a className="footer-icon" href="#"><i className="fab fa-facebook"></i></a>
            <a className="footer-icon" href="#"><i className="fab fa-twitter"></i></a>
            <a className="footer-icon" href="#"><i className="fab fa-linkedin"></i></a>
            <a className="footer-icon" href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;

