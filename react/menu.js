import React, { useState, useEffect } from 'react';
import './App.css';



import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import GetUsers from "./Components/GetUsers";
import Form from "./Components/Form";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:6969/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});





const Menu = ({items}) => {
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
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/menu')
        .then(response => response.json())
        .then(data => {
          const items = data.map(item => ({
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.image
          }));
          setMenuItems(items);
        });
  }, []);
  return <Menu items={menuItems} />;
};

export default App;