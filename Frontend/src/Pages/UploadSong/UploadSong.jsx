import { UploadSongForm } from "../../Pages";
import { Navigate } from "react-router-dom";

export function UploadSong() {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className="h-full w-full flex items-center flex-col text-white px-4 sm:px-8 lg:px-16">
      <div className="login-header border-b-2 border-solid border-gray-400 p-4 gap-3 flex flex-col sm:flex-row items-center justify-center">
        <div className="text-3xl sm:text-4xl md:text-5xl font-bold my-4 text-center sm:text-left">
          Enter Song Details
        </div>
      </div>

      <div className="login-details flex items-center flex-col w-full">
        <div className="form w-full max-w-md p-4">
          <UploadSongForm />
        </div>
      </div>
    </div>
  );
}
