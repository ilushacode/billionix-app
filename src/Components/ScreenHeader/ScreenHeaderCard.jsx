import { ProfileModal } from "../../Modals/ProfileModal";
import formatPrice from "../../Functions/formatPrice";
import { useModal } from "../../Providers/ModalProvider";
import { useStore } from "../../Hooks/useStore";

export const ScreenHeaderCard = ({}) => {
  const { openModal } = useModal();
  const { player } = useStore();

  const handleOpenProfileModal = () => {
    openModal(ProfileModal, { id: 1 });
  };

  return (
    <div className="screen_header__card" onClick={handleOpenProfileModal}>
      <img src="/assets/images/planet.png" alt="Background pattern" />
      <div className="screen_header__card__card__info">
        <div className="screen_header__card__card__info__left">
          <img src="/assets/images/pik-logo.png" alt="Pik logo" />
          <p>**** 1234</p>
        </div>
        <p className="screen_header__card__card__info__right">06/29</p>
      </div>
      <div className="screen_header__card__content">
        <p className="screen_header__card__content__balance">
          <span className="color_green">$</span> {formatPrice(player.balance)}
        </p>
        <p className="screen_header__card__content__arrow">
          <i className="fa-regular fa-chevron-right"></i>
        </p>
      </div>
    </div>
  );
};