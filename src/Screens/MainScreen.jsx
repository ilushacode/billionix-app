import { useEffect, useState } from "react";
import { LayoutComponent } from "../Components/LayoutComponent";
import { useModal } from "../Providers/ModalProvider";
import { useStore } from "../Hooks/useStore";
import formatPrice from "../Functions/formatPrice";
import calculateTotalIncomeAndExpenses from "../Functions/calculateTotalIncomeAndExpenses";
import { TaxesModal } from "../Modals/TaxesModal";
import { MainClickerComponent } from "../Components/MainClickerComponent";
import { ScreenHeader } from "../Components/ScreenHeader/ScreenHeader";
import { ScreenHeaderSection } from "../Components/ScreenHeader/ScreenHeaderSection";
import { ScreenHeaderSectionItem } from "../Components/ScreenHeader/ScreenHeaderSectionItem";
import { ScreenHeaderCard } from "../Components/ScreenHeader/ScreenHeaderCard";
import {useNotification} from "../Providers/NotificationProvider";
import {useNavigate} from "react-router-dom";

export const MainScreen = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const { player } = useStore();
  const [totalSum, setTotalSum] = useState({});

  const [clicks, setClicks] = useState([]);
  const [secretMenuOpen, setSecretMenuOpen] = useState(false);

  useEffect(() => {
    if (player?.businesses) {
      const result = calculateTotalIncomeAndExpenses(player.businesses);
      setTotalSum(result);
    }
  }, [player]);

  const handleTaxesClick = () => {
    openModal(TaxesModal, { taxes: player.taxes });
  };

  const handleSecretClick = () => {
    const now = Date.now();
    const newClicks = [...clicks, now];

    // Удаляем клики старше 5 секунд
    const recentClicks = newClicks.filter(timestamp => now - timestamp < 5000);

    if (recentClicks.length >= 5) {
      // Сработало условие — открываем секретное меню
      navigate('/admin')
      // Очищаем список кликов, чтобы не срабатывало повторно
      setClicks([]);
    } else {
      setClicks(recentClicks);
    }
  };

  return (
    <LayoutComponent>
      <div className="main">
        <ScreenHeader>
          <ScreenHeaderCard />
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
              title={"Стоимость клика:"}
              value={formatPrice(player.sharesDividents)}
              onClick={handleSecretClick}
            />
          </ScreenHeaderSection>
        </ScreenHeader>

        {/* Бонус временно закомментирован */}
        {/* <div className="main__bonus">
          <div className="main__bonus__left">
            <p className="main__bonus__left__icon"><i className="fa-regular fa-coins"></i></p>
            <p className="main__bonus__left__text">Бонус</p>
          </div>
          <div className="main__bonus__right">
            <p className="main__bonus__right__text">+50%</p>
          </div>
        </div> */}

        {player.taxes?.sum > 0 && (
          <div className="main__taxes" onClick={handleTaxesClick}>
            <div className="main__taxes__left">
              <p className="main__taxes__left__icon">
                <i className="fa-regular fa-siren-on"></i>
              </p>
              <p className="main__taxes__left__text">Налоговая задолженность</p>
            </div>
            <div className="main__taxes__right">
              <p className="main__taxes__right__text">
                <i className="fa-regular fa-chevron-right"></i>
              </p>
            </div>
          </div>
        )}

        <MainClickerComponent />
      </div>
    </LayoutComponent>
  );
};