const AnnouncementCard = () => {
  return (
    <div className="max-w-2xl mx-auto shadow-lg rounded-lg border">
      <div className="px-6 py-5">
        <img src="/logo.svg" alt="" />
        <div className="flex items-start">
          <div className="flex-grow">
            <div className="w-full sm:flex justify-between items-center mb-3">
              {/* <!-- Title --> */}
              <h2 className="text-2xl  font-extrabold   mb-1 sm:mb-0">
                Simple Design Tips
              </h2>
            </div>
            {/* <!-- Card body --> */}
            <div className="flex items-end justify-between whitespace-normal">
              {/* <!-- Paragraph --> */}
              <div className="max-w-md ">
                <p className="mb-2">
                  Lorem ipsum dolor sit amet, consecte adipiscing elit sed do
                  eiusmod tempor incididunt ut labore et dolore.
                </p>

                <p>
                  <strong>Date:</strong>
                  <span className=" ml-2 text-gray-500">12-3-2024</span>
                </p>
                <p>
                  <strong>Author:</strong>
                  <span className=" ml-2 text-gray-500">Md Jihad</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
