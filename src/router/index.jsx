import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
}from "react-router-dom";
import { List, Product} from "../pages";
import App from"../App.jsx"
// import { Header } from "../components";
// import { Sidebar } from "../components";
import React from 'react'

const Index = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<App/>}>
            <Route index element={<List/>}/>
            <Route path="/product" element={<Product/>} />
            </Route>
        )
    )
    return <RouterProvider router={router}/>
}

export default Index
