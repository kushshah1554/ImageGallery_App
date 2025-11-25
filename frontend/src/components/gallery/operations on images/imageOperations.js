import { useImageState } from "../useStates of images/useImageState";
import axios from "axios";

export const useImageOperations = () => {
  const state = useImageState();
  const {
    selectedImage,
    setSelectedImage,
    setSavedImages,
    setImages,
    setMyImages,
    setNotIntrestedImages,
    token,
    currentUserInfo,
    newComment,
    setNewComment,
  } = state;

  const handleLike = async (imageId, imageOwnerId, currentRoute) => {
    try {
      if (currentUserInfo.userId === imageOwnerId) {
        return;
      }
      if (selectedImage) {
        setSelectedImage((pre) => ({
          ...pre,
          liked: !pre.liked,
          likes: pre.liked ? pre.likes - 1 : pre.likes + 1,
        }));
      }

      if (currentRoute === "/gallery/saved") {
        setSavedImages((pre) =>
          pre.map((img) =>
            img._id === imageId
              ? {
                  ...img,
                  liked: !img.liked,
                  likes: img.liked ? img.likes - 1 : img.likes + 1,
                }
              : img
          )
        );
      } else {
        setImages((pre) =>
          pre.map((img) =>
            img._id === imageId
              ? {
                  ...img,
                  liked: !img.liked,
                  likes: img.liked ? img.likes - 1 : img.likes + 1,
                }
              : img
          )
        );
      }
      const { data } = await axios.put(
        `/api/image/like/${imageId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.log(error?.response?.data?.message || error);
    }
  };

  const handleDeleteImage = async (imgId, currentRoute) => {
    try {
      if (selectedImage) {
        setSelectedImage(null);
      }

      if (currentRoute === "/gallery/saved") {
        setSavedImages((pre) => pre.filter((img) => img._id !== imgId));
      } else if (currentRoute === "/gallery/my-images") {
        setMyImages((pre) => pre.filter((img) => img._id !== imgId));
      } else {
        setImages((pre) => pre.filter((img) => img._id !== imgId));
      }

      const { data } = await axios.delete(`/api/image/delete/${imgId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.log(error?.response?.data?.message || error);
    }
  };

  const handleSave = async (imgId) => {
    try {
      if (selectedImage) {
        setSelectedImage((pre) => ({ ...pre, saved: !pre.saved }));
      }
      const { data } = await axios.put(
        `/api/image/save/${imgId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setImages((pre) =>
        pre.map((img) =>
          img._id === imgId ? { ...img, saved: !img.saved } : img
        )
      );
    } catch (error) {
      console.log(error?.response?.data?.message || error);
    }
  };

  const handleNotInterested = async (imgId, imageOwnerId, currentRoute) => {
    try {
      if (currentUserInfo.userId === imageOwnerId) {
        return;
      }

      if (selectedImage) {
        setSelectedImage(null);
      }
      if (currentRoute === "/gallery/not-intrested-images") {
        setNotIntrestedImages((pre) => pre.filter((img) => img._id !== imgId));
      } else if (currentRoute === "/gallery/saved") {
        setSavedImages((pre) => pre.filter((img) => img._id !== imgId));
      } else {
        setImages((pre) => pre.filter((img) => img._id !== imgId));
      }
      const { data } = await axios.put(
        `/api/image/not-intrested-images/${imgId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.log(error?.response?.data?.message || error);
    }
  };

  const handleAddComment = async (imageId) => {
    try {
      if (newComment.trim()) {
        const { data } = await axios.put(
          `/api/image/add-comment/${imageId}`,
          { currentcomment: newComment },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNewComment("");
        if (selectedImage && selectedImage._id === imageId) {
          setSelectedImage((pre) => ({
            ...pre,
            comments: [...pre.comments, data.comment],
          }));
        }
      }
    } catch (error) {
      console.log(error?.response?.data?.message || error);
    }
  };

  const handleDeleteComment = async (imageId, currentCommentId) => {
    try {
      const { data } = await axios.put(
        `/api/image/delete-comment/${imageId}`,
        { currentCommentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSelectedImage((pre) => ({
        ...pre,
        comments: pre.comments.filter((cmt) => cmt._id !== currentCommentId),
      }));
    } catch (error) {
      console.log(error?.response?.data?.message || error);
    }
  };

  return {
    handleLike,
    handleDeleteImage,
    handleSave,
    handleNotInterested,
    handleAddComment,
    handleDeleteComment,
    state,
  };
};
