import { CartItem } from "../types";

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { variantId: string } }
  | { type: "UPDATE_QUANTITY"; payload: { variantId: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "SET_CART_OPEN"; payload: boolean }
  | { type: "LOAD_CART"; payload: CartItem[] };

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        (i) => i.variantId === action.payload.variantId
      );

      if (existingIndex > -1) {
        const existing = state.items[existingIndex];
        const newQuantity = Math.min(
          existing.quantity + action.payload.quantity,
          action.payload.stock
        );

        const newItems = [...state.items];
        newItems[existingIndex] = {
          ...existing,
          quantity: newQuantity,
        };

        return {
          ...state,
          items: newItems,
          isOpen: true,
        };
      }

      const initialQty = Math.min(action.payload.quantity, action.payload.stock);
      if (initialQty <= 0) return state;

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: initialQty }],
        isOpen: true,
      };
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        items: state.items.filter((i) => i.variantId !== action.payload.variantId),
      };
    }

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.variantId !== action.payload.variantId),
        };
      }

      return {
        ...state,
        items: state.items.map((item) => {
          if (item.variantId === action.payload.variantId) {
            const cappedQty = Math.min(action.payload.quantity, item.stock);
            return { ...item, quantity: cappedQty };
          }
          return item;
        }),
      };
    }

    case "CLEAR_CART": {
      return {
        ...state,
        items: [],
      };
    }

    case "TOGGLE_CART": {
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    }

    case "SET_CART_OPEN": {
      return {
        ...state,
        isOpen: action.payload,
      };
    }

    case "LOAD_CART": {
      return {
        ...state,
        items: action.payload,
      };
    }

    default:
      return state;
  }
}
