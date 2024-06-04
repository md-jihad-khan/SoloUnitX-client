import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AgreementRequestCard = ({ agreement, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const { mutateAsync: mutateAccept } = useMutation({
    mutationFn: async (email) => {
      const { data } = await axiosSecure.post(`/agreementAccept/${email}`);
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Accept Successfully !",
        icon: "success",
        iconColor: "#F4C210",
        confirmButtonColor: "#F4C210",
      });
    },
    onError: (error) => {
      if (error.response) {
        Swal.fire({
          title: "Some Error Happened !",
          icon: "error",
          iconColor: "#F4C210",
          confirmButtonColor: "#F4C210",
        });
      }
    },
  });
  const { mutateAsync: mutateReject } = useMutation({
    mutationFn: async (email) => {
      const { data } = await axiosSecure.post(`/agreementReject/${email}`);
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Accept Successfully !",
        icon: "success",
        iconColor: "#F4C210",
        confirmButtonColor: "#F4C210",
      });
    },
    onError: (error) => {
      if (error.response) {
        Swal.fire({
          title: "Some Error Happened !",
          icon: "error",
          iconColor: "#F4C210",
          confirmButtonColor: "#F4C210",
        });
      }
    },
  });

  const handleAccept = async () => {
    await mutateAccept(agreement.userEmail);
    refetch();
  };
  const handleReject = async () => {
    await mutateReject(agreement.userEmail);
    refetch();
  };

  return (
    <>
      <div className="card border card-compact  bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="text-lg">
            <p>
              <span>User Name:</span>
              <strong className=" ml-2 ">{agreement.userName}</strong>
            </p>
            <p>
              <span>
                User Email:
                <strong className=" ml-2 ">{agreement.userEmail}</strong>
              </span>
            </p>
            <p>
              Floor No:
              <strong className=" ml-2 ">{agreement.floorNo}</strong>
            </p>
            <p>
              <span>Block Name:</span>
              <strong className=" ml-2 ">{agreement.blockName}</strong>
            </p>
            <p>
              <span>Apartment Name:</span>
              <strong className=" ml-2 ">{agreement.apartmentNo}</strong>
            </p>
            <p>
              <span>Agreement Request Date :</span>
              <strong className=" ml-2 ">
                {agreement.agreementRequestDate}
              </strong>
            </p>
            <p className="text-xl">
              Rent: <span className="text-yellow-500">$</span>
              {agreement.rent}
            </p>
          </div>

          <div className="card-actions justify-center gap-8  items-center">
            <button
              onClick={handleAccept}
              className="btn bg-yellow-500 text-white"
            >
              Accept
            </button>
            <button
              onClick={handleReject}
              className="btn bg-red-500 text-white"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
AgreementRequestCard.propTypes = {
  agreement: PropTypes.object,
  refetch: PropTypes.func,
};

export default AgreementRequestCard;
