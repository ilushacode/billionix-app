import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useSocket from "../Hooks/useSocket";


export const LoaderScreen = () => {

  const navigate = useNavigate()
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    if (!socket || !isConnected) return

    socket.emit('player:init', {userId: 1, username: 'test', avatar: '123'})

    socket.on('player:init', data => {
      if (data.ok) navigate('/main')
    })

    return () => {
      socket.off('player:init')
    }
  }, [navigate, socket, isConnected])

  return (
    <div className="loader">
      <div className="loader__content">
        <p className="loader__content__title">BILLIONIX</p>
        <p className="loader__content__slogan">Империя с одного клика</p>

        <p className="loader__content__loader"><i className="fa-regular fa-badge-dollar"></i></p>
      </div>
    </div>
  )
}