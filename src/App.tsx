import './App.css';
import { Sidebar } from "./compoments/Sidebar/Sidebar";
import { Content } from './compoments/Content/Content';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div className="App">
            <Sidebar />
            <Content />
        </div>
    );
}

export default App;
