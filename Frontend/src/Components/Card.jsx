import { useNavigate } from "react-router-dom";

export function Card({
  cardData: { _id, name, thumbnail, collaborators },
}) {
  const navigate = useNavigate();
  return (
    <div
      className="h-48 w-36 flex flex-wrap hover:cursor-pointer "
      onClick={() => navigate(`/playlist/${_id}`)}
    >
      <div className=" hover:bg-customGray w-full h-full bg-customLightBlack   rounded-md p-3">
        <div className="h-2/3 flex items-center justify-center">
          <img
            src={thumbnail}
            alt="image"
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
        <div className="text-white text-xl text-start font-bold my-2 mb-1 break-words text-ellipsis overflow-hidden whitespace-nowrap">
          {name}
        </div>
        <div className="text-white text-sm text-start font-semibold mt-2 break-words text-ellipsis overflow-hidden whitespace-nowrap">
          {collaborators && collaborators.join(" | ")}
        </div>
      </div>
    </div>
  );
}
