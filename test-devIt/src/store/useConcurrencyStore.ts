import {create} from 'zustand';
import { API_URL } from '../types/types';

type ConcurrencyState = {
    loading: boolean;
    result: number[];
    errors: string[];
    sendConcurrency: (index: number) => Promise<void>;
    clearData: () => void;
};

export const useConcurrencyStore = create<ConcurrencyState>((set) => ({
    loading: false,
    result: [],
    errors: [],
    sendConcurrency: async (index: number) => {
        set(() => ({ loading: true }));
        try {
            const res = await fetch(`${API_URL}/api`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ index })
            });

            if (res.status === 429) {
                set((state) => ({
                    errors: [
                        ...state.errors,
                        `Error 429: Too much requests, index: ${index}`
                    ],
                    loading: false
                }));
                
                return;
            }

            const data = await res.json();
            console.log(data);
            set((state) => ({ result: [...state.result, data.index], loading: false }));
        } catch (err) {
            set((state) => ({
                errors: [
                    ...state.errors,
                    `An error occurred, index: ${index}, error: ${err}`
                ],
                loading: false
            }));
        }
    },
    clearData: () => set(() => ({ errors: [], result: [] })),
}));
