import { useStore } from "./Hooks/useStore";

/**
 * Подписываемся на сокет-события и обновляем Zustand-хранилище
 */
export const setupSocketListeners = (socket) => {
  if (!socket) return;

  // socket.on("playerUpdate", (data) => {
  //   useStore.getState().setPlayer(data);
  // });

  // Обновление полей пользователя
  socket.on("player:update", data => {
    // console.log(data)
    useStore.getState().updatePlayer(data)
  });

  socket.on("shares_market:update", (data) => {
    // console.log(data)
    useStore.getState().setSharesMarket(data);
  });

  // ОБНОВЛЕНИЕ БАЛАНСОВ
  socket.on('balanceUpdate', data => {
    useStore.getState().setBalance(data.amount);
  })
  socket.on("incomePerHourUpdate", (data) => {
    useStore.getState().setIncomePerHour(data.amount);
  });
  socket.on("consumptionPerHourUpdate", (data) => {
    useStore.getState().setConsumptionPerHour(data.amount);
  });
  socket.on("pricePerClickUpdate", (data) => {
    useStore.getState().setPricePerClick(data.amount);
  });


  // ОБНОВЛЕНИЕ СТОИМОСТИ ОБЪЕКТОВ ПОЛЬЗОВАТЕЛЯ
  socket.on("sharesSumUpdate", (data) => {
    useStore.getState().setSharesSum(data.amount);
  });


  // ОБНОВЛЕНИЕ ОБЪЕКТОВ ПОЛЬЗОВАТЕЛЯ
  socket.on("sharesUpdate", (data) => {
    useStore.getState().setShares(data);
  });
  socket.on("businessesUpdate", (data) => {
    useStore.getState().setBusinesses(data);
  });


  // ОБНОВЛЕНИЕ МАГАЗИНА АКЦИЙ
  socket.on("marketSharesUpdate", (data) => {
    useStore.getState().setMarketShares(data);
  });


  // ОБРАБОТКА ОШИБОК
  socket.on("error", (data) => {
    console.error("Серверная ошибка:", data.message);
  });

  // Можно добавить больше событий по аналогии
};

/**
 * Отписываемся от событий при отключении/переподключении
 */
export const teardownSocketListeners = (socket) => {
  if (!socket) return;

  socket.off("playerUpdate");

  socket.off("balanceUpdate");
  socket.off("incomePerHourUpdate");
  socket.off("consumptionPerHourUpdate");
  socket.off("pricePerClickUpdate");

  socket.off("businessesUpdate");

  socket.off("marketSharesUpdate");

  socket.off("error");
};
