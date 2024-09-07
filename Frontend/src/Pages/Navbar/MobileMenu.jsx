import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context/appContext";
import { RxCross1 } from "react-icons/rx";
import { CgDetailsMore } from "react-icons/cg";
import { useState, useEffect, useRef } from "react";

export function MobileMenu() {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const loginState = localStorage.getItem("token") ? true : false;

  function logoutHandler() {
    if (state.currentSong) {
      state.currentSong.audio.pause();
      dispatch({ type: "SET_CURRENT_SONG", payload: { currentSong: null } });
      dispatch({ type: "TOGGLE_PLAYING", payload: { isPlating: false } });
    }
    localStorage.removeItem("token");
    navigate("/login");
  }

  function loginHandler(){
    navigate('/login')
  }

  function openMenuHandler() {
    setIsMenuOpen((prev) => !prev);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="lg:hidden z-10">
      {!isMenuOpen ? (
        <CgDetailsMore
          className="text-white size-9 mr-4"
          onClick={openMenuHandler}
        />
      ) : (
        <RxCross1
          className="text-white size-7 mr-4"
          onClick={openMenuHandler}
        />
      )}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute mb-2 right-0 text-white h-18 w-36 rounded-md bg-[rgb(40,40,40)] border-1 border-customLightBlack border-solid"
        >
          <div
            className="p-2 h-1/2 hover:cursor-pointer hover:bg-[rgb(60,60,60)] ml-1 text-sm text-white flex justify-start items-center"
            onClick={() => navigate("/")}
          >
            All Songs
          </div>

          <div
            className="p-2 h-1/2 hover:cursor-pointer hover:bg-[rgb(60,60,60)] ml-1 text-sm text-white flex justify-start items-center"
            onClick={() => navigate("/playlist")}
          >
            All Playlists
          </div>
         

          {loginState && <div
            className="p-2 h-1/2 hover:cursor-pointer hover:bg-[rgb(60,60,60)] ml-1 text-sm text-white flex justify-start items-center"
            onClick={() => navigate("/liked/songs")}
          >
            Liked Songs
          </div>}
          {loginState && <div
            className="p-2 h-1/2 hover:cursor-pointer hover:bg-[rgb(60,60,60)] ml-1 text-sm text-white flex justify-start items-center"
            onClick={() => navigate("/my/songs")}
          >
            My Songs
          </div>}

          {loginState && <div
            className="p-2 h-1/2 hover:cursor-pointer hover:bg-[rgb(60,60,60)] ml-1 text-sm text-white flex justify-start items-center"
            onClick={() => navigate("/my/playlists")}
          >
            My Playlists
          </div>}

          {loginState && <div
            className="p-2 h-1/2 hover:cursor-pointer hover:bg-[rgb(60,60,60)] ml-1 text-sm text-white flex justify-start items-center"
            onClick={() => navigate("/create/songs")}
          >
            Upload Song
          </div>}

          {loginState && <div
            className="p-2 h-1/2 hover:cursor-pointer hover:bg-[rgb(60,60,60)] ml-1 text-sm text-white flex justify-start items-center"
            onClick={() => navigate("/account")}
          >
            Account
          </div>}
          
          {loginState ? <div
            className="p-2 h-1/2 hover:cursor-pointer hover:bg-[rgb(60,60,60)] ml-1 text-sm text-white flex justify-start items-center border-t-2 border-bottom-solid border-white"
            onClick={logoutHandler}
          >
            Logout
          </div>
          :
          <div
            className="p-2 h-1/2 hover:cursor-pointer hover:bg-[rgb(60,60,60)] ml-1 text-sm text-white flex justify-start items-center border-t-2 border-bottom-solid border-white"
            onClick={loginHandler}
          >
            Login
          </div>
          
        }
        </div>
      )}
    </div>
  );
}
