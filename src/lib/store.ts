import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image: string;
  material?: string;
  color?: string;
  rating?: number;
  stock?: number;
}

export interface CartItem extends Product {
  quantity: number;
  customizations?: {
    size?: string;
    color?: string;
    material?: string;
    matting?: string;
  };
}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  photoURL?: string;
}

// User Store
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

// Cart Store
interface CartStore {
  items: CartItem[];
  addItem: (item: Product | CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const items = get().items;
        const existingItem = items.find((i) => i.id === item.id);

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({
            items: [...items, { ...item, quantity: 1 }],
          });
        }
      },
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ items: [] }),
      get total() {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

// Product Store
interface ProductStore {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: [
        {
          id: 1,
          name: 'Classic Wood Frame',
          price: 79.99,
          description: 'Elegant wooden frame perfect for any decor',
          image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80',
          material: 'Wood',
          color: 'Brown',
          rating: 4.8,
          stock: 15
        },
        {
          id: 2,
          name: 'Modern Metal Frame',
          price: 89.99,
          description: 'Sleek metal frame with contemporary design',
          image: 'https://images.unsplash.com/photo-1582053433976-25c00369fc93?auto=format&fit=crop&q=80',
          material: 'Metal',
          color: 'Silver',
          rating: 4.6,
          stock: 10
        },
        {
          id: 3,
          name: 'Minimalist White Frame',
          price: 69.99,
          description: 'Clean and simple white frame',
          image: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?auto=format&fit=crop&q=80',
          material: 'Wood',
          color: 'White',
          rating: 4.7,
          stock: 20
        }
      ],
      addProduct: (product) =>
        set((state) => ({
          products: [
            ...state.products,
            { ...product, id: Date.now() }
          ],
        })),
      updateProduct: (id, product) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...product } : p
          ),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
    }),
    {
      name: 'product-storage',
    }
  )
);

// Blog Store
interface BlogStore {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id'>) => void;
  updatePost: (id: number, post: Partial<BlogPost>) => void;
  deletePost: (id: number) => void;
}

export const useBlogStore = create<BlogStore>()(
  persist(
    (set) => ({
      posts: [
        {
          id: 1,
          title: 'How to Choose the Perfect Frame',
          content: '<p>Choosing the right frame can make all the difference in how your artwork or photos are displayed...</p>',
          excerpt: 'Learn the art of selecting the perfect frame for your artwork',
          author: 'Sarah Johnson',
          date: '2024-02-20',
          image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80'
        }
      ],
      addPost: (post) =>
        set((state) => ({
          posts: [
            ...state.posts,
            { ...post, id: Date.now() }
          ],
        })),
      updatePost: (id, post) =>
        set((state) => ({
          posts: state.posts.map((p) =>
            p.id === id ? { ...p, ...post } : p
          ),
        })),
      deletePost: (id) =>
        set((state) => ({
          posts: state.posts.filter((p) => p.id !== id),
        })),
    }),
    {
      name: 'blog-storage',
    }
  )
);

// Admin Store
interface Admin {
  isAuthenticated: boolean;
  username: string;
}

interface AdminStore {
  admin: Admin | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      admin: null,
      login: (username, password) => {
        // In a real app, this would validate against a backend
        if (username === 'admin' && password === 'admin') {
          set({ admin: { isAuthenticated: true, username } });
          return true;
        }
        return false;
      },
      logout: () => set({ admin: null }),
    }),
    {
      name: 'admin-storage',
    }
  )
);