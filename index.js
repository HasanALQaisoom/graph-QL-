import React, { useState, useEffect } from 'react';
import './App.css';

const Menu = ({ items }) => {
  return (
    <div className="menu">
      {items.map((item) => (
        <div key={item._id} className="menu-item">
          <img
            src={item.image}
            alt={item.name}
            onClick={() => console.log(item.name)}
          />
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch('/api/menuItems')
      .then((response) => response.json())
      .then((data) => setMenuItems(data));
  }, []);

  return <Menu items={menuItems} />;
};
