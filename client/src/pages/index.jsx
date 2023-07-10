import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './Home'
import Songs from "./Songs";
import MainLayout from "../layouts/MainLayout"

export const router = (
    <Routes>
        <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/songs" element={<Songs />} />
        </Route>
    </Routes>
);