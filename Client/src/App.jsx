import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import  Home  from "./pages/clientPages/home";
import  Profile from "./pages/clientPages/profile";
import SignIn from "../src/pages/auth/sign-in";
import SignUp  from "../src/pages/auth/sign-up";
import ProtectedRoute from "./components/ProtectRoute";
import PostOne from "./pages/post-Job/PostOne";
import PostTwo from "./pages/post-Job/PostTwo";
import PostThree from "./pages/post-Job/PostThree";
import PostFour from "./pages/post-Job/PostFour";
import PostFive from "./pages/post-Job/PostFive";
import Otp from "./pages/auth/Otp";
import UserType from "./pages/auth/UserType";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminLogin from "./pages/adminPages/AdminLogin";
import AdminDashboard from "./pages/adminPages/AdminDashboard";
import ProfilePage from "./pages/adminPages/ProfilePage";
import TablesPage from "./pages/adminPages/TablesPage";
import Layout from "./components/Layout ";
import Otp2 from "./pages/auth/Otp2";
import ResetPassword from "./pages/auth/ResetPassword";
import ProfileEdit from "./pages/clientPages/ProfileEdit";
import { ToastContainer } from 'react-toastify';
import AdminProtectRoute from "./components/adminProtectRoute";
import ChangePassword from "./pages/auth/ChangePassword";
import EditProfile from "./pages/adminPages/EditProfile";

////////////  admin

function App() {

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
        <Route path="/otp" element={ <Otp />} />
        <Route path="/user-type" element={ <UserType />} />
        <Route path="/forgot-password" element={ <ForgotPassword />} />
        <Route path="/reset-password" element={ <ResetPassword />} />
        <Route path="/forgot-password/otp" element={ <Otp2 />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> 
        <Route path="/profile/edit" element={<ProfileEdit />} /> 
        {/* <Route path="/post-1" element={<PostOne/>} />
        <Route path="/post-2" element={<PostTwo/>} />
        <Route path="/post-3" element={<PostThree/>} />
        <Route path="/post-4" element={<PostFour/>} />
        <Route path="/post-5" element={<PostFive/>} /> */}
        <Route path="/admin/login" element={<AdminLogin/>} />
        <Route path="/admin/dashboard" element={<AdminProtectRoute><Layout><AdminDashboard/></Layout></AdminProtectRoute>} />
        <Route path="/admin/profile" element={<AdminProtectRoute><Layout><ProfilePage/></Layout></AdminProtectRoute>} />
        <Route path="/admin/table" element={<AdminProtectRoute><Layout><TablesPage/></Layout></AdminProtectRoute>} />
        <Route path="/admin/profile-edit" element={<AdminProtectRoute><Layout><EditProfile/></Layout></AdminProtectRoute>} />
        <Route path="/admin/change-password" element={<ChangePassword/>} />
        <Route path="*" element={<p>Page Not Found</p>} />
      </Routes> 
        <ToastContainer/>
      
    </>
  );
}

export default App;
