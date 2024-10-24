import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../components/layout/RootLayout';
import HomePage from '../pages/HomePage';
import ShopPage from '../pages/ShopPage';
import CustomFramePage from '../pages/CustomFramePage';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import AccountPage from '../pages/AccountPage';
import AuthPage from '../pages/AuthPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'shop', element: <ShopPage /> },
      { path: 'custom-frame', element: <CustomFramePage /> },
      { path: 'product/:id', element: <ProductPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'account', element: <AccountPage /> },
      { path: 'auth', element: <AuthPage /> },
    ],
  },
]);