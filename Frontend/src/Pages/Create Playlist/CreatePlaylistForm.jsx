import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../../Context/loginContext";
import { uploadOnCloudinary } from "../../utils/uploadOnCloudinary";
import { useAppContext } from "../../Context/appContext";
import axios from "axios";
import { BASE_URL } from "../../constant";
export function CreatePlaylistForm() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  const { state, dispatch } = useAppContext();

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const { loginState, setLoginState } = useLoginContext();

  const [value, setValue] = useState({
    name: "",
    collaborators: "",
    visibilityMode: "",
  });
  const [files, setFiles] = useState({ thumbnail: "" });
  const [imagePreview, setImagePreview] = useState(false);

  async function submitHandler(e) {
    const { name, collaborators, thumbnail, visibilityMode } = getValues();
    const token = localStorage.getItem("token");

    let thumbnailURL = undefined;
    if (thumbnail.length !== 0) {
      const thumbnailData = await uploadOnCloudinary(
        thumbnail[0],
        "image",
        "Playlist"
      );
      thumbnailURL = thumbnailData.data.url;
    } else {
      thumbnailURL = null;
    }

    if (!name) {
      setError("root", { message: "Enter all fields first" });
      return null;
    }
    const collaboratorsData = collaborators
      .split(",")
      .map((artist) => artist.trim())
      .filter((artist) => artist !== "");

    const data = {
      name,
      thumbnail: thumbnailURL,
      token,
      collaborators: collaboratorsData,
      visibilityMode,
    };



    try {
      const response = await axios.post(
        `${BASE_URL}/playlist/create`,
        data
      );
      if (response.data.success) {
        dispatch({
          type: "ADD_PLAYLIST",
          payload: { playlist: [response.data.playlist] },
        });
        setFiles({ thumbnail: null });
        setValue("");
        reset();
      }
    } catch (err) {
      console.log("ERROR :  ", err);
    }
  }

  const validation = {
    name: {
      required: "Playlist name is required",
      pattern: {
        value: /[A-Za-z0-9]+$/,
        message: "Name can't have special characters",
      },
    },
    collaborators: {
      pattern: {
        value: /[ ,A-Za-z0-9]+$/,
        message: "Name can't have special characters",
      },
    },
    visibilityMode: {
      required: "Visibility mode is required",
    },
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="w-full sm:w-2/3 max-w-3xl mx-auto px-4">
      <div className="mt-8 flex mx-auto flex-col gap-4">
        <div className="w-full flex flex-col gap-2 mb-4">
          <label className="text-lg font-bold">Name</label>
          <input
            type="text"
            {...register("name", validation.name)}
            placeholder="Enter playlist name"
            className="w-2/3 min-w-[400px] border-2 border-solid border-gray-400 p-3 rounded text-black placeholder-gray-500"
          />
          {errors.name && (
            <div className="text-red-500 text-sm">{errors.name.message}</div>
          )}
        </div>

        <div className="w-full flex flex-col gap-2 mb-4">
          <label className="text-lg font-bold">Collaborators</label>
          <input
            type="text"
            {...register("collaborators", validation.collaborators)}
            placeholder="Separate by comma"
            className="w-2/3 min-w-[400px] border-2 border-solid border-gray-400 p-3 rounded text-black placeholder-gray-500"
          />
          {errors.collaborators && (
            <div className="text-red-500 text-sm">{errors.collaborators.message}</div>
          )}
        </div>

        <div className="w-full flex flex-col gap-2 mb-4">
          <label className="text-lg font-bold">Visibility Mode</label>
          <div className="flex flex-col sm:flex-row sm:gap-8">
            <div>
              <input
                {...register("visibilityMode", validation.visibilityMode)}
                type="radio"
                name="visibilityMode"
                value="private"
                defaultChecked
              />{" "}
              Private
            </div>
            <div>
              <input
                {...register("visibilityMode", validation.visibilityMode)}
                type="radio"
                name="visibilityMode"
                value="public"
              />{" "}
              Public
            </div>
          </div>
          {errors.visibilityMode && (
            <div className="text-red-500 text-sm">{errors.visibilityMode.message}</div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col h-20 gap-2">
            <label className="text-lg font-bold">Thumbnail</label>
            <input
              {...register("thumbnail")}
              type="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={(e) => {
                setFiles({ ...files, thumbnail: e.target.files[0] });
                // setImagePreview(URL.createObjectURL(e.target.files[0]))
              }}
              className="p-2 rounded"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-[150px] border-2 border-solid border-black py-2 px-4 bg-white text-black rounded-full font-semibold"
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
