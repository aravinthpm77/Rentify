
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import AllRoutes from './routes.jsx';
import Navbar from './components/navbar/navbar.jsx';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App font-[hind] ">
      <BrowserRouter>
        <Navbar/>
        <AllRoutes/>
          
      </BrowserRouter>
      <ToastContainer theme='light'/>
    </div>
  );
}

export default App;
