import { useState } from "react";
import { useContext } from "react";
import { TokenContext } from "../../../TokenProvider";

export const useImageState = () => {
  const [images, setImages] = useState([]);
  const [savedImages, setSavedImages] = useState([]);
  const [myImages, setMyImages] = useState([]);
  const [notIntrestedImages, setNotIntrestedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [toggleAfterNotIntrested, setToggleAfterNotIntrested] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { token, currentUserInfo } = useContext(TokenContext);

  return {
    images,
    setImages,
    savedImages,
    setSavedImages,
    myImages,
    setMyImages,
    notIntrestedImages,
    setNotIntrestedImages,
    selectedImage,
    setSelectedImage,
    searchQuery,
    setSearchQuery,
    loading,
    setLoading,
    token,
    currentUserInfo,
    toggleAfterNotIntrested,
    setToggleAfterNotIntrested,
    newComment,
    setNewComment,
  };
};
