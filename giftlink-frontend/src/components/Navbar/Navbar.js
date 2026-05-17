import React from 'react';
// Import Link from react-router-dom to handle client-side navigation
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {/* Swapped to Link for smooth single-page application routing */}
            <Link className="navbar-brand" to="/">GiftLink</Link>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        {/* Keeps external/static HTML link if your lab architecture requires it */}
                        <a className="nav-link" href="/home.html">Home</a>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/app">Gifts</Link>
                    </li>
                    
                    {/* Task 2: Added Search link right after the Gifts item */}
                    <li className="nav-item">
                        <Link className="nav-link" to="/app/search">Search</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}