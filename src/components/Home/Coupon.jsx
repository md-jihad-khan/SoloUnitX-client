import coupon from "../../assets/cupon.png";
import Heading from "../shared/Heading";
import CouponCard from "./CouponCard";
import { motion } from "framer-motion";

const springUpDownAnimation = {
  y: [20, -20, 20], // Move the box up 20px, down 20px, and back to 0
  transition: {
    duration: 2, // Adjust for animation speed (in seconds)
    ease: "easeInOut", // Smoother up-and-down motion
    repeat: Infinity, // Continuously repeat the animation
  },
};

const Coupon = () => {
  const coupons = [
    { code: "SAVE10", discount: "10% off" },
    { code: "FREESHIP", discount: "Free Shipping" },
    { code: "SALE20", discount: "20% off on orders over $50" },
    // Add more coupons as needed
  ];
  return (
    <section className="flex flex-col-reverse md:flex-row justify-between items-center gap-8 mt-24">
      <div className="flex flex-col md:w-1/2 mx-auto gap-4  p-9">
        <CouponCard coupons={coupons} />
      </div>
      <div className="md:w-1/2">
        <Heading
          title={"Exclusive Offers"}
          desc={
            "Discover our latest exclusive coupons and discounts. Dont miss out on these limited-time offers!"
          }
        />

        <motion.img
          className="w-96 mx-auto " // Adjust width and height as needed
          src={coupon}
          alt="Gift Box"
          style={{ position: "relative" }} // Set relative positioning for vertical movement
          animate={springUpDownAnimation}
        />
      </div>
    </section>
  );
};

export default Coupon;
