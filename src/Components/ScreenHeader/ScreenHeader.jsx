

export const ScreenHeader = ({ transparent, children }) => {
  return (
    <div className={["screen_header", transparent ? 'screen_header__transparent' : ''].join(' ')}>
      {children}
    </div>
  )
}