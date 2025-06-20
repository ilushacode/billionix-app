import {FullscreenModal} from "../Components/FullscreenModal";
import {ScreenHeader} from "../Components/ScreenHeader/ScreenHeader";
import {ScreenHeaderTitle} from "../Components/ScreenHeader/ScreenHeaderTitle";
import {ScreenHeaderSection} from "../Components/ScreenHeader/ScreenHeaderSection";
import {ScreenHeaderSectionItemEmpty} from "../Components/ScreenHeader/ScreenHeaderSectionItemEmpty";
import {ScreenHeaderSectionItem} from "../Components/ScreenHeader/ScreenHeaderSectionItem";
import formatPrice from "../Functions/formatPrice";
import {useEffect, useState} from "react";
import useSocket from "../Hooks/useSocket";
import {useStore} from "../Hooks/useStore";


export const ProfileModal = ({ userId, onClose }) => {

  const { socket } = useSocket()
  const { player } = useStore()
  const [user, setUser] = useState({})

  useEffect(() => {
    if (!userId)
      setUser(player)

    console.log(player)
  }, [userId, setUser])

  return (
    <FullscreenModal darkTheme={true}>
      <ScreenHeader transparent={true}>
        <ScreenHeaderTitle title={'Профиль'} back={<i className="fa-regular fa-arrow-left"></i>} backCallback={onClose} />

        <ScreenHeaderSection>
          <ScreenHeaderSectionItemEmpty>
            <div className={'profile__header'}>
              <div className={'profile__header__avatar'}>
                <img src={user.avatar} alt="Avatar" />
              </div>

              <div className={'profile__header__content'}>
                <p className={'profile__header__content__name'}>{user.name}</p>
                <p className={'profile__header__content__username'}>@{user.username}</p>
              </div>
            </div>
          </ScreenHeaderSectionItemEmpty>
        </ScreenHeaderSection>

        <ScreenHeaderSection>
          <ScreenHeaderSectionItem title={'Баланс:'} value={formatPrice(user.balance)} />
        </ScreenHeaderSection>

        <ScreenHeaderSection>
          <ScreenHeaderSectionItem title={'Доход в час:'} value={formatPrice(user.income)} />
          <ScreenHeaderSectionItem title={'Расход в час:'} value={formatPrice(user.expenses)} />
        </ScreenHeaderSection>

        <ScreenHeaderSection>
          <ScreenHeaderSectionItem title={'Стоимость портфеля:'} value={formatPrice(user.sharesSum)} />
        </ScreenHeaderSection>

        <ScreenHeaderSection>
          <ScreenHeaderSectionItem title={'Дивиденды:'} value={formatPrice(user.sharesDividents)} />
        </ScreenHeaderSection>
      </ScreenHeader>
    </FullscreenModal>
  )
}