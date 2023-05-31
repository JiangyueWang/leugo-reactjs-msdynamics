//General imports
import './assets/App.css';
//Import components from msal-react package
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
//Import Pages
import HomePage from './pages/HomePage/HomePage';
import UnauthenticatedHomePage from './pages/HomePage/UnauthenticatedHomePage';

function App() {
  return (
    <div>
        <AuthenticatedTemplate>
          <HomePage />
          
        </AuthenticatedTemplate>

        <UnauthenticatedTemplate>
          <UnauthenticatedHomePage />
        </UnauthenticatedTemplate>


    </div>
  );
}

export default App;
