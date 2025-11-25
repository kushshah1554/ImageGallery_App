
import { Upload, Search, Heart, Shield, Users, Zap, Camera, ArrowRight, MessageCircle, Bookmark } from 'lucide-react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../TokenProvider';


export default function PixelShareHomepage() {
   
  const navigate=useNavigate();

  const {token}=useContext(TokenContext);
  
  const scrollToFeature = (id, e) => {
  e?.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    window.scrollTo({
      top: element.offsetTop,
      behavior: "smooth",
    });
  }
};

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}

      {/* Hero Section */}
      <section id='about' className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <span className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-semibold border border-blue-600/30">
              ✨ The Future of Image Sharing
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Share Your Moments,<br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Connect with Others
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto px-4">
            A beautiful platform to upload, discover, and interact with stunning images. Like, comment, save, and build your collection in a vibrant community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <button onClick={()=>{token?navigate("gallery"):navigate("login");}} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/50">
              Start Exploring
              <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={()=>{token?navigate("gallery"):navigate("login");}} className="bg-slate-800 hover:bg-slate-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all border border-slate-600">
              Upload Photos
            </button>
          </div>
        </div>
      </section>

      {/* Feature Showcase with Images */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16 lg:mb-24">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg h-32 sm:h-40 flex items-center justify-center">
                    <Camera className="w-12 h-12 sm:w-16 sm:h-16 text-white opacity-50" />
                  </div>
                  <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg h-32 sm:h-40 flex items-center justify-center">
                    <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-white opacity-50" />
                  </div>
                  <div className="bg-gradient-to-br from-pink-600 to-pink-800 rounded-lg h-32 sm:h-40 flex items-center justify-center">
                    <MessageCircle className="w-12 h-12 sm:w-16 sm:h-16 text-white opacity-50" />
                  </div>
                  <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-lg h-32 sm:h-40 flex items-center justify-center">
                    <Bookmark className="w-12 h-12 sm:w-16 sm:h-16 text-white opacity-50" />
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                Beautiful Gallery Experience
              </h2>
              <p className="text-base sm:text-lg text-slate-300 mb-6">
                Upload unlimited images with a stunning grid layout. Every photo gets the spotlight it deserves with smooth animations and responsive design.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-300">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span>Drag & drop multiple images</span>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span>Auto-tagging for easy search</span>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span>Full-screen preview modal</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id='features' className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
              Powerful features designed for creators and communities
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-blue-500 transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Easy Uploads</h3>
              <p className="text-slate-400 text-sm">Upload multiple images instantly with drag and drop support. No limits, no hassle.</p>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-purple-500 transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Social Interactions</h3>
              <p className="text-slate-400 text-sm">Like, comment, and save your favorite images from the community.</p>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-green-500 transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-green-500/20">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Smart Search</h3>
              <p className="text-slate-400 text-sm">Find images quickly with powerful search and automatic tagging system.</p>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 hover:border-red-500 transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-red-500/20">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Privacy Control</h3>
              <p className="text-slate-400 text-sm">Block users and hide content you're not interested in. Stay in control.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Camera className="w-8 h-8 text-blue-400" />
                <h3 className="text-4xl sm:text-5xl font-bold text-white">Unlimited</h3>
              </div>
              <p className="text-slate-400 text-base sm:text-lg">Image Uploads</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-8 h-8 text-purple-400" />
                <h3 className="text-4xl sm:text-5xl font-bold text-white">1000+</h3>
              </div>
              <p className="text-slate-400 text-base sm:text-lg">Active Users</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="w-8 h-8 text-yellow-400" />
                <h3 className="text-4xl sm:text-5xl font-bold text-white">Fast</h3>
              </div>
              <p className="text-slate-400 text-base sm:text-lg">Performance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-12 sm:mb-16">
            Loved by Creators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-slate-800 p-6 sm:p-8 rounded-2xl border border-slate-700">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-slate-300 mb-4 text-sm sm:text-base">
                "PixelShare has transformed how I share my photography. The interface is beautiful and the community is amazing!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full"></div>
                <div>
                  <p className="text-white font-semibold text-sm sm:text-base">Sarah Johnson</p>
                  <p className="text-slate-400 text-xs sm:text-sm">Professional Photographer</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 p-6 sm:p-8 rounded-2xl border border-slate-700">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-slate-300 mb-4 text-sm sm:text-base">
                "The best image sharing platform I've used. Love the social features and how easy it is to organize my photos."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full"></div>
                <div>
                  <p className="text-white font-semibold text-sm sm:text-base">Mike Chen</p>
                  <p className="text-slate-400 text-xs sm:text-sm">Content Creator</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 p-6 sm:p-8 rounded-2xl border border-slate-700">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-slate-300 mb-4 text-sm sm:text-base">
                "Simple, fast, and beautiful. Everything I need to share my work with the world. Highly recommended!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full"></div>
                <div>
                  <p className="text-white font-semibold text-sm sm:text-base">Emma Davis</p>
                  <p className="text-slate-400 text-xs sm:text-sm">Digital Artist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8">
            Join thousands of users sharing their best moments
          </p>
          <button onClick={()=>{token?navigate("gallery"):navigate("login");}} className="bg-white text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-slate-100 transition-all transform hover:scale-105 inline-flex items-center gap-2 shadow-lg">
            Launch Gallery
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-700 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">PixelShare</span>
              </div>
              <p className="text-slate-400 text-sm">
                The beautiful way to share and discover images.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" onClick={(e)=>scrollToFeature("features",e)} className="text-slate-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Gallery</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" onClick={(e)=>scrollToFeature("about",e)} className="text-slate-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center">
            <p className="text-slate-400 text-sm">
              &copy; 2025 PixelShare. Built with React & Tailwind CSS. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}