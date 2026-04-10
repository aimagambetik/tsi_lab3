import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Header from './components/Header.tsx'; 
import './App.css'; 
import Footer from './components/Footer.tsx';
import Halal from './pages/Halal.tsx';
import { ProductsPage } from './pages/products.tsx';

function App() {
  return (
    <Router>
      <div className="app">
       
        <Header />
 
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/halal" element={<Halal />} />
            <Route path="/products" element={<ProductsPage />} />
            
          </Routes>
        </main> 
        <Footer/>
      </div>
    </Router>
  );
}

export default App;