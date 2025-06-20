import { useEffect, useState } from "react";
import useSocket from "../Hooks/useSocket";
import { useStore } from "../Hooks/useStore";
import { useNotification } from "../Providers/NotificationProvider";
import { Modal } from "../Components/Modal";
import { Button } from "../Components/Forms/Button";
import formatPrice from "../Functions/formatPrice";

export const CreateBusinessModal = ({ onClose }) => {
  const { socket } = useSocket();
  const { player } = useStore();
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { addNotification } = useNotification();

  const COST_TO_CREATE = 1000;

  // Обработка события создания бизнеса
  useEffect(() => {
    if (!socket) return;

    const handleBusinessCreated = () => {
      setIsLoading(false);
      addNotification("success", "Бизнес успешно создан");
      onClose();
    };

    socket.on("business:create", handleBusinessCreated);

    return () => {
      socket.off("business:create", handleBusinessCreated);
    };
  }, [socket, setIsLoading, onClose, addNotification]);

  const handleCreateBusiness = () => {
    if (!socket || isLoading) return;

    if (text.length < 3) {
      addNotification("error", "Название должно быть не менее 3 символов");
      return;
    }

    if (player.balance < COST_TO_CREATE) {
      addNotification("error", "Недостаточно средств");
      return;
    }

    setIsLoading(true);
    socket.emit("business:create", { title: text });
  };

  return (
    <Modal title={"Создание бизнеса"} onClose={onClose}>
      <div className="form_input__container create_business_modal__input">
        <p className="form_input__icon">
          <i className="fa-regular fa-quote-right"></i>
        </p>
        <input
          className="form_input__input"
          type="text"
          placeholder="Введите название"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <Button
        text={
          <span>
            <span className="color_green">$</span> {formatPrice(COST_TO_CREATE)}
          </span>
        }
        callback={handleCreateBusiness}
        className={["button__dark", "create_business_modal__button"]}
        isLoading={isLoading}
        disabled={isLoading}
      />
    </Modal>
  );
};