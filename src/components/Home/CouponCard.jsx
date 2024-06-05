const CouponCard = ({ coupons }) => {
  return coupons.map((coupon, index) => (
    <div
      key={index}
      className="container  bg-gradient-to-r from-yellow-500 to-yellow-400 p-8 py-6 rounded-lg shadow-lg mx-auto"
    >
      <div className="text-lg text-white mb-1">
        <span className=" font-bold">{coupon.description}</span>
      </div>

      <div className="bg-base-100  rounded-lg px-4 py-2 flex items-center justify-between">
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
