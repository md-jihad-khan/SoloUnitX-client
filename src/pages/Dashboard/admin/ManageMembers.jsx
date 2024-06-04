import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Heading from "../../../components/shared/Heading";
import Swal from "sweetalert2";

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: members = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const result = await axiosSecure("/members");
      return result.data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.patch(`/member/${id}`);
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

  const handleRemove = async (id) => {
    const result = await Swal.fire({
      title: "Do you want to remove this Member ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#F4C210",
      iconColor: "#F4C210",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes Delete !",
    });

    if (result.isConfirmed) {
      await mutateAsync(id);
      refetch();
    }
  };

  return (
    <>
      <Heading title={"Payment History"} />

      {isLoading ? (
        <div className="min-h-[70vh] flex items-center justify-center">
          <span className="loading text-yellow-500 loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          {members.length ? (
            <div className="overflow-x-auto">
              <table className="table table-sm">
                <thead>
                  <tr className="text-yellow-500">
                    <th>#</th>
                    <th>name</th>
                    <th>email</th>
                    <th>Remove Member</th>

                    {/* Add more table headers as needed */}
                  </tr>
                </thead>
                <tbody>
                  {members.map((member, index) => (
                    <tr key={member._id}>
                      <th>{index + 1}</th>
                      <td>{member.name}</td>
                      <td>{member.email}</td>
                      <td>
                        <button
                          onClick={() => handleRemove(member._id)}
                          className="btn bg-red-50 text-red-800"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="font-bold text-lg mt-2 text-yellow-500 text-center">
              You dont have any member
            </p>
          )}
        </>
      )}
    </>
  );
};

export default ManageMembers;
