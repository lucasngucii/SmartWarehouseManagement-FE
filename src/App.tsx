import React from 'react';
import './App.css';
import { Sidebar } from "./compoments/Sidebar/Sidebar";
import { Content } from './compoments/Content/Content';

function App() {
    return (
        <div className="App">
            <Sidebar />
            <Content />
        </div>
    );
}

export default App;
