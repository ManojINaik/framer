import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from '../components/layout/RootLayout';
import AdminLayout from '../components/layout/AdminLayout';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import ProtectedUserRoute from '../components/auth/ProtectedUserRoute';
import HomePage from '../pages/HomePage';
import ShopPage from '../pages/ShopPage';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import AccountPage from '../pages/AccountPage';
import ProfilePage from '../pages/ProfilePage';
import AuthPage from '../pages/AuthPage';
import BlogPage from '../pages/BlogPage';
import BlogPostPage from '../pages/BlogPostPage';
import CustomFramePage from '../pages/CustomFramePage';
import WishlistPage from '../pages/WishlistPage';
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminProducts from '../pages/admin/AdminProducts';
import AdminBlog from '../pages/admin/AdminBlog';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminSettings from '../pages/admin/AdminSettings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'shop', element: <ShopPage /> },
      { path: 'product/:id', element: <ProductPage /> },
      { 
        path: 'cart', 
        element: (
          <ProtectedUserRoute>
            <CartPage />
          </ProtectedUserRoute>
        ) 
      },
      { 
        path: 'checkout', 
        element: (
          <ProtectedUserRoute>
            <CheckoutPage />
          </ProtectedUserRoute>
        ) 
      },
      { 
        path: 'account', 
        element: (
          <ProtectedUserRoute>
            <AccountPage />
          </ProtectedUserRoute>
        ) 
      },
      { 
        path: 'profile', 
        element: (
          <ProtectedUserRoute>
            <ProfilePage />
          </ProtectedUserRoute>
        ) 
      },
      {
        path: 'wishlist',
        element: (
          <ProtectedUserRoute>
            <WishlistPage />
          </ProtectedUserRoute>
        )
      },
      { path: 'auth', element: <AuthPage /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'blog/:id', element: <BlogPostPage /> },
      { path: 'custom-frame', element: <CustomFramePage /> }
    ]
  },
  {
    path: '/admin/login',
    element: <AdminLoginPage />
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'products', element: <AdminProducts /> },
      { path: 'blog', element: <AdminBlog /> },
      { path: 'users', element: <AdminUsers /> },
      { path: 'settings', element: <AdminSettings /> }
    ]
  }
]);