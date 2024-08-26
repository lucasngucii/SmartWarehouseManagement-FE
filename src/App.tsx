import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
        <div className={"sidebar"}>
            <div className="sidebar-logo">
                <img src="../public/logo512.png" alt="Logo"/>
                <h1>My Website</h1>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    <li><a href="#dashboard">Dashboard</a></li>
                    <li><a href="#inventory">Inventory</a></li>
                    <li><a href="#orders">Orders</a></li>
                    <li><a href="#settings">Settings</a></li>
                </ul>
            </nav>
        </div>
        <div className={"container"}>

        </div>
    </div>
  );
}

export default App;
