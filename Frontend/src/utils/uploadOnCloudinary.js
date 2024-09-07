import axios from "axios";

export const uploadOnCloudinary = async (file, type, folderName) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "hzflvwpi");
  formData.append("cloud_name", "dudcrgnld");

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dudcrgnld/${type}/upload`,
      formData,
      {
        resource_type: "auto",
        folder: `${folderName}`,
      }
    );

    return response;
  } catch (err) {
    console.log(err);
  }
};
