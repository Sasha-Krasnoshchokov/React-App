import React from 'react';
import BoardPage from './components/pages/BoardPage';
import ModalPopup from './components/modals/ModalPopup';

const App: React.FC = () => {
  return (
    <>
      <ModalPopup />
      <BoardPage />
    </>
  );
};

export default App;
