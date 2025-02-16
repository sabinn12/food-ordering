import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css"; // Import custom styles
import { FaCheckCircle } from "react-icons/fa"; // Import social and check icons

const Home: React.FC = () => {
  // Food data with Unsplash image URLs
  const foodImages = [
    { id: 1, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', title: 'Burger', price: '$8.99', description: 'A juicy beef burger with fresh vegetables and cheese.' },
    { id: 2, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', title: 'Pizza', price: '$12.99', description: 'Classic Italian pizza with a variety of toppings.' },
    { id: 3, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', title: 'Pasta', price: '$10.99', description: 'Delicious pasta dishes with rich sauces.' },
    { id: 4, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', title: 'Sushi', price: '$15.99', description: 'Fresh and authentic sushi rolls.' },
    { id: 5, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', title: 'Tacos', price: '$7.99', description: 'Spicy and flavorful Mexican tacos.' },
    { id: 6, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80', title: 'Salad', price: '$6.99', description: 'Healthy and refreshing salads.' },
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
          <div className="food-cards row">
            {foodImages.map((food) => (
              <div key={food.id} className="food-card col-sm-6 col-md-4 col-lg-3">
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
          </div>
          <div className="text-center mt-4">
            <Link to="/foods" className="btn btn-secondary">
              View More
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section animate-on-scroll">
        <div className="container">
          <h2>Contact Us</h2>
          <p className="section-description">
            Have questions? Feel free to reach out to us. We're here to help!
          </p>
          <div className="contact-content">
            <div className="contact-form-container">
              <form className="contact-form">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="Your Message"
                    rows={5}
                    required
                    className="form-control"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
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