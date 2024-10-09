// RootLayout.jsx
import { Outlet } from 'react-router-dom';
import { EditorProvider } from './Components/Contexts/useEditor';
import { LoginModal } from './Components/Modals/LoginModal';
import { useState } from 'react';

const RootLayout: React.FC = () => {
    const [loginModalOpened, setLoginModalOpened] = useState(false);
    const [passedValue, setPassedValue] = useState(false);
    return (
    <div id="app">
      <EditorProvider>
        <Outlet context={{ setLoginModalOpened, passedValue, setPassedValue }} />
      </EditorProvider>
      <LoginModal opened={loginModalOpened} onClose={() => setLoginModalOpened(false)} />
    </div>
  );
}

export default RootLayout;
