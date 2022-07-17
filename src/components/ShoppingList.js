import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  // useEffect hook -- GET implementation
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((res) => res.json())
      .then((items) => setItems(items));
  }, []);

  // add new item - POST implementation
  function handleAddItem(newItem) {
    // console.log("In ShoppingList:", newItem);
    setItems([...items, newItem]);
  }

  // handle update item - cart - UPDATE implementation
  function handleUpdateItem(updatedItem) {
    // console.log("In ShoppingList:", updatedItem);
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  }

  // handle item delete -DELETE implementation
  function handleDeleteItem(deletedItem) {
    // console.log("In ShoppingList:", deletedItem);
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
