// import './home.css'
// import React, { useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useState , useEffect } from 'react';
// import { Link } from "react-router-dom";
// import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill";

// import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './navbar.css'

const Custom_navbar = (type:number = 0 , variable:string = "") => {
    
    if (type === 0 ) {
        return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="">LinkedinApplicationRecap</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Langue
                </a>
                <ul className="dropdown-menu">
                    <li><a className="flag_button dropdown-item" href="#">🇬🇧</a></li>
                    <li><a className="flag_button dropdown-item" href="#">🇫🇷</a></li>
                </ul>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    ) 
    } else {
        return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossOrigin="anonymous"></link>
        <div className="container-fluid">
            <a className="navbar-brand" href="#">LinkedinApplicationRecap</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">🏠 Home</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Features</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Pricing</a>
                </li>
                <li className="nav-item">
                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    ) 
    }   
}

export default Custom_navbar;
