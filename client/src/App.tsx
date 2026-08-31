import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import { CompareProvider } from "./context/CompareContext";
import { Navbar } from "./components/common/Navbar";
import { Footer } from "./components/common/Footer";
import { CompareDrawer } from "./components/car/CompareDrawer";

import { Home } from "./pages/Home";
import { CarListings } from "./pages/CarListings";
import { CarDetail } from "./pages/CarDetail";
import { SellCar } from "./pages/SellCar";
import { Compare } from "./pages/Compare";
import { PriceEstimator } from "./pages/PriceEstimator";
import { FinancingCalculator } from "./pages/FinancingCalculator";
import { Blog } from "./pages/Blog";
import { BlogPost } from "./pages/BlogPost";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Partners } from "./pages/Partners";
import { UserDashboard } from "./pages/UserDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { NotFound } from "./pages/NotFound";

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <WishlistProvider>
          <CompareProvider>
            <BrowserRouter>
              <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#FF8C00] selection:text-white antialiased">
                <Navbar />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/inventory" element={<CarListings />} />
                    <Route path="/car/:id" element={<CarDetail />} />
                    <Route path="/sell" element={<SellCar />} />
                    <Route path="/compare" element={<Compare />} />
                    <Route path="/estimator" element={<PriceEstimator />} />
                    <Route path="/financing" element={<FinancingCalculator />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/partners" element={<Partners />} />
                    <Route path="/dashboard" element={<UserDashboard />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
                <CompareDrawer />
              </div>
            </BrowserRouter>
          </CompareProvider>
        </WishlistProvider>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;
