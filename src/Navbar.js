import React from 'react'
import './styles/navbar.css';
function Navbar() {
  return (
    <div>
        <nav className="navbar">
            <div className="logo">
                <img src="/logo.png" alt="Logo" />
                {/* <h1>Excel-Mongo Uploader</h1> */}
                <h1>Datamorph</h1>
            </div>
            <ul className="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="#upload">Upload</a></li>
                <li><a href="#export">Export</a></li>
            </ul>
        </nav>

    </div>
  )
}

export default Navbar