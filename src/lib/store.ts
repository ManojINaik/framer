import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// User types and store
interface User {
  id: string;
  email: string;
  name: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null })
    }),
    {
      name: 'user-storage'
    }
  )
);

// Cart types and store
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customizations?: {
    size?: string;
    color?: string;
    material?: string;
    matting?: string;
  };
}

interface CartStore {
  items: CartItem[];
  total: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      total: 0,
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
              total: state.total + item.price
            };
          }
          return {
            items: [...state.items, { ...item, quantity: 1 }],
            total: state.total + item.price
          };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
          total: state.total - (state.items.find((i) => i.id === id)?.price || 0)
        })),
      updateQuantity: (id, quantity) =>
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (!item) return state;
          const quantityDiff = quantity - item.quantity;
          return {
            items: state.items.map((i) =>
              i.id === id ? { ...i, quantity } : i
            ),
            total: state.total + item.price * quantityDiff
          };
        }),
      clearCart: () => set({ items: [], total: 0 })
    }),
    {
      name: 'cart-storage'
    }
  )
);

// Admin store
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

// Blog types and store
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
}

interface BlogStore {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id'>) => void;
  updatePost: (id: number, updates: Partial<BlogPost>) => void;
  deletePost: (id: number) => void;
}

export const useBlogStore = create<BlogStore>()(
  persist(
    (set) => ({
      posts: [],
      addPost: (post) =>
        set((state) => ({
          posts: [
            ...state.posts,
            { ...post, id: Date.now() }
          ]
        })),
      updatePost: (id, updates) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id ? { ...post, ...updates } : post
          )
        })),
      deletePost: (id) =>
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id)
        }))
    }),
    {
      name: 'blog-storage'
    }
  )
);