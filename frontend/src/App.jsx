import { Routes, Route } from "react-router-dom";
import IdeaForm from "./components/IdeaForm";
import Results from "./components/Results";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";


function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<IdeaForm />} />
        <Route path="/results" element={<Results />} />
      </Routes>
      <Footer />
    </div>
  );
}



export default App;
