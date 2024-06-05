import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Heading from "../../../components/shared/Heading";
import AgreementRequestCard from "../../../components/Dashboard/admin/AgreementRequestCard";

const AgreementRequest = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: agreements = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["agreements"],
    queryFn: async () => {
      const result = await axiosSecure("/agreements");
      return result.data;
    },
  });

  if (isLoading)
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-yellow-500 text-center"></span>
      </div>
    );

  return (
    <>
      <Heading title={"Agreement Request"} />

      {agreements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {agreements.map((agreement) => (
            <AgreementRequestCard
              key={agreement._id}
              refetch={refetch}
              agreement={agreement}
            />
          ))}
        </div>
      ) : (
        <p className="font-bold text-xl text-center mt-20">
          No Agreement Data available now
        </p>
      )}
    </>
  );
};

export default AgreementRequest;
