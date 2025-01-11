import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import  Home  from "../src/pages/home";
import  Profile from "../src/pages/Profile";
import SignIn from "../src/pages/sign-in";
import SignUp  from "../src/pages/sign-up";
import ProtectedRoute from "./components/ProtectRoute";
import PostOne from "./pages/post-Job/PostOne";
import PostTwo from "./pages/post-Job/PostTwo";
import PostThree from "./pages/post-Job/PostThree";
import PostFour from "./pages/post-Job/PostFour";
import PostFive from "./pages/post-Job/PostFive";
import Otp from "./pages/Otp";
import UserType from "./pages/UserType";


function App() {
  const { pathname } = useLocation();

  return (
    <>
    {/* {!(pathname == '/sign-in' || pathname == '/sign-up') && (
        <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
          <Navbar />
        </div>
      )
      } */}
      <Routes>
        <Route index element={<Navigate to="/home" replace />}/>
        <Route path="/home" element={<Home />} >
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={ <SignUp />} />
        </Route> 
        <Route path="otp" element={ <Otp />} />
        <Route path="user-type" element={ <UserType />} />
        <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> 
        <Route path="/post-1" element={<PostOne/>} />
        <Route path="/post-2" element={<PostTwo/>} />
        <Route path="/post-3" element={<PostThree/>} />
        <Route path="/post-4" element={<PostFour/>} />
        <Route path="/post-5" element={<PostFive/>} />
        <Route path="*" element={<p>Page Not Found</p>} />
      </Routes>
    </>
  );
}

export default App;
