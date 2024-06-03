import { useState } from "react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Heading from "../../../components/shared/Heading";
import CheckoutForm from "../../../components/Form/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const MakePayment = () => {
  const [month, setMonth] = useState("");
  const [coupon, setCoupon] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [rent, setRent] = useState(0);
  const axiosSecure = useAxiosSecure();

  const { data: coupons = [] } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/coupons`);

      return data;
    },
  });
  const { data: agreement = {}, isLoading } = useQuery({
    queryKey: ["agrement"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/agreement`);
      setRent(data.rent);
      return data;
    },
  });

  const handleApplyCoupon = () => {
    setError("");
    setSuccess("");
    const foundCoupon = coupons.find(
      (c) => c.code.toUpperCase() === coupon.toUpperCase()
    );
    if (foundCoupon) {
      const discountedAmount = agreement.rent * (foundCoupon.discount / 100);
      setRent(agreement.rent - discountedAmount);
      setSuccess("Coupon Applied Successfully");
    } else {
      setError("Invalid Coupon");
    }
  };

  const closeModal = () => {
    document.getElementById("my_modal_1").checked = false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment process here
    if (!month) {
      Swal.fire({
        icon: "error",
        title: "Please select Month For Payment",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    document.getElementById("my_modal_1").showModal();
    // Redirect to payment page or perform additional actions
  };

  if (isLoading)
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <span className="loading text-yellow-500 loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="max-w-lg mx-auto  rounded">
      <Heading title={"Rent Payment"} />
      <div className=" p-4 rounded-lg bg-yellow-50">
        <div className="mb-4">
          <span className="mr-2 text-gray-700 font-bold">Member Email:</span>
          <span className="">{agreement.userEmail}</span>
        </div>
        <div className="mb-4">
          <span className="mr-2 text-gray-700 font-bold">Floor:</span>
          <span className="">{agreement.floorNo}</span>
        </div>
        <div className="mb-4">
          <span className="mr-2 text-gray-700 font-bold">Block Name:</span>
          <span className="">{agreement.blockName}</span>
        </div>
        <div className="mb-4">
          <span className="mr-2 text-gray-700 font-bold">
            Apartment No/Room No:
          </span>
          <span className="">{agreement.apartmentNo}</span>
        </div>
        <div className="mb-4">
          <span className=" text-gray-700 font-bold mr-2">Rent:</span>
          <span className="">${rent}</span>
        </div>
        <div className="mb-4">
          <span className="block text-gray-700 font-bold">Month:</span>
          <select
            defaultValue="default"
            required
            onChange={(e) => setMonth(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option disabled value="default">
              Select Month
            </option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          type="button"
          className="w-full bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-400"
        >
          Submit
        </button>
      </div>
      <dialog id="my_modal_1" className="modal ">
        <div className="modal-box ">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="mb-4">
            <span className=" text-gray-700 font-bold mr-2">Rent:</span>
            <span className=" font-bold text-lg text-yellow-500">${rent}</span>
          </div>
          <span className="text-red-500">{error} </span>
          <span className="text-green-500">{success} </span>

          <div className="mb-4">
            <span className="block text-gray-700 font-bold">Apply Coupon:</span>
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              className="mt-2 btn bg-yellow-500 text-white"
            >
              Apply
            </button>
          </div>

          <Elements stripe={stripePromise}>
            <CheckoutForm rent={rent} month={month} closeModal={closeModal} />
          </Elements>
        </div>
      </dialog>
    </div>
  );
};

export default MakePayment;
