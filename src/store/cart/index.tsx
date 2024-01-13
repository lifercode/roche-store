import { create } from 'zustand'

type ProductProps = {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  qty: number;
}

type OptionalProductProps = {
  title?: string;
  price?: number;
  image?: string;
  description?: string;
  qty?: number;
}

type ActionsProps = {
  addProduct: (product: ProductProps) => void;
  updateProduct: (id: string, product: OptionalProductProps) => void;
  removeProduct: (productId: string) => void;
  removeAllProducts: () => void;
}

type StoreProps = {
  state: {
    products: ProductProps[];
  };
  actions: ActionsProps;
}

export const useCartStore = create<StoreProps>((set) => ({
  state: {
    products: []
  },
  actions: {
    updateProduct: (productId, props) => {
      set((state) => {
        return {
          state: {
            products: [
              ...state.state.products.map((sub) => sub.id === productId ? {...sub, ...props} : sub)
            ]
          }
        }
      })
    },
    addProduct: (product) => {
      set((state) => {
        if(state.state.products.find(({ id }) => id === product.id)) {
          return {
            state: {
              products: [
                ...state.state.products.map(
                  (sub) => sub.id === product.id ? {...sub, qty: sub?.qty+product?.qty} : sub
                ),
              ]
            }
          }
        } else {
          return {
            state: {
              products: [
                ...state.state.products,
                product
              ]
            }
          }
        }
      })
    },
    removeProduct: (productId) => {
      set((state) => ({
        state: {
          products: state.state.products.filter(
            (product) => product.id !== productId
          )
        }
      }))
    },
    removeAllProducts: () => {
      set(() => ({
        state: {
          products: []
        }
      }))
    }
  },
}))