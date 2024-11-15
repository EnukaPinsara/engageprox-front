import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCounterStore = create(
  persist(
    set => ({
      count: 0,
      increaseCount: () => set(state => ({ count: state.count + 1 })),
      decreaseCount: () => set(state => ({ count: state.count - 1 })),
      resetCount: () => set({ count: 0 })
    }),
    {
      name: 'counter-storage'
    }
  )
);

export default useCounterStore;
