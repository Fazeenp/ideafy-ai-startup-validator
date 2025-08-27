import { useState } from "react";
import axios from "axios";

function App() {
  const [msg, setMsg] = useState("");


  const checkHealth = async () =>{
    try {
      const res = await axios.get("http://localhost:5000/api/health")
      setMsg(res.data.message)
    } catch (error) {
      setMsg("Error connecting to backend");
    
    }
  }


  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">🚀 Startup Validator</h1>
      <button
        onClick={checkHealth}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow"
      >
        Check Backend
      </button>
      <p className="mt-4">{msg}</p>
    </div>
  );
}

export default App;
