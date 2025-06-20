import { useEffect } from "react"
import useSocket from "../Hooks/useSocket"
import { useStore } from "../Hooks/useStore"
import getPercentageDifference from "../Functions/getPercentageDifference"
import formatPrice from "../Functions/formatPrice"
import { useModal } from "../Providers/ModalProvider"
import { SharesMarketItemModal } from "./SharesMarketItemModal"


export const SharesMarketModal = ({ onClose }) => {

  const { socket } = useSocket()
  const { openModal } = useModal()
  const { sharesMarket } = useStore()

  useEffect(() => {
    if (!socket) return

    socket.emit('shares_market:update', {})
  }, [socket])

  return (
    <div className="modal profile_modal">
      <div className="profile_modal__header">
        <p className="profile_modal__header__back" onClick={onClose}><i className="fa-regular fa-arrow-left"></i></p>
        <p className="profile_modal__header__name">Магазин акций</p>
      </div>

      <div className="shares_market_modal__content">
        <div className="shares_market_modal__slider">
          <img src="https://avatars.mds.yandex.net/i?id=835737d6908070975e58c9d1d3500de9_l-10675607-images-thumbs&n=13" alt="" />
        </div>

        <div className="shares_market_modal__list">

          {sharesMarket.map((share) => (
            <div className="shares_market_modal__list__item" key={share.shareId} onClick={() => openModal(SharesMarketItemModal, {shareId: share.shareId})}>
              <div className="shares_market_modal__list__item__logo"></div>
              <div className="shares_market_modal__list__item__content">
                <p className="shares_market_modal__list__item__content__title">{share.name}</p>
                <p className="shares_market_modal__list__item__content__data color_green">{getPercentageDifference(share.priceHistory, share.price).isPositive ? <span className="color_green">+ {getPercentageDifference(share.priceHistory, share.price).percentDiff}%</span> : <span className="color_red">- {getPercentageDifference(share.priceHistory, share.price).percentDiff}%</span>}</p>
              </div>
              <p className="shares_market_modal__list__item__price">$ {formatPrice(share.price)}</p>
            </div>
          ))}

        </div>
      </div>

    </div>
  )
}