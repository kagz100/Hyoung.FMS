import React from "react";
import { Route, Routes } from "react-router-dom"; // Make sure to import Switch from "react-router-dom"
import { Layout } from "./components/Layout";
import AppRoutes from "./AppRoutes";

import "./custom.css";

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