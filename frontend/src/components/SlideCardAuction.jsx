function SlideCardAuction() {
  return (
    <div className="flex flex-wrap gap-6 justify-center  ">
      {/* Card 1 */}
      <div className="flex p-5 flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img
          className="object-cover w-full  rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src="https://www.bing.com/th/id/OIP.WwXz9p7Z3pj5k8IQYFloGwHaE6?w=228&h=211&c=8&rs=1&qlt=90&o=6&cb=thwsc5&dpr=1.3&pid=3.1&rm=2"
          alt="Auction Item"
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order. lorem100
          </p>
          <button className="p-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Masuk Room
          </button>
        </div>
      </div>

      {/* Card 2 */}
      <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          src="https://www.bing.com/th/id/OIP.WwXz9p7Z3pj5k8IQYFloGwHaE6?w=228&h=211&c=8&rs=1&qlt=90&o=6&cb=thwsc5&dpr=1.3&pid=3.1&rm=2"
          alt="Auction Item"
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
          </p>
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Masuk Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default SlideCardAuction;
