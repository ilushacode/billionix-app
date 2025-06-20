

export const FullscreenModal = ({ title, onClose, darkTheme, children }) => {
  return (
    <div className={['fullscreen_modal', darkTheme ? 'fullscreen_modal__dark' : ''].join(' ')}>
      { children }
    </div>
  )
}