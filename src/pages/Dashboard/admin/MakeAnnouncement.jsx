import { TbFidgetSpinner } from "react-icons/tb";
import Heading from "../../../components/shared/Heading";

const MakeAnnouncement = () => {
  const loading = false;

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;

    console.log(title, description);
  };

  return (
    <>
      <Heading title={"Make Announcement"} />
      <div className="w-full max-w-md mx-auto p-8 space-y-3 rounded-xl md:w-1/2">
        <form className="space-y-6" onSubmit={handleSubmit}>
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
              <input
                required
                type="text"
                name="description"
                placeholder="Add Description"
                className="input w-full  border-yellow-500  border "
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
