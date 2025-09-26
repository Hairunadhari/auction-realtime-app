import React, { useEffect, useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt"; // default style
import "datatables.net-dt/css/dataTables.dataTables.css";

DataTable.use(DT);

export default function TableAuction() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items || []);
      })
      .catch((err) => console.error(err));
  }, []);

  const columns = [
    { title: "#", data: null, render: (data, type, row, meta) => meta.row + 1 },
    { title: "Product Name", data: "name" },
    { title: "Description", data: "description" },
    { title: "Condition", data: "condition" },
    {
      title: "Image",
      data: "images",
      render: (images, type, row) =>
        images && images.length > 0 ? (
          `<img src="${images[0]}" alt="${row.name}" style="width:50px;height:50px;border-radius:4px;" />`
        ) : (
          "No Image"
        ),
    },
    { title: "Starting Price", data: "startingPrice" },
    { title: "Estimated Value", data: "estimatedValue" },
    {
      title: "Action",
      data: null,
      render: () =>
        `<a href="#" class="text-blue-500 hover:underline">Edit</a>`,
    },
  ];

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-semibold mb-3">Auction Items</h2>
      <DataTable
        data={items}
        columns={columns}
        className="display nowrap"
        options={{ responsive: true, paging: true, searching: true }}
      />
    </div>
  );
}
