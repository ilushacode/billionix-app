

export const Button = ({ icon, text, hint, callback, className = [] }) => {
  return (
    <div className={["button", ...className].join(" ")} onClick={callback}>
      <p className={"button__icon"}>{ icon }</p>
      <div className={"buton__content"}>
        <p className={"button__text"}>{ text }</p>
        {hint &&
        <p className={"button__hint"}>{ hint }</p>
        }
      </div>
    </div>
  )
}