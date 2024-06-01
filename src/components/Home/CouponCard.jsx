const CouponCard = ({ coupons }) => {
  return coupons.map((coupon, index) => (
    <div
      key={index}
      className="container  bg-gradient-to-r from-yellow-500 to-yellow-400 text-white p-8 py-6 rounded-lg shadow-lg mx-auto"
    >
      <div className="text-lg mb-4">
        Get <span className="text-black font-bold">{coupon.discount}</span> your
        next purchase!
      </div>

      <div className="bg-white text-gray-800 rounded-lg px-4 py-2 flex items-center justify-between">
        <span className="text-2xl font-semibold">{coupon.code}</span>
        <button
          onClick={() => navigator.clipboard.writeText(coupon.code)}
          className="bg-blue-800 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Copy
        </button>
      </div>
    </div>
  ));
};

export default CouponCard;
