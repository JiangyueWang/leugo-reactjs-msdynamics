//General imports
import { Routes, Route } from "react-router-dom";
import './assets/App.css';
//Import components from msal-react package
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
//Import Pages
import HomePage from './pages/HomePage/HomePage';
import CollectionPage from './pages/CollectionPage/CollectionPage'
import UnauthenticatedHomePage from './pages/HomePage/UnauthenticatedHomePage';
import SiteHeader from './pages/SiteHeader/SiteHeader';
import SearchResultPage from './pages/SearchResultsPage/SearchResultPage';
function App() {

  return (
    <div>
      <SiteHeader />
        <Routes>
            <Route path="/home" element={
                                  <AuthenticatedTemplate >
                                    <HomePage />
                                  </AuthenticatedTemplate>
              }/>
            <Route path=":name/collection" element={
                                            <AuthenticatedTemplate >
                                              <CollectionPage />
                                            </AuthenticatedTemplate>} />
            <Route path="/search" element={
                                          <UnauthenticatedTemplate>
                                            <SearchResultPage />
                                          </UnauthenticatedTemplate> } />
            <Route path="/" element=
            {<UnauthenticatedTemplate>
              <UnauthenticatedHomePage />
            </UnauthenticatedTemplate>} />
        </Routes>
    </div>
  );
}

export default App;