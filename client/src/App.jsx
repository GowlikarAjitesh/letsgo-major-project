import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from '../src/pages/Home';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import Profile from '../src/pages/Profile';
import ForgotPassword from '../src/pages/ForgotPassword';
import ResetPassword from '../src/pages/ResetPassword';
import PrivateRoute from './components/PrivateRoute';
import { HotelsList, MapView, RestaurantsList, AttractionsList, SearchResult, Ai } from "./pages";
import { PlaceDetails } from "./pages/templates";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/register'|| location.pathname === '/forgot-password';

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/map' element={<MapView/>}/>
        <Route path='/restaurants' element={<RestaurantsList/>}/>
        <Route path='/hotels' element={<HotelsList/>}/>
        <Route path='/attractions' element={<AttractionsList/>}/>
        <Route path='/:type/:id' element={<PlaceDetails/>}/>
        <Route path='/search' element={<SearchResult/>}/>
        <Route path='/ai' element={<Ai/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/reset-password/:id/:token' element={<ResetPassword/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
