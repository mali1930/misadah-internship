import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import "swiper/css/bundle";
import Skeleton from "./components/UI/Skeleton";
function App() {
  return (
    <div>
      <Skeleton />
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/author/:id" element={<Author />} />
          <Route path="/item-details/:id" element={<ItemDetails />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
