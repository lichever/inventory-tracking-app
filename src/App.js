import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import { message } from "antd";
import InvertoryList from "./InvertoryList";
import "bootstrap/dist/css/bootstrap.min.css";
import AddItem from "./AddItem";
import ExportCSV from "./ExportCSV";

function App() {
  const [inventories, setInventories] = useState([]);

  const url = "/api/inventory";
  const headers = [
    { label: "Product ID", key: "product_id" },
    { label: "Product Name", key: "name" },
    { label: "Description", key: "description" },
    { label: "Category", key: "category" },
    { label: "Price", key: "price" },
    { label: "Stock", key: "stock" },
  ];

  const produceData = () => {
    const data = [];
    for (let i = 0; i < inventories.length; i++) {
      data[i] = {
        product_id: inventories[i].product_id,
        name: inventories[i].name,
        description: inventories[i].description,
        category: inventories[i].category,
        price: inventories[i].price,
        stock: inventories[i].stock,
      };
    }
    return data;
  };

  produceData();

  const fetchInventories = () => {
    Axios.get(url)
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.data);
          setInventories(res.data);
        }
      })
      .catch((err) => {
        message.error("Fetch inventories failed!");
        console.log("fetch inventories failed: ", err.message);
      });
  };

  useEffect(() => {
    fetchInventories();
  }, []);

  // setTimeout(() => {
  //   console.log(inventories);
  // }, 1000);

  return (
    <div className="App">
      <header className="App-header">Inventory Tracker</header>
   
        <div className="App-ops">
          <AddItem fetchItems={fetchInventories} />
          <ExportCSV
            csvHeaders={headers}
            csvData={produceData()}
            fileName="Inventory.csv"
          />
        </div>
      <InvertoryList items={inventories} fetchItems={fetchInventories} />
    </div>
  );
}

export default App;
