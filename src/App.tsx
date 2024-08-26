import React from 'react';
import './App.css';

function App() {

    const logo = "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?t=st=1724652251~exp=1724655851~hmac=a86da59ac44d8b5ebf63177e7812cc21246c8654ed84d84b302bdc2e61603db3&w=826"

  return (
    <div className="App">
        <div className={"sidebar"}>
            <div className="sidebar-logo">
                <img src={logo} alt="Logo"/>
                <h1>My Website</h1>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    <li>
                        <a href="#dashboard">
                            <i className="fas fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#inventory">
                            <i className="fas fa-warehouse"></i>
                            <span>Inventory</span>
                        </a>
                    </li>
                    <li>
                        <a href="#orders">
                            <i className="fas fa-shopping-cart"></i>
                            <span>Orders</span>
                        </a>
                    </li>
                    <li>
                        <a href="#settings">
                            <i className="fas fa-cog"></i>
                            <span>Settings</span>
                        </a>
                    </li>
                </ul>
            </nav>

            <div className="sidebar-user">
                <img src={logo} alt="User Avatar"/>
                <div className="user-info">
                    <p>John Doe</p>
                    <a href="#logout">Logout</a>
                </div>
            </div>
        </div>
        <div className={"container"}>

        </div>
    </div>
  );
}

export default App;
