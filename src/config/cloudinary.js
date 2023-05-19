require("dotenv").config();
const cloudinary = require("cloudinary");
const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.v2.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadImage = async (filePath) => {
  return await cloudinary.v2.uploader.upload(filePath, {
    folder: "SixCircle",
  });
};

const deleteImage = async (public_id) => {
  return await cloudinary.v2.uploader.destroy(public_id);
};

module.exports = { uploadImage, deleteImage };
