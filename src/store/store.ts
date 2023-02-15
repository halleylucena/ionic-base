import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

const initialState = {
    typesFiltered: ["DC", "EC", "FT", "PF", "FR", "FS", "GA", "GD", "NC", "OT", "GT", "GR", "RG"],
    apiKey: null,
}

// define the store
const useStore = create(
    persist(
        (set) => ({
            typesFiltered: ["DC", "EC", "FT", "PF", "FR", "FS", "GA", "GD", "NC", "OT", "GT", "GR", "RG"],
            setTypesFiltered: (newTypesFiltered: string[]) => {
                set(() => ({
                    typesFiltered: [...newTypesFiltered],
                }))
            },
            apiKey: null,
            setApiKey: (newApiKey: string) => {
                set(() => ({
                    apiKey: newApiKey,
                }))
            },
            deleteApiKey: () => {
                set(() => ({
                    apiKey: null,
                }))
            },
            reset: () => {
                set(initialState)
            },
            // Other items in store...
        }),
        {
            name: "pos-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state: any) => ({ apiKey: state.apiKey }),
        }
    )
)

export default useStore
