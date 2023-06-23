import logo from '../logo.svg';
import '../App.css';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="App">
            <header className="App-header">
                <h2> PAGE 404</h2>
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                   Nothing crazy here
                </p>
                <Link to="/">Home</Link>
                <Link to="/map">Map</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </header>
        </div>
    );
}

export default Home;
