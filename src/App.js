import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./navigation/Navigation";

import Quize from "./pages/Quize";
import CreateQuiz from "./pages/CreateQuiz";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <div className="container">
          <h3 className="text-center text-uppercase mt-3 mb-3">
            Dorik Quiz App
          </h3>
          <Routes>
            <Route path="/" element={<Quize />} />
            <Route path="/createquiz" element={<CreateQuiz />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
