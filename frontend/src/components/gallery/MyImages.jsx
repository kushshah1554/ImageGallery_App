import { useContext, useEffect } from "react";
import { TokenContext } from "../../TokenProvider";
import { useOutletContext } from "react-router-dom";
import GalleryGrid from "./GalleryGrid";
import axios from "axios";
import NoImageYet from "./NoImageYet";

const MyImages = () => {
  const { token } = useContext(TokenContext);
  const {
    handleLike,
    handleDeleteImage,
    handleSave,
    images,
    myImages,
    setMyImages,
    setSelectedImage,
    currentRoute,
  } = useOutletContext();

  const fetchMyImages = async () => {
    try {
      const { data } = await axios.get("/api/image/get-my-images", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyImages(data.myImages);
    } catch (error) {
      console.log(error?.response?.data?.message || error);
    }
  };

  useEffect(() => {
    fetchMyImages();
  }, [images]);

  return (
    <>
      {myImages?.length !== 0 ? (
        <div className="px-4 py-2">
          <GalleryGrid
            images={myImages}
            handleLike={handleLike}
            handleDeleteImage={handleDeleteImage}
            handleSave={handleSave}
            setSelectedImage={setSelectedImage}
            currentRoute={currentRoute}
          />
        </div>
      ) : (
        <div className=" h-[calc(100vh-6rem)] flex items-center justify-center">
          <NoImageYet myImage={true} />
        </div>
      )}
    </>
  );
};

export default MyImages;
