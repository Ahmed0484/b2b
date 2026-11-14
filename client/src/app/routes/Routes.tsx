import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import NotFound from "../errors/NotFound";
import ServerError from "../errors/ServerError";
import BasketPage from "../../features/basket/BasketPage";
import LoginForm from "../../features/account/LoginForm";
import RegisterForm from "../../features/account/RegisterForm";
import RequireAuth from "./RequireAuth";
import SummaryPage from "../../features/summary/SummaryPage";
import InventoryPage from "../../features/admin/InventoryPage";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
             {
                element: <RequireAuth />, children: [
                    { path: 'summary', element: <SummaryPage /> },
                    { path: 'inventory', element: <InventoryPage /> },
                ]
            },
            { path: '', element: <HomePage /> },
            { path: 'catalog', element: <Catalog /> },
            { path: 'catalog/:id', element: <ProductDetails /> },
            { path: 'about', element: <AboutPage /> },
            { path: 'contact', element: <ContactPage /> },
            { path: 'basket', element: <BasketPage /> },
            { path: 'server-error', element: <ServerError /> },
            { path: 'login', element: <LoginForm /> },
            { path: 'register', element: <RegisterForm /> },
            { path: 'not-found', element: <NotFound /> },
        ]
    }
])