import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  // Mengambil data produk dari API backend
  useEffect(() => {
    fetch("http://localhost:5000/products") // Sesuaikan URL ini dengan API backend Anda
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <a href="#home" className="navbar-item">Home</a>
          <a href="#catalog" className="navbar-item">Catalog</a>
          <a href="#blog" className="navbar-item">Blog</a>
        </div>
      </nav>

     {/* Sections */}
<section id="home" className="section">
  <div className="image-container">
    <img src="/assets/images/Home.jpg" alt="Lunaria Collection" className="home-image" />
  </div>
  <div className="text-container">
    <h1>Welcome to Lunaria Collection</h1>
    <p>Where comfort meets style, Lunaria Collection offers the perfect blend of ease and fashion with soft, breathable fabrics and relaxed fits. 
      Whether at home or on the go, we ensure you stay cozy and look great.</p>
    <h4>Discover our best collections and elevate your everyday wardrobe.</h4>
  </div>
</section>


      <section id="catalog" className="section">
        <h1>Catalog</h1>
        {products.length === 0 ? (
          <p className="loading">Loading...</p>
        ) : (
          <div className="product-list">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="product-image"
                />
                <h2 className="product-name">{product.name}</h2>
                <p className="product-description">{product.description}</p>
                <p className="product-price">${product.price}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section id="blog" className="section">
  <h1>Blog</h1>
  <p>Read our latest articles and updates.</p>
  <div className="blog-container">
    <div className="blog-item">
      <img src="/assets/images/Blog1.jpg" alt="Blog Article 1" className="blog-image" />
      <div className="blog-text">
        <h2>Unfolding Elegance: Pieces That Speak Without Saying a Word</h2>
        <p>Some outfits don’t just sit in your wardrobe—they live, breathe, and spark conversations. Whether it’s
           that breezy midi dress that whispers sophistication or those tailored blazers with a hint of rebellion, each piece in the Lunaria Collection is curated to let you own the room without breaking a sweat.
        </p>
        <a href="/blog/article1" className="read-more">Read More</a>
      </div>
    </div>
    <div className="blog-item">
      <img src="/assets/images/Blog2.jpg" alt="Blog Article 2" className="blog-image" />
      <div className="blog-text">
        <h2>The Art of Effortless Chic: Making Statements in Subtlety</h2>
        <p>Fashion is not about screaming for attention—it’s about walking into a room and letting your 
          vibe do the talking. At Lunaria, we believe in mastering the balance between understated and unforgettable. 
          Dive into this season’s essentials, where timeless meets trendy.</p>
        <a href="/blog/article2" className="read-more">Read More</a>
      </div>
    </div>
    <div className="blog-item">
      <img src="/assets/images/Blog3.jpg" alt="Blog Article 3" className="blog-image" />
      <div className="blog-text">
        <h2>From Coffee Runs to Cocktail Hours: Your Everyday Style Upgrade</h2>
        <p>Who says you can’t slay at 8 a.m. and still look fresh by 8 p.m.? With pieces that effortlessly transition 
          from day to night, Lunaria Collection is here to make sure you stay on point, no matter where the clock takes you.</p>
        <a href="/blog/article3" className="read-more">Read More</a>
      </div>
    </div>
    <div className="blog-item">
      <img src="/assets/images/Blog4.jpg" alt="Blog Article 4" className="blog-image" />
      <div className="blog-text">
        <h2>When Comfort Meets Couture: The New Definition of Luxury</h2>
        <p>Who says you can’t have it all? At Lunaria, we’re redefining luxury with soft, breathable fabrics that feel like a hug 
          and designs that turn heads. Because why choose between comfort and style when you can have both? </p>
        <a href="/blog/article4" className="read-more">Read More</a>
      </div>
    </div>
  </div>

  <aside className="blog-sidebar">
    <h2>@Lunaria Collection</h2>
    <ul>
      <li><strong>How to order? Contact us at the phone number below.</strong></li>
      <li><strong>Contact:</strong> support@lunaria.com</li>
      <li><strong>Phone:</strong> +62 812 3456 7890</li>
      <li><strong>Address:</strong> Jl. Fashion No.123, Jakarta, Indonesia</li>
      <li><strong>Follow Us:</strong></li>
      <ul className="social-links">
        <li><a href="https://www.instagram.com/lunaria">Instagram</a></li>
        <li><a href="https://www.facebook.com/lunaria">Facebook</a></li>
        <li><a href="https://twitter.com/lunaria">Twitter</a></li>
      </ul>
    </ul>
  </aside>
</section>

<section id="footer" className="section">
  <footer className="footer">
    <p>LUNARIA COLLECTION &copy; 2025. All rights reserved.</p>
  </footer>
</section>



      
    </div>
  );
}

export default App;
