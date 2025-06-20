import {FullscreenModal} from "../Components/FullscreenModal";
import {ScreenHeader} from "../Components/ScreenHeader/ScreenHeader";
import {ScreenHeaderTitle} from "../Components/ScreenHeader/ScreenHeaderTitle";
import {List} from "../Components/Forms/List";
import formatPrice from "../Functions/formatPrice";
import {useEffect, useState} from "react";
import useSocket from "../Hooks/useSocket";
import {useStore} from "../Hooks/useStore";


export const PlayersTopModal = ({ onClose }) => {

  const { socket } = useSocket()
  const [players, setPlayers] = useState([])
  const { player } = useStore()

  useEffect(() => {
    if (!socket) return

    socket.emit('playertop:get')

    const timer = setInterval(() => {
      socket.emit('playertop:get')
    }, 5000)

    socket.on('playertop:update', (data) => {
      setPlayers(data.players)
    })

    return () => {
      socket.off('playertop:update');
      clearInterval(timer);
    }
  }, [socket]);

  return (
    <FullscreenModal>
      <ScreenHeader>
        <ScreenHeaderTitle back={<i className="fa-regular fa-arrow-left"></i>} backCallback={onClose} title={'Топ игроков'} />
      </ScreenHeader>

      <List items={players} empty={{title: 'Топ временно недоступен', hint: 'Нужно немного подождать'}}>
        {(item, index) => (
          <div className={['players_top__item', item._id === player._id ? 'players_top__item__current' : ''].join(' ')}>
            <div className={'players_top__item__avatar'}><img src={item.avatar} alt={'Avatar'} /></div>
            <div className={'players_top__item__content'}>
              <p className={'players_top__item__content__name'}>{item.name}</p>
              <p className={'players_top__item__content__balance'}><span className={'color_green'}>$</span> {formatPrice(item.balance)}</p>
            </div>
            <p className={'players_top__item__index'}>#{index + 1}</p>
          </div>
        )}
      </List>
    </FullscreenModal>
  )
}