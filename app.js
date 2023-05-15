import React from 'react';
import './App.css';

const Menu = ({ items }) => {
  return (
      <div className="menu">
        {items.map(item => (
            <div key={item.id} className="menu-item">
              <img src={item.image} alt={item.name} onClick={() => console.log(item.name)} />
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>{item.price}</p>
            </div>
        ))}
      </div>
  );
};

const App = () => {
  const menuItems = [
    {
      id: 1,
      name: 'Pizza',
      description: 'Delicious pizza with tomato sauce and cheese',
      price: '$10',
      image: 'https://images.pexels.com/photos/803290/pexels-photo-803290.jpeg'
    },
    {
      id: 2,
      name: 'Pasta',
      description: 'Pasta with tomato sauce and meatballs',
      price: '$12',
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg'
    },
    {
      id: 3,
      name: 'Burger',
      description: 'Juicy burger with lettuce and tomato',
      price: '$8',
      image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg'
    },
    {
      id: 4,
      name: 'Salad',
      description: 'Fresh salad with lettuce, tomato, and cucumber',
      price: '$7',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
    }
  ];

  return <Menu items={menuItems} />;
};

export default App;