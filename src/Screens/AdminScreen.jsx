import {useEffect, useState} from "react";
import useSocket from "../Hooks/useSocket";
import '../Console.css'
import {ScreenHeader} from "../Components/ScreenHeader/ScreenHeader";
import {ScreenHeaderTitle} from "../Components/ScreenHeader/ScreenHeaderTitle";
import {useNavigate} from "react-router-dom";


export const AdminScreen = () => {

  const navigate = useNavigate();
  const { socket } = useSocket()
  const [ history, setHistory ] = useState([]);
  const [ text, setText ] = useState("");

  const sendMessage = () => {
    setText("");

    if (text === 'clear') {
      return setHistory([])
    }

    socket.emit("console:send", {text})
    setHistory((prev) => [{isLocal: true, text: text}, ...prev]);
  }

  function RenderHTML({ html }) {
    return (
      <div dangerouslySetInnerHTML={{ __html: html }} />
    );
  }

  useEffect(() => {
    if (!socket) return

    socket.on('console:message', (data) => {
      setHistory((prev) => [{isLocal: false, text: data.text}, ...prev]);
    })

    return () => {
      socket.off('console:message')
    }
  }, [text, socket])

  return (
    <div className={'console'}>
      <ScreenHeader transparent={true}>
        <ScreenHeaderTitle title={'Консоль'} back={<i className="fa-regular fa-arrow-left"></i>} backCallback={() => navigate('/')} />
      </ScreenHeader>

      <div className={'console__content'}>
        <div className={'console__content__history'}>
          {history.map((item, index) => (
            <div key={index} className="console__history__item">
              {item.isLocal &&
                <p className={'console__history__item__local'}>> {item.text}</p>
              }
              {!item.isLocal &&
                <div className={'console__history__item__server'}><RenderHTML html={item.text} /></div>
              }
            </div>
          ))}
        </div>
        <div className={'console__content__form'}>
          <input placeholder={'Введите запрос'} value={text} onChange={(e) => setText(e.target.value)} />
          <button onClick={sendMessage}><i className="fa-regular fa-up"></i></button>
        </div>
      </div>
    </div>
  )
}