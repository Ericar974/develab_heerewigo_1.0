import './App.css';
import {Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Map from './components/Map';
import NotFound from './components/NotFound';
import LoginButton from './components/LoginButton';
import CallBack from './components/CallbackPage';
import { useAuth0 } from '@auth0/auth0-react';

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
    const { isAuthenticated, logout } = useAuth0();

    const handleLogout = () => {
        logout({ returnTo: window.location.origin });
    };

    return (
        <div>
            {isAuthenticated ? <LoginButton/>: <button onClick={handleLogout}>Logout</button>}
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/callback" element={<CallBack />}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/map" element={<Map/>}/>
                <Route path="/*" element={<NotFound/>}/>
            </Routes>
        </div>
    );
}

export default App;
