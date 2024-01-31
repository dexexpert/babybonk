import Main from "./pages/Main";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Layout/Header";
import Review from "pages/Review";
import VideoBackground from "./VideoBackground.jsx";

function App() {
  return (
    <div className="App">
      <VideoBackground />
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/review/:slug" element={<Review />} />
      </Routes>
    </div>
  );
}

export default App;
