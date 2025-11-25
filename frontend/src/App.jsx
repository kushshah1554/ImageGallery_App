
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import ImageGalleryApp from "./components/gallery/ImageGalleryApp";
import SignupForm from "./components/signup/Signup";
import PixelShareHomepage from "./components/homePage/PixelShareHomepage";
import RootLayout from "./RootLayout";
import Login from "./components/login/Login";
import SavedImages from "./components/gallery/SavedImages";
import Error404 from "./Error404";
import MyImages from "./components/gallery/MyImages";
import NotIntrestedImages from "./components/gallery/NotIntrestedImages";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
      <Route index element={<PixelShareHomepage/>}/>
      <Route path="gallery" element={<ImageGalleryApp/>}>
      <Route path="saved" element={<SavedImages/>}/>
      <Route path="my-images" element={<MyImages/>}/>
      <Route path="not-intrested-images" element={<NotIntrestedImages/>}/>
      </Route>
      <Route path="signup" element={<SignupForm />}/>
      <Route path="login" element={<Login />}/>
      <Route path="*" element={<Error404/>}/>
    </Route>)
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
