import { Link } from "react-router-dom";
import error from "../assets/error.png";
const ErrorPage = () => {
  return (
    <section className="flex items-center h-[100vh]  text-gray-800">
      <div className="container flex flex-col items-center justify-center mx-auto">
        <div className="max-w-md text-center">
          <div>
            <img src={error} alt="" />
          </div>
          <h4 className="text-4xl font-bold text-yellow-500">404</h4>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we could not find this page.
          </p>
          <Link
            to={"/"}
            className="btn mt-4 font-semibold bg-yellow-500 text-white"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
