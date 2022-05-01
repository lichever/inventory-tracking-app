import React from "react";
import ShowItem from "./ShowItem"


function InvertoryList(props) {
  const { items, fetchItems } = props;

  return (
    <div className="container">
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <ShowItem item={item} key={i} fetchItems={fetchItems}/>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InvertoryList;
