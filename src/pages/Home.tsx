import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaCheckCircle, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Home: React.FC = () => {
  // Food data with Unsplash image URLs
  const foodImages = [
    { id: 1, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', title: 'Burger', price: '$8.99', description: 'A juicy beef burger with fresh vegetables .' },
    { id: 2, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', title: 'Pizza', price: '$12.99', description: 'Classic Italian pizza with a variety of toppings.' },
    { id: 3, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', title: 'Pasta', price: '$10.99', description: 'Delicious pasta dishes with rich sauces.' },
    { id: 4, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', title: 'Sushi', price: '$15.99', description: 'Fresh and authentic sushi rolls.' },
    
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        } else {
          entry.target.classList.remove('animate');
        }
      });
    });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => observer.observe(element));

    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
    
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="home-page" id="home">
      {/* Hero Section */}
      <section id="hero" className="hero-section animate-on-scroll ">
        <div className="hero-overlay">
          <div className="container h-100 d-flex align-items-center justify-content-center">
            <div className="row w-100">
              <div className="col-md-6 text-center text-md-left mx-auto" style={{ marginTop: '20px' }}>
                <div className="hero-text">
                  <h1>Welcome to Food Ordering App</h1>
                  <p className="lead">
                    Order your favorite food online and get it delivered to your
                    doorstep in no time! Enjoy a wide variety of cuisines from the best restaurants in town.
                  </p>
                  <div className="hero-buttons">
                    <Link to="/foods" className="btn btn-primary">
                      Order Now
                    </Link>
                    <Link to="/contact" className="btn btn-secondary">
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 d-none d-md-block">
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  alt="Delicious Food"
                  className="img-fluid rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section animate-on-scroll">
        <div className="container">
          <h2>About Us</h2>
          <p className="section-description">
            We are passionate about delivering the best food experience to our
            customers. Our chefs use only the freshest ingredients to create
            mouth-watering dishes.
          </p>
          <div className="about-cards row shadow p-3 mb-5 bg-white rounded">
            <div className="about-card col-md-4">
              <FaCheckCircle className="about-icon" />
              <h3>Fresh Ingredients</h3>
              <p>
                We source our ingredients from local farms to ensure the highest
                quality and freshness.
              </p>
            </div>
            <div className="about-card col-md-4">
              <FaCheckCircle className="about-icon" />
              <h3>Expert Chefs</h3>
              <p>
                Our chefs are trained in both traditional and modern culinary
                techniques.
              </p>
            </div>
            <div className="about-card col-md-4">
              <FaCheckCircle className="about-icon" />
              <h3>Fast Delivery</h3>
              <p>
                Enjoy your favorite meals delivered to your doorstep in no time.
              </p>
            </div>
          </div>
        </div>
      </section>

     {/* Foods Section */}
     <section id="foods" className="foods-section animate-on-scroll">
        <div className="container">
          <h2>Our Foods</h2>
          <p className="section-description">
            Explore our wide range of delicious foods, from traditional dishes to
            modern cuisine.
          </p>
          <Slider {...settings}>
            {foodImages.map((food) => (
              <div key={food.id} className="food-card">
                <img
                  src={food.imageUrl}
                  alt={food.title}
                  className="img-fluid rounded"
                />
                <h3>{food.title}</h3>
                <p className="food-price">{food.price}</p>
                <p>{food.description}</p>
                <Link to="/order" className="btn btn-primary">
                  Order Now
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </section>
   {/* Contact Section */}
<section id="contact" className="contact-section animate-on-scroll">
  <div className="container">
    <h2>Contact Us</h2>
    <p className="section-description">
      Have questions? Feel free to reach out to us. We're here to help!
    </p>
    <div className="row contact-row">
      {/* Contact Information Side */}
      <div className="col-md-5">
        <div className="contact-info-card">
          <h3>Get in Touch</h3>
          
          <div className="contact-item">
            <div className="contact-icon">
              <FaEnvelope />
            </div>
            <div className="contact-details">
              
              <p>support@foodorderingapp.com</p>
              <p>support@foodorderingapp.com</p>
            </div>
          </div>
          
          <div className="contact-item">
            <div className="contact-icon ">
              <FaMapMarkerAlt />
            </div>
            <div className="contact-details">
              
              <p>KN 37 ST Kicukiro District</p>
              <p>Kigali Rwanda</p>
            </div>
            
          </div>
          
          <div className="contact-item">
            <div className="contact-icon">
              <FaPhoneAlt />
            </div>
            <div className="contact-details">
              
              <p>+250 787199684</p>
              <p>+250 787199684</p>
            </div>
          </div>
          
          <div className="social-links">
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>
      
      {/* Contact Form Side */}
      <div className="col-md-7">
        <form className="contact-form">
          <div className="row"> 
            <div className="col-md-6 form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                required
                className="form-control"
              />
            </div>
            <div className="col-md-6 form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                required
                className="form-control"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              required
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              rows={5}
              required
              className="form-control"
            ></textarea>
          </div>
          
          <button type="submit" className="btn btn-primary btn-block">
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default Home;