import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Existing interfaces and stores...
// Add new admin store

interface Admin {
  username: string;
  isAuthenticated: boolean;
}

interface AdminStore {
  admin: Admin | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123' // In production, this should be properly hashed and stored securely
};

export const useAdminStore = create<AdminStore>((set) => ({
  admin: null,
  login: (username: string, password: string) => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      set({ admin: { username, isAuthenticated: true } });
      return true;
    }
    return false;
  },
  logout: () => set({ admin: null })
}));

// Product management store
export interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  material: string;
  color: string;
  description?: string;
  stock?: number;
}

interface ProductStore {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, updates: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: [],
      addProduct: (product) =>
        set((state) => ({
          products: [
            ...state.products,
            { ...product, id: Date.now() }
          ]
        })),
      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((product) =>
            product.id === id ? { ...product, ...updates } : product
          )
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((product) => product.id !== id)
        }))
    }),
    {
      name: 'product-storage'
    }
  )
);