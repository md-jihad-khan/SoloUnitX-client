import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Heading from "../../../components/shared/Heading";
import AgreementRequestCard from "../../../components/Dashboard/admin/AgreementRequestCard";

const AgreementRequest = () => {
  const axiosSecure = useAxiosSecure();

  const { data: agreements = [], refetch } = useQuery({
    queryKey: ["agreements"],
    queryFn: async () => {
      const result = await axiosSecure("/agreements");

      return result.data;
    },
  });

  return (
    <>
      <Heading title={"Agreement Request"} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {agreements.map((agreement) => (
          <AgreementRequestCard
            key={agreement._id}
            refetch={refetch}
            agreement={agreement}
          />
        ))}
      </div>
    </>
  );
};

export default AgreementRequest;
