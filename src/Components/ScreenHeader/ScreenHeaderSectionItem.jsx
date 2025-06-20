

export const ScreenHeaderSectionItem = ({ title, value, onClick, className, children }) => {
  return (
    <div className="screen_header__section__item" onClick={onClick}>
      <p className="screen_header__section__item__title">{ title }</p>
      <p className="screen_header__section__item__value"><span className="color_green">$</span> {value}</p>
    </div>
  )
}