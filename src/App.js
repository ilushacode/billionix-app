import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import './Styles.css'
import { ModalProvider } from "./Providers/ModalProvider";

import { MainScreen } from "./Screens/MainScreen";
import { BusinessesScreen } from "./Screens/BusinessesScreen";
import { SharesScreen } from "./Screens/SharesScreen";
import { MenuScreen } from "./Screens/MenuScreen";
import { SocketProvider } from "./Contexts/SocketContext";
import { LoaderScreen } from "./Screens/LoaderScreen";
import {NotificationProvider} from "./Providers/NotificationProvider";
import {AdminScreen} from "./Screens/AdminScreen";

function App() {
  return (
    <NotificationProvider>
      <SocketProvider>
        <ModalProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<LoaderScreen />} />
              <Route path="main" element={<MainScreen />} />
              <Route path="businesses" element={<BusinessesScreen />} />
              <Route path="shares" element={<SharesScreen />} />
              <Route path="menu" element={<MenuScreen />} />

              <Route path="admin" element={<AdminScreen />} />

              {/* <Route path="*" element={<NoPage />} /> */}
            </Routes>
          </BrowserRouter>
        </ModalProvider>
      </SocketProvider>
    </NotificationProvider>
  );
}

export default App;
