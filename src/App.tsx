import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from './contexts/authContext'
import { Room } from "./pages/Room";
import { AdminRoom } from "./pages/AdminRoom";
import { Rooms } from "./pages/Rooms";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms/new" element={<NewRoom />} />
          <Route path="/rooms/:id/*" element={<Room />} />
          <Route path="/rooms" element={<Rooms />} />

          <Route path="admin/rooms/:id/*" element={<AdminRoom />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>

  );
}

export default App;
