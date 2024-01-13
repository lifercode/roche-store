import { create } from 'zustand'
import { products } from '@/config/mock';

type ProductProps = {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
}

type ActionsProps = {
  addProduct: (product: ProductProps) => void;
}

type StoreProps = {
  state: {
    products: ProductProps[];
  };
  actions: ActionsProps;
}

export const useShopStore = create<StoreProps>((set) => ({
  state: {
    products: products
  },
  actions: {
    addProduct: (product) => {
      set((state) => ({
        state: {
          ...state.state,
          products: [
            product,
            ...state.state.products,
          ]
        }
      }))
    },
  },
}))