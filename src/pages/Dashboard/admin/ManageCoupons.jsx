import { useMutation, useQuery } from "@tanstack/react-query";
import Heading from "../../../components/shared/Heading";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageCoupons = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { data: coupons = [], refetch } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const result = await axiosPublic("/coupons");
      return result.data;
    },
  });

  const { mutateAsync: deleteCoupon } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/coupon/${id}`);
      refetch();
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "delete Successfully !",
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

  const { mutateAsync } = useMutation({
    mutationFn: async (couponData) => {
      const { data } = await axiosSecure.post(`/coupon`, couponData);
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Added Coupon Successfully !",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = e.target.couponCode.value;
    const discount = parseInt(e.target.discountPercentage.value);
    const description = e.target.couponDescription.value;
    const couponData = {
      code,
      discount,
      description,
    };
    document.getElementById("my_modal_2").close();
    await mutateAsync(couponData);
    refetch();
  };

  return (
    <>
      <Heading title={"Manage Coupons"} />
      <div className="">
        <table className="table table-xs md:table-sm">
          <thead>
            <tr className="text-yellow-500">
              <th>#</th>
              <th>Coupon code</th>
              <th>Discount Percentage</th>
              <th>Description</th>
              <th>Remove coupon</th>

              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon, index) => (
              <tr key={coupon._id}>
                <th>{index + 1}</th>
                <td>{coupon.code}</td>
                <td>{coupon.discount}%</td>
                <td>{coupon.description}</td>
                <td>
                  <button
                    onClick={() => deleteCoupon(coupon._id)}
                    className="btn  bg-red-50 text-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-6 ">
        <button
          onClick={() => document.getElementById("my_modal_2").showModal()}
          className=" btn bg-yellow-500 text-white"
        >
          Add Coupon
        </button>
      </div>

      <dialog id="my_modal_2" className="modal ">
        <div className="modal-box ">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={handleSubmit}>
            <div className="space-y-1 text-sm">
              <label className="block font-bold text-lg"> Coupon Code:</label>
              <input
                required
                type="text"
                name="couponCode"
                placeholder="Add Coupon Code"
                className="input w-full text-gray-800 border-yellow-500  border "
              />
              <label className="block font-bold text-lg">
                {" "}
                Discount percentage: %
              </label>
              <input
                required
                type="number"
                name="discountPercentage"
                placeholder="Add Discount percentage"
                className="input w-full text-gray-800 border-yellow-500  border "
              />
              <label className="block font-bold text-lg">
                {" "}
                Coupon description:
              </label>
              <input
                required
                type="text"
                name="couponDescription"
                placeholder="Add Description"
                className="input w-full text-gray-800 border-yellow-500  border "
              />
            </div>
            <input
              type="submit"
              className="btn mt-4 w-full bg-yellow-500 text-white"
            />
          </form>
        </div>
      </dialog>
    </>
  );
};

export default ManageCoupons;
