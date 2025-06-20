import { useLocation, useNavigate, useNavigation } from "react-router-dom"


export const BottomMenu = () => {

  const navigate = useNavigate()
  const location = useLocation();

  return (
    <div className="bottom_menu">
      <div className={`bottom_menu__item ${location.pathname === '/main' ? 'bottom_menu__item__active' : ''}`} onClick={() => navigate('/main')}>
        <p className="bottom_menu__item__icon"><i className="fa-regular fa-house"></i></p>
        <p className="bottom_menu__item__hint">Главная</p>
      </div>

      <div className={`bottom_menu__item ${location.pathname === '/businesses' ? 'bottom_menu__item__active' : ''}`} onClick={() => navigate('/businesses')}>
        <p className="bottom_menu__item__icon"><i className="fa-regular fa-buildings"></i></p>
        <p className="bottom_menu__item__hint">Бизнесы</p>
      </div>

      <div className={`bottom_menu__item ${location.pathname === '/shares' ? 'bottom_menu__item__active' : ''}`} onClick={() => navigate('/shares')}>
        <p className="bottom_menu__item__icon"><i className="fa-regular fa-files"></i></p>
        <p className="bottom_menu__item__hint">Акции</p>
      </div>

      <div className={`bottom_menu__item ${location.pathname === '/menu' ? 'bottom_menu__item__active' : ''}`} onClick={() => navigate('/menu')}>
        <p className="bottom_menu__item__icon"><i className="fa-regular fa-grid-2"></i></p>
        <p className="bottom_menu__item__hint">Меню</p>
      </div>
    </div>
  )
}