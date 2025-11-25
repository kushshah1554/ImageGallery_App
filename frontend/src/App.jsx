import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
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
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<PixelShareHomepage />} />
        <Route
          path="gallery"
          element={
            <ProtectedRoute>
              <ImageGalleryApp />{" "}
            </ProtectedRoute>
          }
        >
          <Route
            path="saved"
            element={
              <ProtectedRoute>
                <SavedImages />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-images"
            element={
              <ProtectedRoute>
                <MyImages />
              </ProtectedRoute>
            }
          />
          <Route
            path="not-intrested-images"
            element={
              <ProtectedRoute>
                <NotIntrestedImages />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="signup" element={<ProtectedRoute isLoginOrSignup={true}><SignupForm /></ProtectedRoute>} />
        <Route path="login" element={<ProtectedRoute isLoginOrSignup={true}><Login /></ProtectedRoute>} />
        <Route path="*" element={<Error404 />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
