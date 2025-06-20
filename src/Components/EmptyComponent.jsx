

export const EmptyComponent = ({ title, hint }) => {
  return (
    <div className="empty">
      <p className="empty__icon"><i className="fa-light fa-face-frown"></i></p>
      <p className="empty__title">{title || "Тут пока пусто"}</p>
      <p className="empty__hint">{hint || "Открой свой первый бизнес"}</p>
    </div>
  )
}