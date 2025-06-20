import { useEffect, useState } from "react";
import { LayoutComponent } from "../Components/LayoutComponent";
import { useStore } from "../Hooks/useStore";
import { BusinessModal } from "../Modals/BusinessModal";
import { CreateBusinessModal } from "../Modals/CreateBusinnessModal";
import { useModal } from "../Providers/ModalProvider";
import formatPrice from "../Functions/formatPrice";
import calculateTotalIncomeAndExpenses from "../Functions/calculateTotalIncomeAndExpenses";

// Компоненты ScreenHeader
import { ScreenHeader } from "../Components/ScreenHeader/ScreenHeader";
import { ScreenHeaderTitle } from "../Components/ScreenHeader/ScreenHeaderTitle";
import { ScreenHeaderSection } from "../Components/ScreenHeader/ScreenHeaderSection";
import { ScreenHeaderSectionItem } from "../Components/ScreenHeader/ScreenHeaderSectionItem";

// Формы
import { Button } from "../Components/Forms/Button";
import { List } from "../Components/Forms/List";

export const BusinessesScreen = () => {
  const { openModal } = useModal();
  const { player } = useStore();
  const [totalSum, setTotalSum] = useState({});
  const [totalTaxes, setTotalTaxes] = useState(0);

  useEffect(() => {
    if (!player?.businesses) return;

    const incomeExpenseData = calculateTotalIncomeAndExpenses(player.businesses);
    const taxes = parseFloat(
      player.businesses.reduce((sum, business) => sum + business.taxes, 0).toFixed(2)
    );

    setTotalSum(incomeExpenseData);
    setTotalTaxes(taxes);
  }, [player]);

  const handleOpenBusinessModal = (item) => {
    openModal(BusinessModal, { businessId: item._id });
  };

  const handleOpenCreateBusinessModal = () => {
    openModal(CreateBusinessModal);
  };

  return (
    <LayoutComponent>
      <div className="businesses">
        <ScreenHeader>
          <ScreenHeaderTitle title={"Бизнесы"} counter={player.businesses?.length || 0} />

          <ScreenHeaderSection>
            <ScreenHeaderSectionItem
              title={"Доход в час:"}
              value={formatPrice(totalSum.totalIncome)}
            />
            <ScreenHeaderSectionItem
              title={"Расход в час:"}
              value={formatPrice(totalSum.totalExpenses)}
            />
          </ScreenHeaderSection>

          <ScreenHeaderSection>
            <ScreenHeaderSectionItem
              title={"Налоги:"}
              value={formatPrice(totalTaxes)}
            />
          </ScreenHeaderSection>

          <Button
            icon={<i className="fa-regular fa-plus"></i>}
            text={"Создать"}
            callback={handleOpenCreateBusinessModal}
            className={["button__bordered"]}
          />
        </ScreenHeader>

        <List items={player.businesses} empty={{ title: "Бизнесов пока нет", hint: "Самое время создать первый!" }}>
          {(item) => (
            <div
              className="businesses__list__item"
              key={item._id}
              onClick={() => handleOpenBusinessModal(item)}
            >
              <div className="businesses__list__item__lvl" style={{ "--percent": item.exp }}>
                <p className="businesses__list__item__lvl__inner">{item.lvl}</p>
              </div>

              <div className="businesses__list__item__info">
                <div className="businesses__list__item__info__left">
                  <p className="businesses__list__item__info__left__title">{item.title}</p>
                  <div className="businesses__list__item__info__left__money">
                    <p className="businesses__list__item__info__left__money__item__plus">
                      $ {formatPrice(item.income)}
                    </p>
                    <p className="businesses__list__item__info__left__money__separator">·</p>
                    <p className="businesses__list__item__info__left__money__item__minus">
                      $ {formatPrice(item.expenses)}
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