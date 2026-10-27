import { describe, it, expect } from "vitest";
import { cartReducer, CartState } from "../src/context/cart-reducer";

describe("Cart Reducer", () => {
  const initialState: CartState = {
    items: [],
    isOpen: false,
  };

  const sampleItem = {
    productId: "p1",
    variantId: "v1",
    title: "Obsidian Milano Double-Breasted Blazer",
    size: "40R",
    color: "Obsidian Black",
    price: 495,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35",
    stock: 5,
  };

  it("adds an item to empty cart", () => {
    const state = cartReducer(initialState, {
      type: "ADD_ITEM",
      payload: sampleItem,
    });

    expect(state.items.length).toBe(1);
    expect(state.items[0].quantity).toBe(1);
    expect(state.isOpen).toBe(true); // Automatically opens drawer on add
  });

  it("increments quantity when same variant is added again", () => {
    const stateWithOne = cartReducer(initialState, {
      type: "ADD_ITEM",
      payload: sampleItem,
    });

    const stateWithTwo = cartReducer(stateWithOne, {
      type: "ADD_ITEM",
      payload: sampleItem,
    });

    expect(stateWithTwo.items.length).toBe(1);
    expect(stateWithTwo.items[0].quantity).toBe(2);
  });

  it("does not increment quantity beyond available stock", () => {
    const limitedStockItem = { ...sampleItem, stock: 2 };
    let state = cartReducer(initialState, {
      type: "ADD_ITEM",
      payload: limitedStockItem,
    });
    state = cartReducer(state, {
      type: "ADD_ITEM",
      payload: limitedStockItem,
    });
    state = cartReducer(state, {
      type: "ADD_ITEM",
      payload: limitedStockItem,
    });

    expect(state.items[0].quantity).toBe(2); // capped at stock = 2
  });

  it("updates item quantity directly", () => {
    const stateWithOne = cartReducer(initialState, {
      type: "ADD_ITEM",
      payload: sampleItem,
    });

    const updated = cartReducer(stateWithOne, {
      type: "UPDATE_QUANTITY",
      payload: { variantId: "v1", quantity: 4 },
    });

    expect(updated.items[0].quantity).toBe(4);
  });

  it("removes item when quantity is reduced to 0 or removed", () => {
    const stateWithOne = cartReducer(initialState, {
      type: "ADD_ITEM",
      payload: sampleItem,
    });

    const removed = cartReducer(stateWithOne, {
      type: "REMOVE_ITEM",
      payload: { variantId: "v1" },
    });

    expect(removed.items.length).toBe(0);
  });

  it("clears entire cart", () => {
    const stateWithOne = cartReducer(initialState, {
      type: "ADD_ITEM",
      payload: sampleItem,
    });

    const cleared = cartReducer(stateWithOne, { type: "CLEAR_CART" });
    expect(cleared.items.length).toBe(0);
  });
});
