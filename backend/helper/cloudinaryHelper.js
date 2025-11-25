const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const connectToCloudinary = async (filePath) => {
  try {
    if (!filePath) {
      throw new Error("filepath is missing!!!");
    }
    const result = await cloudinary.uploader.upload(filePath);

    fs.unlinkSync(filePath);

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    fs.unlinkSync(filePath);
    console.log("error while uploading to cloudinary", error);
    throw new Error("error while uploading to cloudinary");
  }
};

module.exports = connectToCloudinary;
