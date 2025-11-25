import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../TokenProvider";
import GalleryGrid from "./GalleryGrid";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import NoImageYet from "./NoImageYet";

const NotIntrestedImages = () => {
  const { token } = useContext(TokenContext);
  const {
    handleNotInterested,
    notIntrestedImages,
    setNotIntrestedImages,
    currentRoute,
  } = useOutletContext();

  const fetchNotIntrestedImages = async () => {
    try {
      const { data } = await axios.get("/api/image/get-not-intrested-images", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotIntrestedImages(data.notIntrestedImgs);
    } catch (error) {
      console.log(error?.response?.data?.message || error);
      setNotIntrestedImages(error?.response?.data?.notIntrestedImgs);
    }
  };

  useEffect(() => {
    fetchNotIntrestedImages();
  }, []);

  return (
    <>
      {notIntrestedImages?.length !== 0 ? (
        <div className="px-4 py-2">
          <GalleryGrid
            images={notIntrestedImages}
            handleNotInterested={handleNotInterested}
            currentRoute={currentRoute}
          />{" "}
        </div>
      ) : (
        <div className="h-[calc(100vh-6rem)] flex items-center justify-center">
          <NoImageYet notIntrested="NotIntrested" />
        </div>
      )}
    </>
  );
};

export default NotIntrestedImages;
