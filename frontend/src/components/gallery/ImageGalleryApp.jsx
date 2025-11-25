import { useEffect } from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import axios from "axios";
import AllImages from "./AllImages";
import { matchPath, Outlet, useLocation, useMatch } from "react-router-dom";
import SelectedImage from "./SelectedImage";
import NoImageYet from "./NoImageYet";
import NoImageFound from "./NoImageFound";
import { useImageOperations } from "./operations on images/imageOperations";

const ImageGalleryApp = () => {
  const {
    handleLike,
    handleDeleteImage,
    handleSave,
    handleNotInterested,
    handleAddComment,
    handleDeleteComment,
    state,
  } = useImageOperations();

  const {
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
    newComment,
    setNewComment,
  } = state;
  const isGallery = useMatch("gallery");
  const location = useLocation();

  // check if current path matches any of them
  const runOnRoutes = [
    "/gallery",
    "/gallery/saved",
    "/gallery/my-images",
    "/gallery/not-intrested-images",
  ];

  const currentRoute = runOnRoutes.find((route) =>
    matchPath(route, location.pathname)
  );

  const filterImages = images.filter((img) => {
    const query = searchQuery.toLowerCase();
    return (
      img.name.toLowerCase().includes(query) ||
      img.tags.some((tag) => tag.includes(query)) ||
      img.uploader.toLowerCase().includes(query)
    );
  });

  const fetchImages = async () => {
    try {
      const { data } = await axios.get("/api/image/get-images", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setImages(data.images);
    } catch (error) {
      console.log(error?.response?.data?.message || error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [currentRoute]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br  from-slate-900 via-slate-800 to-slate-900">
        <Header setImages={setImages} setLoading={setLoading} />

        {isGallery && (
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            {Boolean(images?.length) && (
              <div className="flex gap-4 mb-6 text-sm text-slate-300">
                <span>Total: {images?.length} images</span>
              </div>
            )}
            {filterImages.length !== 0 ? (
              <AllImages
                images={images}
                filterImages={filterImages}
                setImages={setImages}
                handleLike={handleLike}
                handleDeleteImage={handleDeleteImage}
                handleSave={handleSave}
                loading={loading}
                handleNotInterested={handleNotInterested}
                setSelectedImage={setSelectedImage}
                currentRoute={currentRoute}
              />
            ) : (
              <div className="text-center py-16">
                {images.length === 0 ? (
                  <NoImageYet myImage={true} />
                ) : (
                  <NoImageFound />
                )}
              </div>
            )}
          </div>
        )}

        <Outlet
          context={{
            handleLike,
            handleDeleteImage,
            handleSave,
            images,
            savedImages,
            setSavedImages,
            myImages,
            setMyImages,
            handleNotInterested,
            notIntrestedImages,
            setNotIntrestedImages,
            setSelectedImage,
            currentRoute,
          }}
        />

        <SelectedImage
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          currentUserInfo={currentUserInfo}
          handleLike={handleLike}
          handleDeleteImage={handleDeleteImage}
          handleSave={handleSave}
          handleNotInterested={handleNotInterested}
          currentRoute={currentRoute}
          newComment={newComment}
          setNewComment={setNewComment}
          handleAddComment={handleAddComment}
          handleDeleteComment={handleDeleteComment}
        />
      </div>
    </>
  );
};

export default ImageGalleryApp;
