import { useNavigate, NavLink } from 'react-router-dom';
import { spotifyLogo } from '../../../images';
import { LoginForm } from './LoginForm';

export function Login() {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full flex flex-col items-center px-4 sm:px-8">
      <div className="login-header border-b-2 border-solid border-b-gray-400 p-4 gap-3 flex flex-row items-center justify-center w-full max-w-lg">
        <img src={spotifyLogo} className="h-16" alt="Spotify Logo" />
        <span className="text-5xl font-bold">Spotify</span>
      </div>

      <div className="login-details flex items-center flex-col w-full max-w-md mt-6">
        <div className="form w-full">
          <div className="text-xl font-bold my-6 text-center">
            To continue, login to Spotify
          </div>

          <LoginForm />

          <div className="h-0 w-full border-b-2 border-solid border-b-gray-400 mt-4"></div>
          <div className="font-bold text-lg my-6 text-center">
            Don&apos;t have an account?
          </div>

          <button
            className="border-2 border-solid border-gray-400 w-full px-4 py-3 rounded-full text-lg font-semibold text-gray-500"
            onClick={() => navigate('/signup')}
          >
            SIGN UP FOR SPOTIFY
          </button>

          <div className="flex justify-end text-sm text-red-500 my-4">
            <NavLink to="/">Go to home page</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
