import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Heading from "../shared/Heading";
import { motion } from "framer-motion";
import earth from "../../assets/earth.png";
import location from "../../assets/location.png";

const locationAnimation = {
  y: [15, -15, 15], // Vertical movement
  rotate: [0, 10, -10, 0], // Rotation sequence
  transition: {
    duration: 2, // Adjust for animation speed (in seconds)
    ease: "easeInOut", // Smoother motion
    repeat: Infinity, // Continuously repeat the animation
  },
};

// Fixing default icon issue in leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const ApartmentLocation = () => {
  const position = [51.505, -0.09]; // Replace with your apartment's latitude and longitude

  return (
    <div className=" mx-auto mt-8 md:mt-24 p-4">
      <Heading
        title={"Our Apartment Location"}
        desc={
          " Our apartment is located in the heart of the city, offering easy access to all major attractions and amenities. Find us at"
        }
      />

      <div className="flex flex-col gap-7  max-w-4xl mx-auto mt-5 md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="h-96 relative z-0  my-auto w-full md:w-1/2">
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            className="h-full w-full rounded-lg shadow-lg"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>Our Apartment Location</Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className="flex flex-col justify-center items-center md:w-1/2">
          <motion.img
            className="w-10 "
            src={location}
            alt="Location"
            animate={locationAnimation}
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: "linear",
            }}
            className=" flex justify-center items-center "
          >
            <img className="w-32" src={earth} alt="" />
          </motion.div>
          <div className=" w-full  space-y-2">
            <article className=" ">
              <div className="">
                <h1 className="text-3xl font-bold md:tracking-tight md:text-4xl ">
                  How to Get <span className="text-yellow-500">Here {""}</span>
                </h1>
              </div>
            </article>
            <div>
              <div className="space-y-2">
                <ul className="ml-4 space-y-1 list-disc">
                  <li>
                    <strong className="text-yellow-600">By Car:</strong> Follow
                    the main road to the city center and turn onto Main Street.
                    Our apartment is on the right side
                  </li>
                  <li>
                    <strong className="text-yellow-600">
                      By Public Transport:
                    </strong>{" "}
                    Alternatively, you can take bus number 5 and get off at Main
                    Street stop.
                  </li>
                  <li>
                    <strong className="text-yellow-600">By Bike:</strong> Use
                    the bike lanes available throughout the city and park at the
                    bike rack in front of the building
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentLocation;
