import { useEffect } from "react";
import { LayoutComponent } from "../Components/LayoutComponent";
import useSocket from "../Hooks/useSocket";
import { useStore } from "../Hooks/useStore";
import { SharesMarketModal } from "../Modals/SharesMarketModal";
import { useModal } from "../Providers/ModalProvider";
import formatPrice from "../Functions/formatPrice";
import { SharesMarketItemModal } from "../Modals/SharesMarketItemModal";

// Компоненты ScreenHeader
import { ScreenHeaderTitle } from "../Components/ScreenHeader/ScreenHeaderTitle";
import { ScreenHeaderSection } from "../Components/ScreenHeader/ScreenHeaderSection";
import { ScreenHeaderSectionItem } from "../Components/ScreenHeader/ScreenHeaderSectionItem";
import { ScreenHeader } from "../Components/ScreenHeader/ScreenHeader";

// Формы
import { List } from "../Components/Forms/List";

export const SharesScreen = () => {
  const { openModal } = useModal();
  const { player } = useStore();

  const handleOpenBuyModal = () => {
    openModal(SharesMarketModal);
  };

  const handleOpenShareDetails = (item) => {
    openModal(SharesMarketItemModal, { shareId: item.shareId });
  };

  return (
    <LayoutComponent>
      <div className="businesses">
        <ScreenHeader>
          <ScreenHeaderTitle
            title={"Акции"}
            counter={player.shares?.length || 0}
            right={
              <p className="header__title__right" onClick={handleOpenBuyModal}>
                <i className="fa-regular fa-plus"></i>
              </p>
            }
          />

          <ScreenHeaderSection>
            <ScreenHeaderSectionItem
              title={"Стоимость портфеля:"}
              value={formatPrice(player.sharesSum)}
            />
          </ScreenHeaderSection>

          <ScreenHeaderSection>
            <ScreenHeaderSectionItem
              title={"Дивиденды:"}
              value={formatPrice(player.sharesDividents)}
            />
          </ScreenHeaderSection>
        </ScreenHeader>

        <List items={player.shares} empty={{ title: "Акций пока нет", hint: "Скорее купи свою первую акцию" }}>
          {(item) => (
            <div
              className="businesses__list__item"
              key={item.shareId}
              onClick={() => handleOpenShareDetails(item)}
            >
              <p className="businesses__list__item__icon">
                <i className="fa-regular fa-file-contract"></i>
              </p>
              <div className="businesses__list__item__info">
                <div className="businesses__list__item__info__left">
                  <p className="businesses__list__item__info__left__title">
                    {item.name}{" "}
                    <span style={{ opacity: ".3", marginLeft: ".3rem" }}>{item.count}</span>
                  </p>
                  <div className="businesses__list__item__info__left__money">
                    <p className="businesses__list__item__info__left__money__item__plus">
                      $ {formatPrice(item.price * item.count)}
                    </p>
                    <p className="businesses__list__item__info__left__money__separator">·</p>
                    <p className="businesses__list__item__info__left__money__item__minus">
                      {item.persent}%
                    </p>
                    <p className="businesses__list__item__info__left__money__separator">·</p>
                    <p className="businesses__list__item__info__left__money__item__minus">
                      $ {formatPrice(item.dividents)}
                    </p>
                  </div>
                </div>
                <p className="businesses__list__item__info__arrow">
                  <i className="fa-regular fa-chevron-right"></i>
                </p>
              </div>
            </div>
          )}
        </List>
      </div>
    </LayoutComponent>
  );
};