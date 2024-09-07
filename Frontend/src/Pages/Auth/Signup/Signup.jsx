import { useNavigate, NavLink } from "react-router-dom";
import { spotifyLogo } from "../../../images";
import { SignupForm } from "./SignupForm";

export function Signup() {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full flex flex-col items-center overflow-x-hidden px-4 sm:px-6">
      <div className="login-header border-b-2 border-solid border-b-gray-400 p-4 gap-3 flex flex-row items-center justify-center w-full max-w-lg">
        <img src={spotifyLogo} className="h-12 sm:h-16" alt="Spotify Logo" />
        <span className="text-2xl sm:text-3xl font-semibold">Spotify</span>
      </div>
      <div className="w-full flex flex-col items-center mt-6">
        <div className="login-details flex flex-col items-center w-full max-w-md">
          <div className="text-lg sm:text-2xl font-bold my-6 text-center">
            Sign up for free to start listening.
          </div>
          <SignupForm />
          <div className="h-0 w-full border-b-2 border-solid border-b-gray-400 mt-4"></div>
          <div className="font-bold text-lg my-6 text-center">
            Already have an account?
          </div>

          <button
            className="border-2 border-solid border-gray-400 w-full px-4 py-3 rounded-full text-lg font-semibold text-gray-500"
            onClick={() => navigate("/login")}
          >
            LOG IN INSTEAD
          </button>

          <div className="flex justify-end text-sm text-red-500 mt-4 mb-2">
            <NavLink to="/">Go to home page</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
