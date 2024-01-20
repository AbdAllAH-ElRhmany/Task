
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import './css/App.css';

import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import UserPage from "./pages/UserPage/UserPage";
import HomePage from "./pages/Home/Home";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import SharedLayout from "./components/SharedLayout/SharedLayout";


const App: React.FC = () => {
    return (

                <div className="main_content">
                    <BrowserRouter >
                        <Routes>
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Registration />} />

                                <Route  path='/' element={<PrivateRoute Component={SharedLayout} />}  >
                                    <Route index  element={<HomePage />}  />
                                    <Route path={"/edit/:userId"} element={<PrivateRoute Component={UserPage} />} />
                                </Route>

                        </Routes>

                    </BrowserRouter>
                </div>
    );
};

export default App;