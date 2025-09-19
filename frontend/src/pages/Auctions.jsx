import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Banner from "../partials/Banner";
import TableAuction from "../components/TableAuction";
import SlideCardAuction from "../components/SlideCardAuction";
import ModalAuction from "../components/ModalAuction";

function Auctions() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dataAuctions");
   const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    image: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    setIsModalOpen(false);
    // Tambahkan logic save/update ke backend atau state
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                  List Auctions
                </h1>
              </div>
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <button className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white" onClick={() => setIsModalOpen(true)}>
                  <svg
                    className="fill-current shrink-0 xs:hidden"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="max-xs:sr-only">Add View</span>
                </button>
              </div>
            </div>

            <div className="inline-flex rounded-md shadow-xs pb-5" role="group">
              <button
                type="button"
                onClick={() => setActiveTab("dataAuctions")}
                className={`px-4 py-2 text-sm font-medium border 
            ${
              activeTab === "dataAuctions"
                ? "bg-blue-600 text-white border-blue-600"
                : "text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700"
            } 
            rounded-s-lg`}
              >
                Data Auctions
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("user")}
                className={`px-4 py-2 text-sm font-medium border 
            ${
              activeTab === "user"
                ? "bg-blue-600 text-white border-blue-600"
                : "text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700"
            } 
            rounded-e-lg`}
              >
                View User
              </button>
            </div>

            {/* Cards */}
            <div className="">
              {activeTab === "dataAuctions" && <TableAuction />}
        {activeTab === "user" && <SlideCardAuction />}
            </div>
          </div>
        </main>

        <Banner />
      </div>

        <ModalAuction
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        formData={formData}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}

export default Auctions;
