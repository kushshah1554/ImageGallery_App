import { Upload, Menu, X } from "lucide-react";
import { useContext, useState } from "react";
import axios from "axios";
import { TokenContext } from "../../TokenProvider";
import { Link, NavLink, useMatch, useNavigate } from "react-router-dom";
const Header = ({ setImages, setLoading }) => {
  const { token} = useContext(TokenContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    try {
      setLoading(true);
      const files = e.target.files;

      if (!files.length) {
        return;
      }

      const formData = new FormData();
      formData.append("image", files[0]);
      const { data } = await axios.post("/api/image/upload", formData, {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setImages((pre) => [data.newImage, ...pre]);
    } catch (error) {
      console.log(error?.response?.data?.message || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-sm bg-slate-900/80 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link onClick={()=>{setMobileMenuOpen(false);navigate("/gallery");}}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Gallery
              </h1>
            </div>
          </Link>
          <label className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 transform hover:scale-105">
            <Upload className="w-5 h-5" />
            <span className="hidden sm:inline">Upload Images</span>
            <span className="sm:hidden">Upload</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className=" p-2 rounded-lg bg-slate-900/70 hover:bg-slate-800/80 text-white transition-colors duration-200 cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className=" max-w-1/6 bg-slate-900/70 backdrop-blur-lg shadow-lg rounded-xl py-6 px-4 space-y-3  transition-all duration-300">
          <NavLink
            to="saved"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `block font-medium py-2 transition-colors ${
                isActive
                  ? "text-blue-600"
                  : "text-gray-200 hover:text-purple-400"
              }`
            }
          >
            Saved Images
          </NavLink>
          <NavLink
            to="not-intrested-images"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `block font-medium py-2 transition-colors ${
                isActive
                  ? "text-blue-600"
                  : "text-gray-200 hover:text-purple-400"
              }`
            }
          >
            Not Intrested Images
          </NavLink>
          <NavLink
            to="my-images"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `block font-medium py-2 transition-colors ${
                isActive
                  ? "text-blue-600"
                  : "text-gray-200 hover:text-purple-400"
              }`
            }
          >
            My Images
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;
