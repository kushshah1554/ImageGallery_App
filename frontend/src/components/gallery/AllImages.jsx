import GalleryGrid from "./GalleryGrid";

const AllImages = ({
  images,
  setImages,
  handleLike,
  handleDeleteImage,
  handleSave,
  loading,
  handleNotInterested,
  setSelectedImage,
  filterImages,
  currentRoute,
}) => {
  return (
    <GalleryGrid
      images={filterImages}
      handleLike={handleLike}
      handleDeleteImage={handleDeleteImage}
      handleSave={handleSave}
      loading={loading}
      handleNotInterested={handleNotInterested}
      setSelectedImage={setSelectedImage}
      currentRoute={currentRoute}
    />
  );
};

export default AllImages;
