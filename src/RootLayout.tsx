// RootLayout.jsx
import { Outlet, useNavigation } from 'react-router-dom';
import { EditorProvider } from './Components/Contexts/useEditor';
import { LoginModal } from './Components/Modals/LoginModal';
import { useState } from 'react';
import Header from './Components/Header/Header';
import { useMediaQuery } from 'react-responsive';

const RootLayout: React.FC = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 749px)' });
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";
    const [loginModalOpened, setLoginModalOpened] = useState(false);
    return (
    <div id="app">
      <EditorProvider>
        <Header setLoginModalOpened={setLoginModalOpened} />  {/* Now Header is always present */}
        <div id="detail" className={isLoading ? "loading" : ""}>
          {isLoading && <div className='loader-container'><span className="loader"></span></div>}
          <Outlet context={{ setLoginModalOpened, isMobile }} />
        </div>
      </EditorProvider>
      <LoginModal opened={loginModalOpened} onClose={() => setLoginModalOpened(false)} />
    </div>
  );
}

export default RootLayout;
