import { ToastContainer } from 'react-toastify';
import './App.css';
import Header from './components/Header/Header';
import AllRouter from './router/AllRoutes';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <div className="App">
        <ToastContainer position="top-right" autoClose={2000} />
        <Header />
        <AllRouter />
      </div>

    </>
  );
}

export default App;
