import { useContext } from "react";
import {
  Heart,
  MessageCircle,
  Bookmark,
  ThumbsDown,
  Trash2,
} from "lucide-react";
import { TokenContext } from "../../TokenProvider";
import axios from "axios";
const GalleryGrid = ({
  images,
  loading,
  handleLike,
  handleDeleteImage,
  handleSave,
  handleNotInterested,
  setSelectedImage,
  currentRoute,
}) => {
  const { token, currentUserInfo } = useContext(TokenContext);

  const fetchCurrentImageComments = async (img) => {
    try {
      const { data } = await axios.get(`/api/image/fetch-comment/${img._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedImage({ ...img, comments: data.comments });
    } catch (error) {
      console.log(error?.response?.data?.message || error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-max ">
      {loading && (
        <div className=" bg-slate-800 rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"></div>
      )}
      {images?.map((img) => (
        <div
          key={img._id}
          className="group relative bg-slate-800 rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
        >
          <img
            src={img.url}
            alt={img.name}
            className="w-full h-48 sm:h-56 object-cover"
            onClick={() => {
              fetchCurrentImageComments(img);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Uploader Info */}
          <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-slate-200">
            {img.uploader}
          </div>

          {/* Info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-white text-sm font-semibold truncate">
              {img.name}
            </p>
            <p className="text-slate-300 text-xs">
              {new Date(img.createdAt).toLocaleDateString()}
            </p>
            {img.tags.length > 0 && (
              <div className="flex gap-1 mt-2 flex-wrap">
                {img.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-600/80 text-white text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute bottom-0 right-0 flex gap-1 p-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            {currentRoute !== "/gallery/not-intrested-images" && (
              <div>
                <button
                  onClick={() =>
                    handleLike(img._id, img.uploadedBy, currentRoute)
                  }
                  className={`p-2 rounded-lg transition-all cursor-pointer ${
                    img.liked
                      ? "bg-red-600 text-white"
                      : "bg-slate-700 hover:bg-slate-600 text-slate-200"
                  }`}
                  title="Like"
                >
                  <Heart
                    className="w-4 h-4"
                    fill={img.liked ? "currentColor" : "none"}
                  />
                </button>
                <button
                  onClick={() => {
                    fetchCurrentImageComments(img);
                  }}
                  className="bg-slate-700 hover:bg-slate-600 text-slate-200 p-2 rounded-lg transition-all cursor-pointer"
                  title="Comment"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleSave(img._id)}
                  className={`p-2 rounded-lg transition-all cursor-pointer ${
                    img.saved
                      ? "bg-yellow-600 text-white"
                      : "bg-slate-700 hover:bg-slate-600 text-slate-200"
                  }`}
                  title="Save"
                >
                  <Bookmark
                    className="w-4 h-4"
                    fill={img.saved ? "currentColor" : "none"}
                  />
                </button>{" "}
              </div>
            )}
            {currentUserInfo.userId !== img.uploadedBy && (
              <button
                onClick={() =>
                  handleNotInterested(img._id, img.uploadedBy, currentRoute)
                }
                className={`p-2 rounded-lg transition-all cursor-pointer ${
                  currentRoute === "/gallery/not-intrested-images"
                    ? "bg-yellow-600 text-white"
                    : "bg-slate-700 hover:bg-slate-600 text-slate-200"
                }`}
                title="Not Interested"
              >
                <ThumbsDown className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Delete button (only for own images) */}
          {currentUserInfo?.userId === img.uploadedBy &&
            currentRoute !== "/gallery/not-intrested-images" && (
              <button
                onClick={() => handleDeleteImage(img._id, currentRoute)}
                className="absolute top-2 right-2 cursor-pointer bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
