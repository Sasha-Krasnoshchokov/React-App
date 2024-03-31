import { useDispatch } from 'react-redux';
import { setModalConfig } from '../store/actions/modalPopupSlicer';
import { useState } from 'react';
import { Action, ID } from '../types/common';

const useThreeDotsActions = (listId?: ID, taskId?: ID) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const handle3Dots = () => {
    setIsOpen(!isOpen);
  };
  const handleMenuBtn = (e: React.MouseEvent) => {
    const { id: actionId } = e.target as HTMLButtonElement;
    setIsOpen(false);
    dispatch(
      setModalConfig({
        isModalOpen: true,
        contentKey: 'dataEditor',
        action: actionId as Action,
        boardEntity: actionId === 'addTask' || taskId ? 'task' : 'list',
        listId,
        taskId,
      })
    );
  };

  return {
    isOpen,
    handle3Dots,
    handleMenuBtn,
  };
};

export default useThreeDotsActions;
