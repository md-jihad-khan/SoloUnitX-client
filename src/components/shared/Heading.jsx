import PropTypes from "prop-types";

const Heading = ({ title, desc }) => {
  const words = title.split(" ");

  return (
    <>
      <div className="flex items-center justify-center gap-3 text-2xl md:text-5xl mb-10 mt-3  font-poppins font-bold">
        <h3 className="text-yellow-500">{words[0]} </h3>
        <span className="text-2xl md:text-5xl">{words.slice(1).join(" ")}</span>
      </div>

      {desc && <p className="text-center text-lg md:text-xl mt-2">{desc}</p>}
    </>
  );
};
Heading.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
};

export default Heading;
