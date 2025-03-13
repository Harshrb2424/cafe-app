import React, { useState, useEffect } from 'react';
import './CafeApp.css';

const App = () => {
  const [menuData, setMenuData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [roomNumber, setRoomNumber] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    // In a real app, this would be fetched from a file
    const data = {
      "Tea": [
        { name: "Ginger Honey", price: { small: 121, regular: null } },
        { name: "Masala", price: { small: 121, regular: null } },
        { name: "Green Tea", price: { small: 121, regular: null } }
      ],
      "REFROS Ice Blended": [
        { name: "Bata Brorista", price: { small: 142, regular: 164 } },
        { name: "Iced Americano", price: { small: 121, regular: 137 } },
        { name: "Iced Cafe Mocha", price: { small: 145, regular: 192 } },
        { name: "Iced Latte", price: { small: 143, regular: 164 } }
      ],
      "Smoothies": [
        { name: "Chocolate Smoothie", price: { small: 136, regular: 157 } },
        { name: "Mango Affaire", price: { small: 136, regular: 157 } }
      ],
      "Iced Tea/Granites": [
        { name: "Lemon Iced Tea", price: { small: 136, regular: 157 } },
        { name: "Peach Iced Tea", price: { small: 136, regular: 157 } },
        { name: "Green Apple Lemonade", price: { small: 169, regular: 186 } }
      ],
      "Signature Collection": [
        { name: "Mocha", price: { small: 157, regular: 175, large: 189 } },
        { name: "Hot Chocolate", price: { small: 157, regular: 175, large: 189 } }
      ],
      "Cold": [
        { name: "Barista Frappe", price: { small: 193, regular: 214 } },
        { name: "Vanilla", price: { small: 228, regular: 250 } },
        { name: "Brownie", price: { small: 268, regular: 296 } },
        { name: "Berry Frappe", price: { small: 182, regular: 207 } },
        { name: "Barista Blast", price: { small: 239, regular: 257 } },
        { name: "Classic Tiramisu", price: { small: 200, regular: 214 } },
        { name: "Mango Affair", price: { small: 200, regular: 214 } },
        { name: "Classic Mojito", price: { small: 157, regular: 171 } }
      ],
      "Hot Classics": [
        { name: "Cappuccino", price: { small: 126, regular: 136, large: 146 } },
        { name: "Latte", price: { small: 129, regular: 143, large: 161 } },
        { name: "Americano", price: { small: 103, regular: 121, large: 176 } },
        { name: "Brewed", price: { small: 93, regular: 110 } },
        { name: "Espresso", price: { small: 108, regular: 121 } },
        { name: "Macchiato", price: { small: 151, regular: 169, large: 184 } }
      ],
      "Desserts": [
        { name: "Wicked Brownie", price: { small: 214 } },
        { name: "Dark Temptation", price: { small: 213 } },
        { name: "Blueberry Muffin", price: { small: 129 } },
        { name: "Chocochip Muffin", price: { small: 129 } },
        { name: "Almond Muffin", price: { small: 129 } }
      ],
      "ADD ONS": [
        { name: "Espresso", price: { small: 40 } },
        { name: "Chocolate Sauce", price: { small: 25 } },
        { name: "Caramel", price: { small: 25 } },
        { name: "Hazelnut Flavour", price: { small: 25 } },
        { name: "Vanilla Flavour", price: { small: 25 } },
        { name: "Irish Flavour", price: { small: 25 } }
      ],
      "Top It Up": [
        { name: "Vanilla Icecream", price: { small: 50 } }
      ],
      "Food": [
        { name: "Veg Puffs", price: { small: 85 } },
        { name: "Chicken Puffs", price: { small: 100 } },
        { name: "Chocochip Cookies", price: { small: 70 } },
        { name: "Oatmeal", price: { small: 70 } },
        { name: "Chicken Sandwich", price: { small: 162 } },
        { name: "Paneer Sandwich", price: { small: 143 } },
        { name: "Spinach & Corn Sandwich", price: { small: 169 } },
        { name: "Brownie", price: { small: 140 } }
      ]
    };
    
    setMenuData(data);
    setSelectedCategory(Object.keys(data)[0]);
  }, []);

  const addToCart = (item, size) => {
    const newItem = {
      id: Date.now(),
      name: item.name,
      size: size,
      price: item.price[size]
    };
    
    setCart([...cart, newItem]);
    calculateTotal([...cart, newItem]);
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    calculateTotal(updatedCart);
  };

  const calculateTotal = (items) => {
    const sum = items.reduce((total, item) => total + item.price, 0);
    setTotalPrice(sum);
  };

  const handleCheckout = () => {
    if (!roomNumber) {
      setError('Please enter your room number');
      return;
    }
    
    // Prepare the bill message
    let message = `Cafe Order - Room ${roomNumber}\n\n`;
    message += cart.map(item => `${item.name} (${item.size}): ₹${item.price}`).join('\n');
    message += `\n\nTotal Amount: ₹${totalPrice}`;
    message += `\n\nRoom Number: ${roomNumber}`;
    message += '\n\nThank you for your order!';
    
    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the prepared message
    window.open(`https://wa.me/917660873570?text=${encodedMessage}`, '_blank');
  };

  if (!menuData) return <div className="loading-container"><div className="coffee-loading"></div></div>;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Café Menu</h1>
      </header>

      {/* Category Tabs */}
      <div className="categories-container">
        <div className="categories-scroll">
          {Object.keys(menuData).map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="menu-container">
        <h2 className="category-title">{selectedCategory}</h2>
        <div className="menu-items">
          {menuData[selectedCategory].map((item, index) => (
            <div key={index} className="menu-item">
              <h3 className="item-name">{item.name}</h3>
              <div className="size-buttons">
                {item.price.small && (
                  <button
                    onClick={() => addToCart(item, 'small')}
                    className="size-button small"
                  >
                    Small - ₹{item.price.small}
                  </button>
                )}
                {item.price.regular && (
                  <button
                    onClick={() => addToCart(item, 'regular')}
                    className="size-button regular"
                  >
                    Regular - ₹{item.price.regular}
                  </button>
                )}
                {item.price.large && (
                  <button
                    onClick={() => addToCart(item, 'large')}
                    className="size-button large"
                  >
                    Large - ₹{item.price.large}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart */}
      <div className="cart-container">
        <h2 className="cart-title">Your Order</h2>
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty</p>
        ) : (
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-size">({item.size})</span>
                </div>
                <div className="item-actions">
                  <span className="item-price">₹{item.price}</span>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="remove-button"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
            <div className="total-price">
              Total: ₹{totalPrice}
            </div>
            <div className="room-input">
              <label className="room-label">Room Number *</label>
              <input 
                type="text" 
                value={roomNumber}
                onChange={(e) => {
                  setRoomNumber(e.target.value);
                  setError('');
                }}
                className="room-field"
                placeholder="Enter your room number"
              />
              {error && <p className="error-message">{error}</p>}
            </div>
          </div>
        )}
      </div>

      {/* Checkout Button */}
      <div className="checkout-container">
        <button
          onClick={handleCheckout}
          disabled={cart.length === 0}
          className={`checkout-button ${cart.length === 0 ? 'disabled' : ''}`}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default App;