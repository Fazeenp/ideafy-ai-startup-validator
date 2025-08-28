

import { Routes, Route } from "react-router-dom";
import IdeaForm from "./components/IdeaForm";
import Result from "./components/Result";


function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Routes>
        <Route path="/form" element={<IdeaForm />} />
        <Route path="/results" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
