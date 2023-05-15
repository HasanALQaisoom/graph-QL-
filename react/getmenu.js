import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { menu } from "../GraphQL/Queries";


function Getmenu() {
  const { error, item, data } = useQuery(menu);
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    //to check if there is packets or not
    if (data) {
        .then(response => response.json())
        .then(data => {
            const items = data.map(item => ({
                id: item.id,
                name: item.name,
                description: item.description,
                price: item.price,
                image: item.image
            }));
        })
        setMenuItems(items)
    }    
  }, [data]);

  return <Menu items={menuItems}/>;
};

export default Getmenu;