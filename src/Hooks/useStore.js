import { create } from "zustand";

export const useStore = create((set) => ({
  player: {
    userId: 0,
    username: "",
    balance: 0,
    shares: [],
    sharesSum: 0,
    sharesDividents: 0,
    businesses: [],
    taxes: {}
  },

  sharesMarket: [],

  balance: 0,
  incomePerHour: 0,
  consumptionPerHour: 0,
  pricePerClick: 0,

  sharesSum: 0,

  shares: [],
  businesses: [],

  marketShares: [],

  updatePlayer: (updates) =>
    set((state) => ({
      player: {
        ...state.player,
        ...updates,
      },
    })),

  setPlayer: (player) => set(() => ({ player })),

  setSharesMarket: (sharesMarket) => set(() => ({ sharesMarket })),

  // БАЛАНСЫ
  setBalance: (balance) => set(() => ({ balance })),
  setIncomePerHour: (incomePerHour) => set(() => ({ incomePerHour })),
  setConsumptionPerHour: (consumptionPerHour) =>
    set(() => ({ consumptionPerHour })),
  setPricePerClick: (pricePerClick) => set(() => ({ pricePerClick })),

  // СТОИМОСТИ ОБЪЕКТОВ ПОЛЬЗОВАТЕЛЯ
  setSharesSum: (sharesSum) => set(() => ({ sharesSum })),

  // ОБЪЕКТЫ ПОЛЬЗОВАТЕЛЯ
  setShares: (shares) => set(() => ({ shares })),
  setBusinesses: (businesses) => set(() => ({ businesses })),

  // МАГАЗИН АКЦИЙ
  setMarketShares: (marketShares) => set(() => ({ marketShares })),

  // addMessage: (message) =>
  //   set((state) => ({ messages: [...state.messages, message] })),

  // setUsersOnline: (count) => set(() => ({ usersOnline: count })),
}));
