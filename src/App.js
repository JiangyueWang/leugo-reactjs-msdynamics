//General imports
import './assets/App.css';
import { Routes, Route } from "react-router-dom";

//Import Pages
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <div>

      <Routes>
        <Route
          path="/"
          element={
            <HomePage />
          }
        />
      </Routes>

    </div>
  );
}

export default App;
