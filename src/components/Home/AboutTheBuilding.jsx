import Heading from "../shared/Heading";
import apartment from "../../assets/appartment.png";
import mark from "../../assets/mark2.png";
import { motion } from "framer-motion";

const flipAnimation = {
  rotateY: [0, 360], // Array for flipping from 0 to 180 degrees
  scale: 1, // Maintain original scale
  transition: {
    duration: 3, // Animation duration in seconds
    repeat: Infinity, // Repeat continuously
    ease: "easeInOut", // Smoother transition
    flip: Infinity, // Enable flip on transition completion (infinite)
  },
};

const AboutTheBuilding = () => {
  return (
    <section className="mt-24">
      <Heading title={"About The Building"} desc={""} />

      <div className="flex flex-col md:flex-row justify-between items-center gap-8 ">
        <div className="flex flex-col text-center items-center  mx-auto w-1/2">
          <motion.img
            className="w-20"
            src={mark}
            alt=""
            animate={flipAnimation}
          />
          <img className="w-96" src={apartment} alt="" />
        </div>

        <div className="w-1/2">
          <div className=" w-full  space-y-12">
            <article className="space-y-8 ">
              <div className="space-y-6">
                <h1 className="text-2xl font-bold md:tracking-tight md:text-4xl ">
                  Welcome to{" "}
                  <span className="text-yellow-500">Solo Unit {""}</span> X
                </h1>
              </div>
            </article>
            <div>
              <div className="space-y-2">
                <h4 className="text-lg font-semibold">Key Features:</h4>
                <ul className="ml-4 space-y-1 list-disc">
                  <li>
                    <p
                      rel="noopener noreferrer"
                      href="#"
                      className="hover:underline"
                    >
                      Modern Architecture: Designed with a sleek and
                      contemporary aesthetic, stands as a testament to modern
                      engineering and design.
                    </p>
                  </li>
                  <li>
                    <p
                      rel="noopener noreferrer"
                      href="#"
                      className="hover:underline"
                    >
                      Energy Efficiency: Our building utilizes cutting-edge
                      technologies to minimize energy consumption, ensuring a
                      sustainable and eco-friendly environment.
                    </p>
                  </li>
                  <li>
                    <p
                      rel="noopener noreferrer"
                      href="#"
                      className="hover:underline"
                    >
                      Smart Systems: Equipped with the latest smart building
                      management systems, our facility offers seamless control
                      and monitoring for optimal performance.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTheBuilding;
