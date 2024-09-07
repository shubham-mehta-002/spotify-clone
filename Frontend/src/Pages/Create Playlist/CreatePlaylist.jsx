import { CreatePlaylistForm } from "../../Pages";
import { Navigate } from "react-router-dom";

export function CreatePlaylist() {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" replace={true} />;
  }
  return (
    <div className="h-full w-full flex items-center flex-col text-white">
      <div className="login-header border-b-2 border-solid border-gray-400 p-4 gap-3 flex flex-col md:flex-row items-center justify-center">
        <div className="text-2xl md:text-5xl font-bold my-4 text-center md:text-left">
          Enter playlist Details
        </div>
      </div>

      <div className="login-details flex items-center flex-col w-full">
        <div className="form w-full p-4">
          <CreatePlaylistForm />
        </div>
      </div>
    </div>
  );
}
