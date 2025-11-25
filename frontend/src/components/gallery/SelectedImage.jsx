import {
  Heart,
  MessageCircle,
  Bookmark,
  ThumbsDown,
  Trash2,
  X,
  Trash,
} from "lucide-react";

const SelectedImage = ({
  selectedImage,
  setSelectedImage,
  currentUserInfo,
  handleLike,
  handleDeleteImage,
  handleSave,
  handleNotInterested,
  currentRoute,
  newComment,
  setNewComment,
  handleAddComment,
  handleDeleteComment
}) => {
  return (
    <>
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => {
            setSelectedImage(null);
          }}
        >
          <div
            className="max-w-4xl w-full max-h-screen flex flex-col overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center  bg-slate-800">
              <div className="flex items-center gap-2">
                <h2 className="text-white text-lg font-semibold truncate  ">
                  {selectedImage.name}
                </h2>
                <span className="text-slate-400 text-sm">
                  by {selectedImage.uploader}
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedImage(null);
                }}
                className="text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <img
              src={selectedImage.url}
              alt={selectedImage.name}
              className="w-full h-auto  "
            />

            {/* Engagement Section */}
            <div className="bg-slate-800 p-4">
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleLike(
                        selectedImage._id,
                        selectedImage.uploadedBy,
                        currentRoute
                      )
                    }
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                      selectedImage.liked
                        ? "bg-red-600 text-white"
                        : "bg-slate-700 hover:bg-slate-600 text-slate-200"
                    }`}
                  >
                    <Heart
                      className="w-4 h-4"
                      fill={selectedImage.liked ? "currentColor" : "none"}
                    />
                    <span className="text-sm font-semibold">
                      {selectedImage.likes}
                    </span>
                  </button>
                  +
                </div>

                <button
                  onClick={() => handleSave(selectedImage._id)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                    selectedImage.saved
                      ? "bg-yellow-600 text-white"
                      : "bg-slate-700 hover:bg-slate-600 text-slate-200"
                  }`}
                >
                  <Bookmark
                    className="w-4 h-4"
                    fill={selectedImage.saved ? "currentColor" : "none"}
                  />
                  <span className="text-sm">
                    {selectedImage.saved ? "Saved" : "Save"}
                  </span>
                </button>

                {currentUserInfo.userId !== selectedImage.uploadedBy && (
                  <button
                    onClick={() => handleNotInterested(selectedImage._id)}
                    className="flex items-center gap-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-all"
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span className="text-sm">Not Interested</span>
                  </button>
                )}
              </div>

              <div className="text-slate-300 text-sm mb-4">
                <p>
                  Uploaded:{" "}
                  {new Date(selectedImage.createdAt).toLocaleDateString()}
                </p>
                {selectedImage.tags.length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {selectedImage.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-600 text-white text-xs px-3 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {selectedImage.uploadedBy === currentUserInfo.userId && (
                <button
                  onClick={() =>
                    handleDeleteImage(selectedImage._id, currentRoute)
                  }
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              )}
            </div>

            {/* Comments Section */}
            <div className="bg-slate-800 p-4">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-5 h-5 text-blue-400" />
                <h3 className="text-white font-semibold">
                  Comments ({selectedImage.comments.length})
                </h3>
              </div>

              {/* Comment Input */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && handleAddComment(selectedImage._id)
                  }
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={() => handleAddComment(selectedImage._id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
                >
                  Post
                </button>
              </div>

              {/* Comments List */}
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {selectedImage.comments.length > 0 ? (
                  selectedImage.comments.map((comment, idx) => (
                    <div key={idx} className="bg-slate-700 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-1">
                        <div>
                          <span className="text-blue-400 font-semibold text-sm">
                            {comment.user}
                          </span>
                          <span className="text-slate-400 text-xs ml-2">
                            {comment.timestamp}
                          </span>
                        </div>

                        {/* Delete Icon */}
                      {comment.userId === currentUserInfo.userId && <Trash
                          className="w-4 h-4 text-red-400 hover:text-red-500 cursor-pointer"
                          onClick={() => handleDeleteComment(selectedImage._id,comment._id)}
                        />}
                      </div>

                      <p className="text-slate-200 text-sm">{comment.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-sm text-center py-4">
                    No comments yet. Be the first!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectedImage;
