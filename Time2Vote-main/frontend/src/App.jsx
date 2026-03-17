import MyMainPage from "./MainPage/MyMainPage";
import MyExpertPage from "./ExpertPage/MyExpertPage";
import MyPublicPage from "./PublicPage/MyPublicPage";
import MyFeedbackPage from "./FeedbackPage/MyFeedbackPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function App() {
  return (
    <div style={{ backgroundColor: "lightblue", height: "100%", minHeight:"100vh" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyMainPage />} />
          <Route path="/experts/:voteId" element={<MyExpertPage />} />
          <Route path="/public/:voteId" element={<MyPublicPage />} />
          <Route path="/feedback/:voteId" element={<MyFeedbackPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
