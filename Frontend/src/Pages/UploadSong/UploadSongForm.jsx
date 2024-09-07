import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../../Context/loginContext";
import { uploadOnCloudinary } from "../../utils/uploadOnCloudinary";
import axios from "axios";
import { BASE_URL } from "../../constant";

export function UploadSongForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const { loginState, setLoginState } = useLoginContext();

  const validation = {
    name: {
      required: "Song name is required",
      pattern: {
        value: /^\S.*$/, // Regular expression to check for at least one non-whitespace character
        message: "Song name cannot be empty",
      },
    },
    thumbnail: {
      required: "Thumbnail is required",
    },
    track: {
      required: "Track is required",
    },
  };

  async function submitHandler(e) {
    const { name, thumbnail, track } = getValues();
    const thumbnailData = await uploadOnCloudinary(
      thumbnail[0],
      "image",
      "Song"
    );

    const trackData = await uploadOnCloudinary(track[0], "video", "Song");

    const token = localStorage.getItem("token");
    const thumbnailURL = thumbnailData.data.url;
    const trackURL = trackData.data.url;

    if (!name || !thumbnailURL || !trackURL) {
      setError("root", { message: "Enter all fields first" });
      return;
    }

    const data = {
      name,
      thumbnail: thumbnailURL,
      track: trackURL,
      token,
      duration: trackData.data.duration,
    };

    const response = await axios.post(
      `${BASE_URL}/song/create`,
      data
    );

    if (response.data.success) {
      reset();
    }
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="w-full max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
      <div className="form mt-8 flex flex-col gap-4">
        <div className="w-full flex flex-col gap-2 mb-4">
          <label className="text-lg font-bold">Name</label>
          <input
            {...register("name", validation.name)}
            type="text"
            placeholder="Enter song name"
            className="border-2 border-solid border-gray-400 p-3 rounded text-black placeholder-gray-500 w-full"
          />
          {errors.name && (
            <div className="text-sm text-red-500">{errors.name.message}</div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold">Thumbnail</label>
            <input
              {...register("thumbnail", validation.thumbnail)}
              type="file"
              accept="image/png, image/gif, image/jpeg"
              className="p-2 rounded w-full"
            />
            {errors.thumbnail && (
              <div className="text-sm text-red-500">{errors.thumbnail.message}</div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg font-bold">Audio file</label>
            <input
              {...register("track", validation.track)}
              type="file"
              accept=".mp3"
              className="p-2 rounded w-full"
            />
            {errors.track && (
              <div className="text-sm text-red-500">{errors.track.message}</div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-[150px] border-2 border-solid border-black py-2 px-4 bg-white text-black rounded-full font-semibold "
          >
            {isSubmitting ? "UPLOADING" : "UPLOAD"}
          </button>

          {errors.root && (
            <div className="text-sm text-red-500">{errors.root.message}</div>
          )}
        </div>
      </div>
    </form>
  );
}
