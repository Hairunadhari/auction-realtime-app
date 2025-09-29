import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";

// ✅ CSS bawaan DataTables
import "datatables.net-dt/css/dataTables.dataTables.css";

// ✅ Tambahin plugin responsive
import "datatables.net-responsive";
import "datatables.net-responsive-dt/css/responsive.dataTables.css";

// Aktifkan DataTables
DataTable.use(DT);

export default function TableAuction() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  // 🔹 Fetch data items dari API
  useEffect(() => {
    fetch("http://localhost:5000/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data.items || []))
      .catch((err) => console.error(err));
  }, []);

  // 🔹 Definisi kolom tabel
  const columns = [
    {
      title: "#",
      data: null,
      render: (data, type, row, meta) => meta.row + 1,
    },
    { title: "Product Name", data: "name" },
   {
  title: "Description",
  data: "description",
  render: (data) => {
    if (!data) return "-";
    return data.length > 50 ? data.substring(0, 10) + "..." : data;
  },
},

    { title: "Condition", data: "condition" },
    {
      title: "Image",
      data: "images",
      render: (images, type, row) =>
        images && images.length > 0
          ? `<img src="${images[0]}" alt="${row.name}" style="width:50px;height:50px;border-radius:4px;" />`
          : "No Image",
    },
    { title: "Starting Price", data: "startingPrice" },
    { title: "Estimated Value", data: "estimatedValue" },
    {
      title: "Action",
      data: null,
      orderable: false,
      render: (data, type, row) => {
        return `
          <button class="btn-edit bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
          <button class="btn-delete bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          <button class="btn-create bg-purple-500 text-white px-2 py-1 rounded">Create Room</button>
        `;
      },
    },
  ];

  // 🔹 Event listener untuk tombol di dalam tabel
  useEffect(() => {
    const table = document.querySelector("table");
    if (!table) return;

    table.addEventListener("click", (e) => {
      if (e.target && e.target.classList.contains("btn-create")) {
        const row = items[e.target.closest("tr").rowIndex - 1]; // ambil data row
        navigate(`/auction-room/${row._id}`);
      }
    });
  }, [items, navigate]);

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-lg font-semibold mb-3">Auction Items</h2>
      <DataTable
        data={items}
        columns={columns}
        className="display nowrap stripe hover w-full"
        options={{
          responsive: true, // ✅ aktifkan responsif
          paging: true,
          searching: true,
          autoWidth: false,
        }}
      />
    </div>
  );
}
