import PriceChartComponent from "../Components/PriceChartComponent"
import formatPrice from "../Functions/formatPrice"
import useSocket from "../Hooks/useSocket"
import {useEffect, useState} from "react";
import {useStore} from "../Hooks/useStore";
import {Modal} from "../Components/Modal";


export const SharesMarketItemModal = ({ shareId, onClose }) => {

  const { socket } = useSocket()
  const [share, setShare] = useState({});
  const { player } = useStore();

  useEffect(() => {
    if (!player.shares || !shareId) return;

    // Найдём акцию по ID
    const currentShare = player.shares.find((s) => s.shareId === shareId);

    if (currentShare) {
      setShare(currentShare);
    }
  }, [player.shares, shareId]);

  const buyShare = () => {
    if (!socket) return
    socket.emit('share:buy', { shareId: share.shareId })
  }
  const sellShare = () => {
    if (!socket) return
    socket.emit('share:sell', { shareId: share.shareId })
  }

  return (
    <Modal title={'Информация об акции'} onClose={onClose}>

      <div className="shares_market_item__info">

        <div className="shares_market_item__info__item">
          <p className="shares_market_item__info__item__title">Компания</p>
          <p className="shares_market_item__info__item__value">{share.name}</p>
        </div>

        <div className="shares_market_item__info__item">
          <p className="shares_market_item__info__item__title">Стоимость акции</p>
          <p className="shares_market_item__info__item__value"><span className="color_green">$</span> {formatPrice(share.price)}</p>
        </div>

        <div className="shares_market_item__info__item">
          <p className="shares_market_item__info__item__title">Доходность</p>
          <p className="shares_market_item__info__item__value">{share.persent}% (<span className="color_green">$</span> {formatPrice(share.dividents)})</p>
        </div>

        <div className="shares_market_item__info__item">
          <p className="shares_market_item__info__item__title">В портфеле</p>
          <p className="shares_market_item__info__item__value">{share.count} шт (<span className="color_green">$</span> {formatPrice(share.price * share.count)})</p>
        </div>

        <div className="shares_market_item__info__item">
          <p className="shares_market_item__info__item__title">Дивиденды</p>
          <p className="shares_market_item__info__item__value"><span className="color_green">$</span> {formatPrice(share.dividents * share.count)}</p>
        </div>

      </div>

      <div className="shares_market_item__chart">
        <PriceChartComponent data={share.priceHistory} />
      </div>

      <div className="shares_market_item__buttons">
        <div className="shares_market_item__buttons__item shares_market_item__buttons__item__red" onClick={sellShare}>
          <p className="shares_market_item__buttons__item__text">Продать</p>
        </div>

        <div className="shares_market_item__buttons__item shares_market_item__buttons__item__green" onClick={buyShare}>
          <p className="shares_market_item__buttons__item__text">Купить</p>
        </div>
      </div>
    </Modal>
    // <div className="modal create_business_modal">
    //   <div className="modal_overlay" onClick={onClose}></div>
    //   <div className="create_business_modal__content">
    //     <div className="create_business_modal__title__container">
    //       <p className="create_business_modal__title">Информация об акции</p>
    //       <p className="create_business_modal__close" onClick={onClose}><i className="fa-regular fa-xmark"></i></p>
    //     </div>
    //
    //     <p className="shares_market_item__title">{share.name}</p>
    //
    //
    //
    //   </div>
    // </div>
  )
}