import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { TokenContext } from "../../TokenProvider";

const Navigation = ({ Camera }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const {token,setToken}=useContext(TokenContext);

  const scrollToFeature = (id) => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const handleLogout=(mobile)=>{
    localStorage.removeItem("accessToken");
    setToken(null);
     if (mobile === "mb") {
      setMobileMenuOpen(false);
    }
  }




  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-900/70 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-white">
                PixelShare
              </span>
            </div>
          </Link>
          <div className=" hidden sm:flex items-center gap-4">
            <button
              onClick={() => scrollToFeature("features")}
              className=" block text-slate-300 hover:text-white transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToFeature("about")}
              className=" block text-slate-300 hover:text-white transition-colors"
            >
              About
            </button>
{token?<button onClick={handleLogout} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-2 rounded-full font-semibold transition-all transform hover:scale-105">
              Logout
            </button>:
            <div  className="space-x-3">
            <button onClick={()=>navigate("login")} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-2 rounded-full font-semibold transition-all transform hover:scale-105">
              Login
            </button>
            <button onClick={()=>navigate("signup")} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-2 rounded-full font-semibold transition-all transform hover:scale-105">
              Sign up
            </button>

            </div>
}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 rounded-lg bg-slate-900/70 hover:bg-slate-800/80 text-white transition-colors duration-200 cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
{mobileMenuOpen && (
  <div className="md:hidden bg-slate-900/70 backdrop-blur-lg shadow-lg rounded-xl py-6 px-4 space-y-3 mt-3 transition-all duration-300">
    <a
      href="#features"
      onClick={() => scrolltoFeature("features", "mb")}
      className="block text-gray-200 hover:text-purple-400 font-medium py-2 transition-colors"
    >
      Features
    </a>
    <a
      href="#about"
      onClick={() => scrolltoFeature("about", "mb")}
      className="block text-gray-200 hover:text-purple-400 font-medium py-2 transition-colors"
    >
      About
    </a>
    <a
      href="#contact"
      onClick={() => scrolltoFeature("contact", "mb")}
      className="block text-gray-200 hover:text-purple-400 font-medium py-2 transition-colors"
    >
      Contact
    </a>

    {token ? (
      <button
        onClick={() => handleLogout("mb")}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
      >
        Log out
      </button>
    ) : (
      <div className="space-y-2">
        <button
          onClick={() => {
            setMobileMenuOpen(false);
            navigate("login");
          }}
          className="w-full text-left text-gray-300 hover:text-purple-400 font-semibold py-2 transition-colors"
        >
          Login
        </button>
        <button
          onClick={() => {
            setMobileMenuOpen(false);
            navigate("signup");
          }}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
        >
          Sign Up
        </button>
      </div>
    )}
  </div>
)}

    </nav>
  );
};

export default Navigation;
