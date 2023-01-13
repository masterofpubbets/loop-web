import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/App/App';
import Layout from './Components/Layout/Layout';
import { PreThemeProvider } from './Context/ThemeContext';
import { UserProvider } from './Context/UserContext';
import { NotificationsProvider } from './Context/NotificationsContext';
import { WsProvider } from './Context/WSContext';
import { ProductProvider } from './Context/ProductsContext';
import { PBIProvider } from './Context/Products/PBIsContext';
import { ProjectsProvider } from './Context/Projects/ProjectsContext';
import { OtherUsersProvider } from './Context/OtherUsersContext';
import { LoopFolderProvider } from './Context/Projects/LoopFolderContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode >
    <UserProvider>
      <WsProvider>
        <OtherUsersProvider>
          <ProductProvider>
            <ProjectsProvider>
              <LoopFolderProvider>
                <PBIProvider>
                  <PreThemeProvider>
                    <NotificationsProvider>


                      <BrowserRouter>
                        <Layout>
                          <App />
                        </Layout>
                      </BrowserRouter>


                    </NotificationsProvider>
                  </PreThemeProvider>
                </PBIProvider>
              </LoopFolderProvider>
            </ProjectsProvider>
          </ProductProvider>
        </OtherUsersProvider>
      </WsProvider>
    </UserProvider>
  </React.StrictMode >
);