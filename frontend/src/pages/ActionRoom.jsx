import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Banner from "../partials/Banner";

function ActionRoom() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/items/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data))
      .catch((err) => console.error(err));
  }, [id]);

  const [timeLeft, setTimeLeft] = useState(180); // 3 menit = 180 detik
  
    useEffect(() => {
      if (timeLeft <= 0) return;
  
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
  
      return () => clearInterval(timer);
    }, [timeLeft]);
  
    // format jadi menit:detik
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
  if (!item) return <p className="p-6">Loading...</p>;

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-700">
                    Action Room
                  </h2>
                </div>
                <span className="bg-gray-100 px-3 py-1 text-sm rounded-md text-gray-600">
                  #{item._id}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Images */}
                <div className="col-span-1">
                  {item.images && item.images.length > 0 && (
                    <>
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="rounded-lg w-full object-cover mb-3"
                      />
                      <div className="flex gap-2">
                        {item.images.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt={`thumb-${i}`}
                            className="rounded-md w-20 h-16 object-cover cursor-pointer border"
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Auction Info */}
                <div className="col-span-1 space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-3 text-center border rounded-lg p-3 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Time Left</p>
                      <p className="font-semibold">{minutes}:{seconds.toString().padStart(2, "0")}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Auction Ending</p>
                      <p className="font-semibold">Sunday, 9:38PM</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Starting Price</p>
                      <p className="font-semibold">Rp. {item.startingPrice}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Est. Value</p>
                      <p className="font-semibold text-purple-600">
                        Rp. {item.estimatedValue}
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <p>
                    <span className="font-medium">Name:</span> {item.name}
                  </p>
                  <p>
                    <span className="font-medium">Condition:</span>{" "}
                    {item.condition}
                  </p>
                  <p>
                    <span className="font-medium">Description:</span>{" "}
                    {item.description}
                  </p>
                  {/* Bid current */}
                  <div className="mt-6 flex items-center gap-3">
                    <input
                      type="text"
                      placeholder={`Enter your bid (Minimum $${item.startingPrice})`}
                      className="flex-1 border rounded-lg px-4 py-2 text-sm"
                    />
                    <button className="bg-red-600 text-white font-semibold px-6 py-2 rounded-lg">
                      Current Bid
                    </button>
                  </div>
                  {/* Bid Input */}
                  <div className="mt-6 flex items-center gap-3">
                    <input
                      type="text"
                      placeholder={`Enter your bid (Minimum $${item.startingPrice})`}
                      className="flex-1 border rounded-lg px-4 py-2 text-sm"
                    />
                    <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg">
                      Place Bid
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Banner />
      </div>
    </div>
  );
}

export default ActionRoom;
