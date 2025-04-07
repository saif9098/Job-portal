import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import UpdateProfile from "./pages/UpdateProfile";
import Postjob from "./pages/Postjob";
import Upadatejob from "./pages/Upadatejob";
import Navbar from "./components/Layout/Nav/Navbar";
import "./styles/InnerPage.css"
import "./styles/AuthStyles.css"
import AdminRoute from "./components/routes/AdminRoute";
import ForgotPasssword from "./pages/ForgotPasssword";
import Resume from "./pages/Resume";
import EditResume from "./pages/EditResume";
import AddResume from "./pages/AddResume";
import Applicants from "./pages/Applicants";
import ApplicantInfo from "./pages/AplicantInfo";
import MyApplicaions from "./pages/MyApplicaions";
import JobInfoPage from "./pages/jobInfoPage";
import Author from "./pages/authorPaage/author";
import SuitableJobs from "./pages/usersPage/SuitableJobs"
import AuthorRoute from "./components/routes/AuthorRoute";
import ComnPrivatRoute from "./components/routes/ComnPrivatRoute";
function App() {
  
  return (
    <>
      <div style={{ background: '#eef0fd' , minHeight:'100vh'}}>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <HomePage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password" 
          element={<ForgotPasssword />}
           />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/suitable-jobs-for-you"
          element={
            <PublicRoute>
              <SuitableJobs/>
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route path="/dashboard/post-jobs" element ={<AdminRoute><Postjob/></AdminRoute>}/>
        <Route path="dashboard/update-job/:id" element ={<AdminRoute><Upadatejob/></AdminRoute>}/>
        <Route path="dashboard/applicants" element ={<AdminRoute><Applicants/></AdminRoute>}/>
        <Route path="dashboard/applicantinfo/:id" element ={<AdminRoute><ApplicantInfo/></AdminRoute>}/>
    
      
      <Route
      path="/user/profile"
      element={
        <ComnPrivatRoute>
          <UpdateProfile />
        </ComnPrivatRoute>
      }
    />
      <Route
      path="/user/resume"
      element={
        <PrivateRoute>
          <Resume />
        </PrivateRoute>
      }
    />
      <Route
      path="/user/addresume"
      element={
        <PrivateRoute>
          <AddResume />
        </PrivateRoute>
      }
    />
      <Route
      path="/user/editresume"
      element={
        <PrivateRoute>
          <EditResume />
        </PrivateRoute>
      }
    />
      <Route
      path="/user/applications"
      element={
        <PrivateRoute>
          <MyApplicaions />
        </PrivateRoute>
      }
    />
      <Route
      path="/user/jobdetails/:id"
      element={
        <PrivateRoute>
          <JobInfoPage />
        </PrivateRoute>
      }
    />
      <Route
          path="/author/setup"
          element={
            <AuthorRoute>
              <Author/>
            </AuthorRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
    </>
  );
}

export default App;
