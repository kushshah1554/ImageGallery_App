import { useContext, useEffect } from "react";
import { TokenContext } from "../../TokenProvider";
import GalleryGrid from "./GalleryGrid";

import axios from "axios";

import { useOutletContext } from "react-router-dom";
import NoImageYet from "./NoImageYet";

const SavedImages = () => {
  const { token } = useContext(TokenContext);
  const {
    handleLike,
    handleDeleteImage,
    handleSave,
    images,
    savedImages,
    setSavedImages,
    handleNotInterested,
    setSelectedImage,
    currentRoute,
  } = useOutletContext();

  const fetchSavedImages = async () => {
    try {
      const { data } = await axios.get("/api/image/get-saved-images", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSavedImages(data.savedImages);
    } catch (error) {
      console.log(error?.response?.data?.message || error);
      setSavedImages(error?.response?.data?.savedImages);
    }
  };

  useEffect(() => {
    fetchSavedImages();
  }, [images]);

  return (
    <>
      {savedImages?.length !== 0 ? (
        <div className="px-4 py-2">
          <GalleryGrid
            images={savedImages}
            handleLike={handleLike}
            handleDeleteImage={handleDeleteImage}
            handleSave={handleSave}
            handleNotInterested={handleNotInterested}
            setSelectedImage={setSelectedImage}
            currentRoute={currentRoute}
          />{" "}
        </div>
      ) : (
        <div className="h-[calc(100vh-6rem)] flex items-center justify-center">
          <NoImageYet saved="saved" />
        </div>
      )}
    </>
  );
};

export default SavedImages;
