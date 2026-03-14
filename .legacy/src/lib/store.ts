import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
    id: string
    name: string
    price: number
    image: string
    quantity: number
    size?: string
    color?: string
}

interface CartStore {
    items: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    getUniqueItemCount: () => number
    getSubtotal: () => number
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (newItem) => {
                set((state) => {
                    const existingItemIndex = state.items.findIndex(
                        (item) => item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
                    )

                    if (existingItemIndex > -1) {
                        // Item exists with same options, just increase quantity
                        const newItems = [...state.items]
                        newItems[existingItemIndex].quantity += newItem.quantity
                        return { items: newItems }
                    }

                    return { items: [...state.items, newItem] }
                })
            },

            removeItem: (id) => {
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id)
                }))
            },

            updateQuantity: (id, quantity) => {
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
                    )
                }))
            },

            clearCart: () => set({ items: [] }),

            getUniqueItemCount: () => {
                return get().items.length
            },

            getSubtotal: () => {
                return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
            }
        }),
        {
            name: 'tsgabrielle-cart-storage-v2', // unique name for localStorage
        }
    )
)
