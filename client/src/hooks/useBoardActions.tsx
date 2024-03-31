import { useDispatch } from 'react-redux';
import { setModalConfig } from '../store/actions/modalPopupSlicer';

const useBoardActions = () => {
  const dispatch = useDispatch();

  const handleHistory = () => {
    dispatch(setModalConfig({ isModalOpen: true, contentKey: 'history' }));
  };

  const handleCreateList = () => {
    dispatch(
      setModalConfig({
        isModalOpen: true,
        contentKey: 'dataEditor',
        action: 'create',
        boardEntity: 'list',
      })
    );
  };

  return {
    handleHistory,
    handleCreateList,
  };
};

export default useBoardActions;
