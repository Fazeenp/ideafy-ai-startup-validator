import { Routes, Route, useLocation } from "react-router-dom";
import IdeaForm from "./components/IdeaForm";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import StartupReport from "./components/StartupReport/StartupReport";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Demo from "./pages/Demo";

function App() {
  const location = useLocation();
  const hideHeaderPaths = ["/idea", "/dashboard"];
  const hideHeader = hideHeaderPaths.includes(location.pathname);
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {!hideHeader && <Header />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<IdeaForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            localStorage.getItem("token") ? (
              <Dashboard />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/ideas/:id" element={<StartupReport />} />
        <Route path="/demo" element={<Demo/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
