
export const StatsScreen = ({ id, closeModal }) => {

  // const {openModal} = useModal()

  return (
    <div>
      <h2>Профиль пользователя {id}</h2>
      <p>Дополнительная информация о пользователе {id}</p>
      {/* <button onClick={() => openModal({ id: 3, closeModal })}>Открыть еще</button> */}
      <button onClick={closeModal}>Закрыть</button>
    </div>
  );
};