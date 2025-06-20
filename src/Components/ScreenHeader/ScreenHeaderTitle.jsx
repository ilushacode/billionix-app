

export const ScreenHeaderTitle = ({ back, backCallback, title, counter, right }) => {
  return (
    <div className="screen_header__title">
      <div className="screen_header__title__left">
        <p className="screen_header__title__left__back" onClick={backCallback}>{ back }</p>
        <p className="screen_header__title__left__title">{ title }</p>
        <p className="screen_header__title__left__title__counter">{ counter }</p>
      </div>
      <div className="screen_header__title__right">
        { right }
      </div>
    </div>
  )
}