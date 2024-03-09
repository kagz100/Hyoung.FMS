import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom"; // Make sure to import Switch from "react-router-dom"
import { Layout } from "./components/Layout";
import AppRoutes from "./AppRoutes";
import config  from 'devextreme/core/config';
import {licenseKey} from "./devextreme-license";

import "./assets/css/custom.css";


config({
    licenseKey
});


const App = () => {
    return (
        <Layout>
            <Routes>
                {AppRoutes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={route.element}
                        index={route.index}
                    />
                ))}
            </Routes>
        </Layout>
    );
};

export default App;
