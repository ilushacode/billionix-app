import formatPrice from "../Functions/formatPrice";
import useSocket from "../Hooks/useSocket";
import {useEffect, useState} from "react";
import {useStore} from "../Hooks/useStore";
import {useNotification} from "../Providers/NotificationProvider";
import {FullscreenModal} from "../Components/FullscreenModal";
import {ScreenHeaderCard} from "../Components/ScreenHeader/ScreenHeaderCard";
import {ScreenHeaderSection} from "../Components/ScreenHeader/ScreenHeaderSection";
import {ScreenHeaderSectionItem} from "../Components/ScreenHeader/ScreenHeaderSectionItem";
import {ScreenHeader} from "../Components/ScreenHeader/ScreenHeader";
import {ScreenHeaderTitle} from "../Components/ScreenHeader/ScreenHeaderTitle";
import {ScreenHeaderSectionItemEmpty} from "../Components/ScreenHeader/ScreenHeaderSectionItemEmpty";
import {Button} from "../Components/Forms/Button";


export const BusinessModal = ({ businessId, onClose }) => {

  const [business, setBusiness] = useState({});
  const { addNotification } = useNotification()
  const { socket } = useSocket()
  const { player } = useStore()

  useEffect(() => {
    if (!player.businesses || !businessId) return;

    // Найдём акцию по ID
    const currentBusiness = player.businesses.find((b) => b._id === businessId);

    if (currentBusiness) {
      setBusiness(currentBusiness);
    }
  }, [player.businesses, businessId]);

  const upgradeHandler = () => {
    if (!socket) return

    socket.emit('business:upgrade', { businessId: business._id })
  }

  const destroyHandler = () => {
    if (!socket) return

    socket.emit('business:destroy', { businessId: business._id })
  }

  useEffect(() => {
    if (!socket) return

    socket.on('business:destroy', (data) => {
      if (data.ok) {
        onClose()
        addNotification('success', 'Бизнес успешно закрыт')
      }
    })

    return () => {
      socket.off('business:destroy')
    }
  }, [socket, addNotification, onClose]);

  return (
    <FullscreenModal>

      <ScreenHeader>
        <ScreenHeaderTitle title={'Меню бизнеса'} back={<i className="fa-regular fa-arrow-left"></i>} backCallback={onClose} />
        <ScreenHeaderSection>
          <ScreenHeaderSectionItemEmpty>
            <div className={'business_modal__title'}>
              <div className="businesses__list__item__lvl businesses__list__item__lvl__dark" style={{ "--percent": business.exp }}>
                <p className="businesses__list__item__lvl__inner">{business.lvl}</p>
              </div>

              <div className={'business_modal__title__content'}>
                <p className={'business_modal__title__content__title'}>{ business.title }</p>
                <p className={'business_modal__title__content__owner'}>@{player.username}</p>
              </div>
            </div>
          </ScreenHeaderSectionItemEmpty>
        </ScreenHeaderSection>
        <ScreenHeaderSection>
          <ScreenHeaderSectionItem
            title={"Доход в час:"}
            value={formatPrice(business.income)}
          />
          <ScreenHeaderSectionItem
            title={"Расход в час:"}
            value={formatPrice(business.expenses)}
          />
        </ScreenHeaderSection>
        <ScreenHeaderSection>
          <ScreenHeaderSectionItem
            title={"Налоги:"}
            value={formatPrice(business.taxes)}
          />
        </ScreenHeaderSection>

        <Button
          text={'Улучшить'}
          hint={`$ ${formatPrice(business.upgradePrice)}`}
          callback={upgradeHandler}
          icon={<i className="fa-regular fa-up"></i>}
          className={["button__bordered", "button__bordered__green"]}
        />
        <Button
          text={'Закрыть'}
          callback={destroyHandler}
          icon={<i className="fa-regular fa-xmark"></i>}
          className={["button__bordered", "button__bordered__red"]}
        />

      </ScreenHeader>

      <p>Бизнес тут</p>
    </FullscreenModal>
    // <div className="modal business_modal">
    //   <div className="business_modal__content">
    //     <div className="create_business_modal__title__container">
    //       <p className="create_business_modal__title">Управление бизнесом</p>
    //       <p className="create_business_modal__close" onClick={onClose}><i className="fa-regular fa-xmark"></i></p>
    //     </div>
    //
    //
    //     <button onClick={upgradeHandler}>Прокачать * $ {formatPrice(business.upgradePrice)}</button>
    //     <button onClick={destroyHandler}>Закрыть</button>
    //
    //   </div>
    // </div>
  )
}