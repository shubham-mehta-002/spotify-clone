import spotify_logo_white from "../../images/spotify_logo_white.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Profile } from "../../Pages";
import user from "../../images/user.png";
import { useState,useRef, useEffect } from "react";
import "./navbar.css";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const navigate = useNavigate();
  const [profileVisibility, setProfileVisibility] = useState("hidden");
  const profileRef = useRef(null);
  const loginState = localStorage.getItem("token") ? true : false;

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileVisibility("hidden");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-1/10 w-full bg-customOpacityBlackBg rounded flex flex-row justify-between items-center gap-4 bg-blend-normal relative">
      {/* web view  */}
      <div className="hidden lg:flex  ml-5">
        <button className="  hover:text-white hover:scale-110  text-customGray rounded-full mx-3 font-bold text-l">
          <span>
            <NavLink to="/">All Songs</NavLink>
          </span>
        </button>

        <button className="  hover:text-white hover:scale-110  text-customGray rounded-full mx-3 font-bold text-l">
          <span className="hover:text-white hover:scale-110 text-customGray rounded-full mx-2 font-bold text-l">
            <NavLink to="my/songs">My songs</NavLink>
          </span>
        </button>

        <button className="  hover:text-white hover:scale-110  text-customGray rounded-full mx-3 font-bold text-l">
          <span className="hover:text-white hover:scale-110 text-customGray rounded-full mx-2 font-bold text-l">
            <NavLink to="/playlist">All Playlists</NavLink>
          </span>
        </button>
      </div>
      {/* web viewn ends  */}

      {/* smaller screen view  */}
      <div className="lg:hidden  ml-5 flex flex-row items-center justify-center">
        <button className="  hover:text-white hover:scale-110  text-customGray rounded-full mx-3 font-bold text-l">
          <span>
            <NavLink to="/">
              <img src={spotify_logo_white} alt="logo" className="h-10 w-10 " />
            </NavLink>
          </span>
        </button>
        <button className="  hover:text-white hover:scale-110  text-customGray rounded-full mx-3 font-bold text-l">
          <span>
            <NavLink to="/">Home</NavLink>
          </span>
        </button>

        <button className="  hover:text-white hover:scale-110  text-customGray rounded-full mx-3 font-bold text-l">
          <span className="hover:text-white hover:scale-110 text-customGray rounded-full mx-2 font-bold text-l">
            <NavLink to="/search">Search</NavLink>
          </span>
        </button>
      </div>
      {/* smaller screen view ends */}

      {/* web view   */}
      <div className="hidden lg:flex justify-center items-center">
        {!loginState && (
          <button className="opacity-100 hover:scale-110 py-3 mr-2 text-white rounded-full px-6 font-bold text-l">
            <NavLink to="/signup">Sign up</NavLink>
          </button>
        )}

        {!loginState && (
          <button className="hover:scale-110 py-2 mr-2 rounded-full px-6 font-bold text-l text-black bg-white border-2 border-solid border-white">
            <NavLink to="/login">Log in</NavLink>
          </button>
        )}

        {loginState && (
          <button className="hover:scale-110 hover:text-white py-2 mr-2 px-4 font-bold text-l text-customGray">
            <NavLink to="create/songs">Upload Song</NavLink>
          </button>
        )}

        {loginState && <button className="text-white mr-5 text-2xl">|</button>}
        {loginState && (
          <button>
            <img
              className="hover:scale-110 h-10 w-10 rounded-full bg-white"
              src={user}
              onClick={() =>
                setProfileVisibility((prev) =>
                  prev === "hidden" ? "visible" : "hidden"
                )
              }
            />
          </button>
        )}
        {profileVisibility === "visible" && (
          <div       ref={profileRef} className="absolute right-0 bottom-2 z-10">
            <Profile
              profileVisibility={profileVisibility}
              setProfileVisibility={setProfileVisibility}
            />
          </div>
        )}
      </div>
      {/* web view ends  */}

      {/* smaller screen view  */}
      <MobileMenu />
      {/* smaller screen view ends  */}
    </div>
  );
}
