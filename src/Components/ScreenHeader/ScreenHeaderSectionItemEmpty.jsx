

export const ScreenHeaderSectionItemEmpty = ({ title, children }) => {
  return (
    <div className="screen_header__section__item">
      {title && (
        <p className="screen_header__section__item__title">{ title }</p>
      )}
      { children }
    </div>
  )
}