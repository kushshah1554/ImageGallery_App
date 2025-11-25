const express = require("express");
const {
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
} = require("../controllers/image-controller");
const uploadMiddleware = require("../middlewares/upload-middleware");
const authMiddleware = require("../middlewares/auth-middleware");

const router = express.Router();

router.post(
  "/upload",
  authMiddleware,
  uploadMiddleware.single("image"),
  uploadImageController
);
router.delete("/delete/:id", authMiddleware, deleteImageController);
router.put("/like/:id", authMiddleware, likeController);
router.put("/save/:id", authMiddleware, savedController);
router.get("/get-images", authMiddleware, fetchImagesController);
router.get("/get-saved-images", authMiddleware, fetchSavedImages);
router.get("/get-my-images", authMiddleware, myImagesController);
router.put("/not-intrested-images/:id", authMiddleware, notIntrestedImages);
router.get("/get-not-intrested-images",authMiddleware,fetchNotIntrestedImages);
router.put("/add-comment/:id", authMiddleware, addCommentController);
router.put("/delete-comment/:id", authMiddleware, deleteCommentcontroller);
router.get("/fetch-comment/:id", authMiddleware, fetchCurrentImageComment);

module.exports = router;
