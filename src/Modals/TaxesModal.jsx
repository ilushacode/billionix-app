import PriceChartComponent from "../Components/PriceChartComponent";
import formatDate from "../Functions/formatDate";
import formatPrice from "../Functions/formatPrice";
import useSocket from "../Hooks/useSocket";
import { useEffect } from "react";
import { useNotification } from "../Providers/NotificationProvider";
import { Modal } from "../Components/Modal";
import { useStore } from "../Hooks/useStore";

export const TaxesModal = ({ taxes, onClose }) => {
  const { socket } = useSocket();
  const { addNotification } = useNotification();
  const { player, updatePlayer } = useStore();

  // Проверяем наличие налогов
  useEffect(() => {
    if (!player.taxes || player.taxes.length === 0) {
      onClose();
      addNotification("error", "Налогов пока нет");
    }
  }, [player, onClose, addNotification]);

  // Подписываемся на события оплаты налогов
  useEffect(() => {
    if (!socket) return;

    socket.emit("taxes:update");

    const handleTaxPayment = (data) => {
      if (data.ok) {
        addNotification("success", "Налоги успешно оплачены");
        updatePlayer((prev) => ({ ...prev, taxes: [] })); // Обновляем состояние игрока
        onClose(); // Теперь можно закрыть
      }
    };

    socket.on("taxes:pay", handleTaxPayment);

    return () => {
      socket.off("taxes:pay", handleTaxPayment);
    };
  }, [socket, addNotification, onClose, updatePlayer]);

  // Обработчик нажатия на кнопку "Оплатить"
  const handlePayTaxes = () => {
    if (!socket) return;

    socket.emit("taxes:pay", { taxesSum: taxes?.sum });
  };

  return (
    <Modal title={"Налоговая квитанция"} onClose={onClose}>
      {/* Информация о налоге */}
      <div className="shares_market_item__info__item">
        <p className="shares_market_item__info__item__title">Дата</p>
        <p className="shares_market_item__info__item__value">{formatDate(taxes?.datetime)}</p>
      </div>

      <div className="shares_market_item__info__item">
        <p className="shares_market_item__info__item__title">Сумма</p>
        <p className="shares_market_item__info__item__value">
          <span className="color_red">$</span> {formatPrice(taxes?.sum)}
        </p>
      </div>

      <p className="shares_market_item__bottom_text">
        * Оплатите задолженность, чтобы продолжить получать доход с бизнесов.
      </p>

      {/* Кнопка оплаты */}
      <div className="shares_market_item__buttons">
        <div
          className="shares_market_item__buttons__item shares_market_item__buttons__item__red"
          onClick={handlePayTaxes}
        >
          <p className="shares_market_item__buttons__item__text">Оплатить</p>
        </div>
      </div>
    </Modal>
  );
};