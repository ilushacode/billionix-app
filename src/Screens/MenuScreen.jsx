

import { LayoutComponent } from "../Components/LayoutComponent"
import {ScreenHeader} from "../Components/ScreenHeader/ScreenHeader";
import {ScreenHeaderTitle} from "../Components/ScreenHeader/ScreenHeaderTitle";
import {useModal} from "../Providers/ModalProvider";
import {PlayersTopModal} from "../Modals/PlayersTopModal";


export const MenuScreen = () => {

  const { openModal } = useModal();

  return (
    <LayoutComponent>
      <div className="menu">
        <ScreenHeader>
          <ScreenHeaderTitle title="Меню" />
        </ScreenHeader>

        <div className="menu__grid">
          <div className="menu__grid__item">
            <p className="menu__grid__item__icon"><i className="fa-solid fa-id-card"></i></p>
            <p className="menu__grid__item__title">Профиль</p>
          </div>

          <div className="menu__grid__item" onClick={() => openModal(PlayersTopModal, {})}>
            <p className="menu__grid__item__icon"><i className="fa-solid fa-users"></i></p>
            <p className="menu__grid__item__title">Топ игроков</p>
          </div>

          <div className="menu__grid__item">
            <p className="menu__grid__item__icon"><i className="fa-solid fa-gavel"></i></p>
            <p className="menu__grid__item__title">Аукцион</p>
          </div>

          <div className="menu__grid__item">
            <p className="menu__grid__item__icon"><i className="fa-solid fa-newspaper"></i></p>
            <p className="menu__grid__item__title">Канал</p>
          </div>
        </div>

      </div>
    </LayoutComponent>
  )
}