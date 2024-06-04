import PropTypes from "prop-types";

const AnnouncementCard = ({ announcement }) => {
  return (
    <div className=" shadow-lg rounded-lg border">
      <div className="px-6 py-5">
        <img src="/logo.svg" alt="" />
        <div className="flex items-start">
          <div className="flex-grow">
            <div className="w-full sm:flex justify-between items-center mb-3">
              {/* <!-- Title --> */}
              <h2 className="text-2xl  font-extrabold mb-1 sm:mb-0">
                {announcement.title}
              </h2>
            </div>
            {/* <!-- Card body --> */}
            <div className="flex items-end justify-between whitespace-normal">
              {/* <!-- Paragraph --> */}
              <div className="max-w-md ">
                <p className="mb-2">{announcement.description}</p>

                <p>
                  <strong>Date:</strong>
                  <span className=" ml-2 text-gray-500">
                    {announcement.date}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AnnouncementCard.propTypes = {
  announcement: PropTypes.object,
};

export default AnnouncementCard;
