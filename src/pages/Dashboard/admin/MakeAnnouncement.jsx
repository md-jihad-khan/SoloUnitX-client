import { TbFidgetSpinner } from "react-icons/tb";
import Heading from "../../../components/shared/Heading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useRef, useState } from "react";

const MakeAnnouncement = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const { mutateAsync } = useMutation({
    mutationFn: async (announcement) => {
      const { data } = await axiosSecure.post("/announcement", announcement);
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Upload Successfully !",
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
    setLoading(true);

    const title = e.target.title.value;
    const description = e.target.description.value;
    const date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 10);

    const announcement = {
      title,
      description,
      date,
    };

    await mutateAsync(announcement);
    formRef.current.reset();
    setLoading(false);
  };

  return (
    <>
      <Heading title={"Make Announcement"} />
      <div className="w-full max-w-md mx-auto p-8 space-y-3 rounded-xl md:w-1/2">
        <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-1 text-sm">
            <label className="block "> Title</label>
            <input
              required
              type="text"
              name="title"
              placeholder="Add Title"
              className="input w-full text-gray-800 border-yellow-500  border "
            />
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="block">
              Description
            </label>
            <div className="flex items-center relative">
              <textarea
                required
                type="text"
                name="description"
                placeholder="Add Description"
                className="input w-full h-28  border-yellow-500  border "
              />
            </div>
          </div>
          <button
            disabled={loading}
            className="block  w-full p-3 text-center rounded-sm bg-yellow-500 text-white"
            type="submit"
          >
            {loading ? (
              <TbFidgetSpinner className="text-xl text-white animate-spin m-auto" />
            ) : (
              "Upload"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default MakeAnnouncement;
