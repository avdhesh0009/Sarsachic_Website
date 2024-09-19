import { Routes, BrowserRouter, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Header from "./components/Header/Header.jsx";
import Hero from "./pages/Hero/Hero.jsx";
import Login from "./pages/Login/Login.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import ProductPage from "./pages/ProductPage/ProductPage.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ForgetPass from "./pages/ForgetPassword/ForgetPass.jsx";
import NewPassword from "./pages/ForgetPassword/NewPassword.jsx";
import Home from "./pages/Home/Home.jsx";
import MensSection from "./pages/MensSection/MensSection.jsx";
import WomensSection from "./pages/WomensSection/WomensSection.jsx";
import ProductDetails from "./pages/Products/ProductDetails.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Payment from "./pages/Cart/Payment.jsx";
import Shipping from "./pages/Cart/Shipping.jsx";
import Summary from "./pages/Cart/Summary.jsx";
import VerifyUser from "./pages/VerifyUser.jsx";
import MembershipBenefits from './components/Membership/MembershipBenefits.jsx'
import Profile from "./pages/UserDashboard/Profile.jsx";
import Delivery from "./pages/UserDashboard/Delivery.jsx";
import MyOrders from "./pages/UserDashboard/MyOrders.jsx";
import MyWishlist from "./pages/UserDashboard/MyWishlist.jsx";
import UpdatePassword from "./pages/UserDashboard/UpdatePassword.jsx";

import Wishlist from "./pages/Products/Wishlist.jsx";
import SearchResults from './components/Header/SearchResults';
import VerifyForgotPasswordLink from "./pages/VerifyForgotPasswordLink.jsx";
import CartNew from "./pages/Cart/CartNew.jsx";

export default function App() {
  return (
   
    <BrowserRouter>
    
      <Header />
      <Routes>
        <Route element={<Home />} index />
        <Route path="/search" element={<SearchResults />} /> {/* For search results */}
        <Route path="/user/verify/:userId/:uniqueString" element={<VerifyUser/>} />
        <Route path="/user/reset-password/:userId/:token" element={<VerifyForgotPasswordLink/>}/>
        <Route element={<Login />} path="/login" />
        <Route element={<SignUp />} path="/signup" />
        <Route element={<ProductPage />} path="/products" />
        <Route element={<ForgetPass />} path="/forget-password" />
        <Route element={<NewPassword />} path="/forget-password/new-password/:userId/:token" />
        <Route element={<MensSection />} path="/mens-section" />
        <Route element={<WomensSection />} path="/womens-section" />
        <Route element={<ProductDetails />} path="/product-section/:productId" />
        <Route element={<CartNew />} path="/cart" />
        {/* <Route element={<CartNew />} path="/cart1" /> */}
        <Route element={<Payment />} path="/payment" />
        <Route element={<Shipping />} path="/shipping" />
        <Route element={<Summary />} path="/summary" />
        <Route element={<Wishlist />} path="/wishlist" />

        <Route element={<Profile />} path="/userProfile" />
        <Route element={<Delivery />} path="/adddeliveryaddress" />
        <Route element={<MyOrders />} path="/myOrders" />
        <Route element={<Wishlist />} path="/mywishlist" />
        <Route element={<MembershipBenefits />} path="/membership" />
        <Route element={<UpdatePassword />} path="/updatepassword" />
      </Routes>
      <Footer />
      <Toaster/>
    </BrowserRouter>
  );
}
