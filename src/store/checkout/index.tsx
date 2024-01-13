import { create } from 'zustand'

type ActionsProps = {
  setShippingMethod: (value: 'economy' | 'standard') => void;
  setCheckoutStep: (value: 'information' | 'shipping' | 'payment') => void;
  resetCheckout: () => void;
  setCheckoutInformations: (value: CheckoutInformationsProps) => void;
}

type CheckoutInformationsProps = {
  email?: string,
  country?: string,
  lastname?: string,
  address?: string,
  complement?: string,
  city?: string,
  state?: string,
  zipcode?: string
}

type StateProps = {
  shippingMethod: 'economy' | 'standard';
  checkoutStep: 'information' | 'shipping' | 'payment';
  checkoutInformations: CheckoutInformationsProps | null;
}

type StoreProps = {
  state: StateProps;
  actions: ActionsProps;
}

const DEFAULT_STATE: StateProps = {
  shippingMethod: 'economy',
  checkoutStep: 'information',
  checkoutInformations: null
}

export const useCheckoutStore = create<StoreProps>((set) => ({
  state: DEFAULT_STATE,
  actions: {
    setShippingMethod: (value) => {
      set((state) => ({
        state: {
          ...state.state,
          shippingMethod: value,
        }
      }))
    },
    setCheckoutStep: (value) => {
      set((state) => ({
        state: {
          ...state.state,
          checkoutStep: value,
        }
      }))
    },
    resetCheckout: () => {
      set(() => ({ state: DEFAULT_STATE }))
    },
    setCheckoutInformations: (value) => {
      set((state) => ({
        state: {
          ...state.state,
          checkoutInformations: value,
        }
      }))
    },
  },
}))