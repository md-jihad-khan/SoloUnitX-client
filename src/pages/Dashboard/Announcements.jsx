import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AnnouncementCard from "../../components/Dashboard/AnnouncementCard";
import Heading from "../../components/shared/Heading";

const Announcements = () => {
  const axiosSecure = useAxiosSecure();

  const { data: announcements = [] } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const result = await axiosSecure("/announcements");
      console.log(result.data);
      return result.data;
    },
  });

  return (
    <>
      <Heading title={"All Announcement"} />
      <section className="flex flex-col lg:grid lg:grid-cols-2 justify-center antialiased gap-6 min-h-screen p-4">
        {announcements.map((announcement) => (
          <AnnouncementCard
            key={announcement._id}
            announcement={announcement}
          />
        ))}
      </section>
    </>
  );
};

export default Announcements;
