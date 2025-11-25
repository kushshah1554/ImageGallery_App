const connectToCloudinary = require("../helper/cloudinaryHelper");
const Image = require("../model/image");
const User = require("../model/user");
const path = require("path");
const cloudinary = require("../config/cloudinary");
const user = require("../model/user");
const SavedImage = require("../model/saved");
const NotIntrestedImage = require("../model/not-intrested");
const ImageComments = require("../model/imageComments");

const uploadImageController = async (req, res) => {
  try {
    const file = req.file;

    const currentUserId = req.userInfo.userId;
    //check if file is missing is req object
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "image is missing please upload a image",
      });
    }
    //upload to cloudinary
    const { url, publicId } = await connectToCloudinary(file.path);

    const fileName = path.parse(file.filename).name;
    const tags = [fileName, path.extname(file.originalname)];

    //save iamge info getting from clodinary to database
    const newImage = new Image({
      url,
      publicId,
      name: fileName,
      tags,
      uploader: req.userInfo.username,
      uploadedBy: currentUserId,
    });

    //create comment mongooose document for new Image
    const imageComments = await ImageComments.create({
      imageId: newImage._id,
    });

    //Now save new image comment to new image info that is image collection
    newImage.comments = imageComments._id;

    await newImage.save();

    if (newImage) {
      res.status(200).json({
        success: true,
        message: "Image add successfully",
        newImage,
        imageComments,
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "image can not be added" });
    }
  } catch (error) {
    console.log("Error", error);
    res
      .status(500)
      .json({ success: false, message: "Something went wrong!!!!" });
  }
};

const deleteImageController = async (req, res) => {
  try {
    const getCurrentImageIdForDelete = req.params.id;
    const currentUserId = req.userInfo.userId;

    //check image exist or not
    const deleteImage = await Image.findById(getCurrentImageIdForDelete);

    if (!deleteImage) {
      return res
        .status(400)
        .json({ success: false, message: "Image not found" });
    }
    //check current user exist or not
    const currentUser = await User.findById(currentUserId);

    if (!currentUser) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }

    //check who is deleting the image
    const imageOwner = deleteImage.uploadedBy.toString();

    if (imageOwner !== currentUserId) {
      return res.status(403).json({
        success: false,
        message: "you are not allowed to delete this image",
      });
    }
    //delete current image id from currentuser saveinfo too
    const UpdatedCurrentUserSavedInfo = await SavedImage.findOneAndUpdate(
      { userId: currentUserId },
      { $pull: { savedImages: getCurrentImageIdForDelete } },
      { new: true }
    );

    if (!UpdatedCurrentUserSavedInfo) {
      return res.status(400).json({
        success: false,
        message: "can not delete from usersaved info",
      });
    }

    //delete from cloudinary
    await cloudinary.uploader.destroy(deleteImage.publicId);

    //delete from database

    const deleteImageFromDatabase = await deleteImage.deleteOne();

    if (deleteImageFromDatabase.deletedCount) {
      res.status(200).json({
        success: true,
        message: "Image delete successfully",
        UpdatedCurrentUserSavedInfo,
      });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Image canot be delete from db" });
    }
  } catch (error) {
    console.log("Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Something went wromg!!!!!!" });
  }
};

const fetchImagesController = async (req, res) => {
  try {
    const currentUserId = req.userInfo.userId;
    const allImages = await Image.find();

    if (!allImages || !allImages.length) {
      return res
        .status(404)
        .json({ success: false, message: "No Image not found" });
    }

    //check currentUser has notIntrestrd info or not if not create one
    let currentUserNotIntrestedInfo = await NotIntrestedImage.findOne({
      userId: currentUserId,
    });
    if (!currentUserNotIntrestedInfo) {
      currentUserNotIntrestedInfo = await NotIntrestedImage.create({
        userId: currentUserId,
      });
    }

    //remove currentuser notIntrested images
    let updatesImages = allImages.filter((img) => {
      return !currentUserNotIntrestedInfo.notIntrestedImages.some((imgId) =>
        imgId.equals(img._id)
      );
    });

    // check which images currentUser has liked
    updatesImages = updatesImages.map((img) => {
      const liked = img.likedUsers.some((id) => id.equals(currentUserId));
      return { ...img.toObject(), liked };
    });

    //check currentUser has saved info or not if not create one
    let currentUserSavedInfo = await SavedImage.findOne({
      userId: currentUserId,
    });
    if (!currentUserSavedInfo) {
      currentUserSavedInfo = await SavedImage.create({ userId: currentUserId });
    }

    updatesImages = updatesImages.map((img) => {
      const saved = currentUserSavedInfo?.savedImages?.includes(img._id);
      return { ...img, saved: saved };
    });

    //send respond

    res.status(200).json({
      success: true,
      message: "All image fatch successfully",
      images: updatesImages,
    });
  } catch (error) {
    console.log("Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Something went wrong!!!!!" });
  }
};

const likeController = async (req, res) => {
  try {
    const currentImageId = req.params.id;
    const currentUserId = req.userInfo.userId;

    // Check if image exists
    const currentImage = await Image.findById(currentImageId);
    if (!currentImage) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    }

    //  Check if user exists
    const currentUser = await User.findById(currentUserId);
    if (!currentUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    //  Prevent users from liking their own image
    if (currentImage.uploadedBy.equals(currentUserId)) {
      return res.status(400).json({
        success: false,
        message: "You can't like your own image",
      });
    }

    //  Check if the user already liked
    const alreadyLiked = currentImage.likedUsers.some((id) =>
      id.equals(currentUserId)
    );

    let updatedImage;

    if (alreadyLiked) {
      // send response
      // Unlike using atomic $pull
      updatedImage = await Image.findByIdAndUpdate(
        currentImageId,
        {
          $pull: { likedUsers: currentUserId },
          $inc: { likes: -1 },
          $set: { liked: false },
        },
        { new: true } // return updated document
      );

      return res.status(200).json({
        success: true,
        message: "Image unliked successfully",
        updatedImage,
      });
    } else {
      //  Like using atomic $addToSet
      updatedImage = await Image.findByIdAndUpdate(
        currentImageId,
        {
          $addToSet: { likedUsers: currentUserId },
          $inc: { likes: 1 },
          $set: { liked: true },
        }, // ensures no duplicates
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Image liked successfully",
        updatedImage,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while liking/unliking the image",
    });
  }
};

const savedController = async (req, res) => {
  try {
    const currentImageId = req.params.id;
    const currentUserId = req.userInfo.userId;

    //  Check if image exists
    const currentImage = await Image.findById(currentImageId);
    if (!currentImage) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    }

    //  Check if user exists
    const currentUser = await user.findById(currentUserId);
    if (!currentUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    //  Find SavedImage document for currentuser
    let savedInfo = await SavedImage.findOne({ userId: currentUserId });
    if (!savedInfo) {
      return res
        .status(404)
        .json({ success: false, message: "saved info not found" });
    }

    //  Check if image is already saved
    const hasSaved = savedInfo.savedImages.some((imgId) =>
      imgId.equals(currentImageId)
    );

    //  Prepare update operation based on saved state
    const updateOperation = hasSaved
      ? { $pull: { savedImages: currentImageId } }
      : { $addToSet: { savedImages: currentImageId } };

    const imageSavedStatus = !hasSaved; // toggle

    //  Run both updates in parallel
    const [updatedSavedImages, updatedImage] = await Promise.all([
      SavedImage.findByIdAndUpdate(savedInfo._id, updateOperation, {
        new: true,
      }),
      Image.findByIdAndUpdate(
        currentImageId,
        { $set: { saved: imageSavedStatus } },
        { new: true }
      ),
    ]);

    // Send response
    return res.status(200).json({
      success: true,
      message: `Image ${hasSaved ? "unsaved" : "saved"} successfully`,
      updatedSavedImages,
      updatedImage,
    });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong!" });
  }
};

const fetchSavedImages = async (req, res) => {
  try {
    const currentUserId = req.userInfo.userId;

    const savedInfo = await SavedImage.findOne({
      userId: currentUserId,
    }).populate("savedImages");

    if (!savedInfo || savedInfo.savedImages.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No saved images found for this user",
        savedImages: [],
      });
    }

    //check currentUser has notIntrestrd info or not if not create one
    let currentUserNotIntrestedInfo = await NotIntrestedImage.findOne({
      userId: currentUserId,
    });
    if (!currentUserNotIntrestedInfo) {
      return res.status(404).json({
        success: false,
        message: "currentuser notIntrested images not found ",
      });
    }

    let updatedSavedImages = savedInfo.savedImages.filter(
      (img) =>
        !currentUserNotIntrestedInfo.notIntrestedImages.some((imgId) =>
          imgId.equals(img._id)
        )
    );
    // console.log(updatedSavedImages);

    //check currentuser likes
    updatedSavedImages = updatedSavedImages.map((img) => {
      const liked = img.likedUsers.some((imgId) => imgId.equals(currentUserId));
      return { ...img.toObject(), saved: true, liked };
    });

    return res.status(200).json({
      success: true,
      message: "Saved images fetched successfully",
      savedImages: updatedSavedImages,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

const myImagesController = async (req, res) => {
  try {
    const currentUserId = req.userInfo.userId;
    let myImages = await Image.find({ uploadedBy: currentUserId });

    if (!myImages?.length) {
      return res.status(404).json({
        success: false,
        message: "This user has not upload any thing",
      });
    }

    const currentUserSavedInfo = await SavedImage.findOne({
      userId: currentUserId,
    });

    if (
      !currentUserSavedInfo ||
      currentUserSavedInfo.savedImages?.length === 0
    ) {
      myImages = myImages.map((img) => ({
        ...img.toObject(),
        liked: false,
        saved: false,
      }));

      return res.status(200).json({
        success: true,
        message: "All images fetch Successfully user has not saved any images",
        myImages,
      });
    }

    myImages = myImages.map((img) => {
      const saved = currentUserSavedInfo.savedImages.some((imgId) =>
        imgId.equals(img._id)
      );

      return { ...img.toObject(), saved, liked: false };
    });

    res.status(200).json({
      success: true,
      message: "All images fetch Successfully",
      myImages,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

const notIntrestedImages = async (req, res) => {
  try {
    const currentImageId = req.params.id;
    const currentUserId = req.userInfo.userId;

    //check image exist or not
    const currentImage = await Image.findById(currentImageId);
    if (!currentImage) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    }

    // check user exist or not
    const currentUser = await User.findById(currentUserId);
    if (!currentUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    //check currentUser has notIntrestrd info or not
    const currentUserNotIntrestedInfo = await NotIntrestedImage.findOne({
      userId: currentUserId,
    });

    if (!currentUserNotIntrestedInfo) {
      return res.status(404).json({
        success: false,
        message: "notIntrested info not found for this user",
      });
    }

    //check image is alredy notIntrested or not
    const isAlreadyNotIntrested =
      currentUserNotIntrestedInfo.notIntrestedImages.some((imgId) =>
        imgId.equals(currentImageId)
      );

    const updateOperation = isAlreadyNotIntrested
      ? { $pull: { notIntrestedImages: currentImageId } }
      : { $addToSet: { notIntrestedImages: currentImageId } };

    const updatedNotIntrestedImages = await NotIntrestedImage.findByIdAndUpdate(
      currentUserNotIntrestedInfo._id,
      updateOperation,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: `image ${
        isAlreadyNotIntrested ? "removed from" : "add to"
      } notIntrested list`,
      updatedNotIntrestedImages,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ success: false, message: "Something WentWrong!!!" });
  }
};

const fetchNotIntrestedImages = async (req, res) => {
  try {
    const currentUserId = req.userInfo.userId;

    //check currentUser notIntrested images info
    const notIntrestedInfo = await NotIntrestedImage.findOne({
      userId: currentUserId,
    }).populate("notIntrestedImages");

    if (!notIntrestedInfo || !notIntrestedInfo.notIntrestedImages?.length) {
      return res.status(404).json({
        success: false,
        message:
          "CurrentUser notIntrested info not found or user has not notIntrestedany images",
        notIntrestedImgs: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "All notIntrested images fetch successfully",
      notIntrestedImgs: notIntrestedInfo.notIntrestedImages,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      success: false,
      message: "Something WentWrong!!!",
    });
  }
};

const addCommentController = async (req, res) => {
  try {
    const currentUserId = req.userInfo.userId;
    const currentImageId = req.params.id;
    const { currentcomment } = req.body ?? {};

    if (!currentcomment) {
      return res
        .status(400)
        .json({ success: false, message: "comment is not avilable" });
    }
    //check currentUser exist or not
    const currentUser = await User.findById(currentUserId);
    if (!currentUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // check current Image exist or not
    const currentImage = await Image.findById(currentImageId);
    if (!currentImage) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    }
    //check current image comments exist or not
    const currentImageComments = await ImageComments.findOne({
      imageId: currentImageId,
    });

    if (!currentImageComments) {
      return res
        .status(404)
        .json({ success: false, message: "current Image comment not found" });
    }

    //add new comment
    const comment = {
      text: currentcomment,
      user: currentUser.username,
      userId: currentUserId,
    };
    currentImageComments.comments.push(comment);
    await currentImageComments.save();

    res.status(200).json({
      success: true,
      message: "Comment Add successfully",
      comment: currentImageComments.comments.pop(),
    });
  } catch (error) {
    console.log("Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Something went wrong!!!!!!" });
  }
};

const deleteCommentcontroller = async (req, res) => {
  try {
    const currentUserId = req.userInfo.userId;
    const currentImageId = req.params.id;
    const { currentCommentId } = req.body;

    //check currentUser exist or not
    const currentUser = await User.findById(currentUserId);
    if (!currentUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // check current Image exist or not
    const currentImage = await Image.findById(currentImageId);
    if (!currentImage) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    }

    //check current image comments info exist or not
    const currentImageCommentsInfo = await ImageComments.findOne({
      imageId: currentImageId,
    });

    if (!currentImageCommentsInfo) {
      return res
        .status(404)
        .json({ success: false, message: "current Image comment not found" });
    }

    //check who is deleting the comment only owner is allowed to delete their comment
    const currentCommentIndex = currentImageCommentsInfo.comments.findIndex(
      (comment) => comment._id.equals(currentCommentId)
    );

    if (
      currentImageCommentsInfo.comments[
        currentCommentIndex
      ].userId.toString() !== currentUserId
    ) {
      return res.status(404).json({
        success: false,
        message: "only comment owner is allowed to delete ",
      });
    }

    //delete comment

    const removedComment = currentImageCommentsInfo.comments.splice(
      currentCommentIndex,
      1
    );
    //save changes to database
    await currentImageCommentsInfo.save();

    res.status(200).json({
      success: true,
      message: "comment deleted successfully",
      removedComment,
      currentImageCommentsInfo,
    });
  } catch (error) {
    console.log("Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Something went wrong!!!!!!" });
  }
};

const fetchCurrentImageComment = async (req, res) => {
  try {
    const currentUserId = req.userInfo.userId;
    const currentImageId = req.params.id;

    //check current user exist or not
    const currentUser = await User.findById(currentUserId);
    if (!currentUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    //check current user exist or not
    const currentImage = await Image.findById(currentImageId);
    if (!currentImage) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    }

    const currentImageCommentInfo = await ImageComments.findOne({
      imageId: currentImageId,
    });
    //send comments in responce
    res.status(200).json({
      success: true,
      message: "All comment fetch successfully",
      comments: currentImageCommentInfo.comments,
    });
  } catch (error) {
    console.log("Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Something went wrong!!!!!!" });
  }
};

module.exports = {
  uploadImageController,
  deleteImageController,
  likeController,
  fetchImagesController,
  savedController,
  fetchSavedImages,
  myImagesController,
  notIntrestedImages,
  fetchNotIntrestedImages,
  addCommentController,
  deleteCommentcontroller,
  fetchCurrentImageComment,
};
