import formatPrice from "../Functions/formatPrice";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { useStore } from "../Hooks/useStore";
import useSocket from "../Hooks/useSocket";

const ANIMATION_DURATION = 1000; // ms

export const MainClickerComponent = () => {
  const [effects, setEffects] = useState([]);
  const { player } = useStore();
  const { socket } = useSocket();
  const navigate = useNavigate();

  const handleClick = useCallback(
    (e) => {
      const target = e.currentTarget;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const symbol = `$${formatPrice(player.sharesDividents)}`;
      const id = Date.now();

      // Добавляем эффект
      setEffects((prev) => [...prev, { id, x, y, symbol }]);

      // Отправляем событие на сервер
      socket.emit('balance:click');

      // Запускаем удаление после анимации
      const timeoutId = setTimeout(() => {
        setEffects((prev) => prev.filter((effect) => effect.id !== id));
      }, ANIMATION_DURATION);

      // Очистка при размонтировании
      return () => clearTimeout(timeoutId);
    },
    [player.sharesDividents, socket]
  );

  return (
    <div className="main__clicker" onClick={handleClick}>
      <img src="/assets/images/city.png" alt="City background" />
      <p className="main__clicker__icon">
        <i className="fa-regular fa-hand-back-point-up"></i>
      </p>
      <p className="main__clicker__title">Кликай тут</p>
      <p className="main__clicker__hint">Чтобы зарабатывать</p>

      {effects.map(({ id, x, y, symbol }) => (
        <span
          key={id}
          className="main__clicker__effect_symbol"
          style={{ left: `${x}px`, top: `${y}px` }}
        >
          {symbol}
        </span>
      ))}
    </div>
  );
};