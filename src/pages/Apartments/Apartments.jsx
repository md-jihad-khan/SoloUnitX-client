import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import axios from "axios";
import Heading from "../../components/shared/Heading";
import Card from "../../components/Apartment/Card";
import { useQuery } from "@tanstack/react-query";

const Apartments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const axiosPublic = useAxiosPublic();

  const { data: apartments = [], isLoading } = useQuery({
    queryKey: ["apartments", currentPage],
    queryFn: async () => {
      const response = await axiosPublic.get(
        `/api/apartments?page=${currentPage}`
      );

      setTotalPages(response.data.totalPages);

      return response.data.apartments;
    },
  });

  //   useEffect(() => {
  //     const fetchApartments = async () => {
  //       const response = await axiosPublic.get(
  //         `/api/apartments?page=${currentPage}`
  //       );
  //       setApartments(response.data.apartments);
  //       setTotalPages(response.data.totalPages);
  //     };

  //     fetchApartments();
  //   }, [currentPage, axiosPublic]);

  const pages = [...Array(totalPages).keys()].map((element) => element + 1);

  const handlePaginationButton = (value) => {
    setCurrentPage(value);
  };

  return (
    <section className="container w-10/12 mx-auto font-poppins">
      <Heading title={"All Apartments"} />

      {isLoading ? (
        <div className="w-full h-[calc(100vh-250px)] flex">
          <span className="loading mx-auto text-yellow-500 loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {apartments.map((apartment) => (
            <Card key={apartment._id} apartment={apartment} />
          ))}
        </div>
      )}

      <div className="pagination">
        <div className="flex justify-center mt-12">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePaginationButton(currentPage - 1)}
            className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-yellow-500 hover:text-white"
          >
            <div className="flex items-center -mx-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-1 rtl:-scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              <span className="mx-1">previous</span>
            </div>
          </button>
          {pages.map((btnNum) => (
            <button
              onClick={() => handlePaginationButton(btnNum)}
              key={btnNum}
              className={`hidden ${
                currentPage === btnNum ? "bg-yellow-500 text-white" : ""
              } px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md sm:inline hover:bg-yellow-500 hover:text-white`}
            >
              {btnNum}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePaginationButton(currentPage + 1)}
            className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-yellow-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
          >
            <div className="flex items-center -mx-1">
              <span className="mx-1">Next</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-1 rtl:-scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Apartments;
