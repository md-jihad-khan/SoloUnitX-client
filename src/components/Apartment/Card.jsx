import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const Card = ({ apartment }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: async (agreementData) => {
      const { data } = await axiosSecure.post("/agreements", agreementData);
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Applied Successfully !",
        icon: "success",
        iconColor: "#F4C210",
        confirmButtonColor: "#F4C210",
      });
    },
    onError: (error) => {
      if (error.response) {
        Swal.fire({
          title: "You already applied for an apartment!",
          icon: "error",
          iconColor: "#F4C210",
          confirmButtonColor: "#F4C210",
        });
      }
    },
  });

  const handleAgreement = async (apartment) => {
    if (!user) {
      navigate("/login");
      Swal.fire({
        title: "Please Login to Apply ?",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
        iconColor: "#F4C210",
      });
    }

    delete apartment._id;
    const agreement = {
      userName: user.displayName,
      userEmail: user.email,
      ...apartment,
      status: "pending",
      agreementRequestDate: new Date(
        new Date().getTime() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, 10),
    };

    Swal.fire({
      title: "Do you want to apply for this apartment?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#F4C210",
      iconColor: "#F4C210",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Apply it!",
    }).then(() => {
      mutateAsync(agreement);
    });
  };

  return (
    <div className="card border card-compact  bg-base-100 shadow-xl">
      <img
        className="h-2/3 rounded-lg rounded-b-none object-cover"
        src={apartment.apartmentImage}
        alt="Shoes"
      />

      <div className="card-body">
        <div className="text-lg">
          <p>
            <strong>
              Floor No:
              <span className=" ml-2 text-gray-500">{apartment.floorNo}</span>
            </strong>
          </p>
          <p>
            <strong>Block Name:</strong>
            <span className=" ml-2 text-gray-500">{apartment.blockName}</span>
          </p>
          <p>
            <strong>Apartment Name:</strong>
            <span className=" ml-2 text-gray-500">{apartment.apartmentNo}</span>
          </p>
        </div>

        <div className="card-actions justify-end items-center">
          <p className="text-xl">
            Rent: <span className="text-yellow-500">$</span>
            {apartment.rent}
          </p>
          <button
            onClick={() => handleAgreement(apartment)}
            className="btn bg-yellow-500 text-white"
          >
            Agreement
          </button>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  apartment: PropTypes.object,
};

export default Card;
