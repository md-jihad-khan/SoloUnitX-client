import { useQuery } from "@tanstack/react-query";
import Heading from "../../../components/shared/Heading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const PaymentHistory = () => {
  const [search, setSearch] = useState("");
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", search],
    queryFn: async () => {
      const result = await axiosSecure("/payment", {
        params: { search: search },
      });
      return result.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.search.value);
  };

  return (
    <>
      <Heading title={"Payment History"} />
      <div className="flex md:w-1/2 mx-auto items-center gap-2">
        <form onSubmit={handleSearch} className="w-full">
          <label className="flex items-center border-r-0 pr-0">
            <input
              type="text"
              name="search"
              className="w-full input focus:outline-none border border-gray-300 rounded-full rounded-r-none"
              placeholder="Search"
            />
            <button
              type="submit"
              className="btn-square rounded-r-full px-10 bg-yellow-500 text-white"
            >
              <FaSearch />
            </button>
          </label>
        </form>
      </div>

      {isLoading ? (
        <div className="min-h-[70vh] flex items-center justify-center">
          <span className="loading text-yellow-500 loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          {payments.length ? (
            <div className="overflow-x-auto">
              <table className="table table-sm">
                <thead>
                  <tr className="text-yellow-500">
                    <th>#</th>
                    <th>Amount</th>
                    <th>Month</th>
                    <th className="hidden md:block">Date</th>

                    {/* Add more table headers as needed */}
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, index) => (
                    <tr key={payment._id}>
                      <th>{index + 1}</th>
                      <td className="line-clamp-1 h-7 lg:h-full">
                        $ {payment.amount}
                      </td>
                      <td>{payment.month}</td>
                      <td>{payment.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="font-bold text-lg mt-2 text-yellow-500 text-center">
              You dont have any payment history
            </p>
          )}
        </>
      )}
    </>
  );
};

export default PaymentHistory;
