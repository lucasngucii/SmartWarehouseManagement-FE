import './App.css';
import { Sidebar } from "./compoments/Sidebar/Sidebar";
import { Content } from './compoments/Content/Content';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContextMessage from "./Context/ContextMessage";

function App() {
    return (
        <ContextMessage>
            <div className="App">
                <Sidebar/>
                <Content/>
            </div>
        </ContextMessage>
    );
}

export default App;
