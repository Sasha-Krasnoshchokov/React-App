import React, { useEffect } from 'react';

import styled from 'styled-components';
import modalPopups from './modalPopups';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { resetModalConfig } from '../../store/actions/modalPopupSlicer';

let timer: NodeJS.Timeout;
interface IProps {}

const ModalPopup: React.FC<IProps> = () => {
  const dispatch = useDispatch();
  const { modalPopup } = useSelector((state: RootState) => state.modalPopup);
  const { isModalOpen, contentKey, action, boardEntity, listId, taskId } = modalPopup;

  useEffect(() => {
    if (!isModalOpen && contentKey) {
      timer = setTimeout(() => {
        dispatch(resetModalConfig());
      }, 395);
    }

    return () => clearTimeout(timer);
  }, [isModalOpen, contentKey, dispatch]);

  return (
    <ModalPopupWrapper
      $isOpen={isModalOpen}
      $isDisplay={!!contentKey}
    >
      {contentKey && modalPopups[contentKey]({ action, boardEntity, listId, taskId })}
    </ModalPopupWrapper>
  );
};

export default ModalPopup;

const ModalPopupWrapper = styled.div<{ $isOpen: boolean; $isDisplay: boolean }>`
  position: absolute;
  inset: 0 0 0 0;
  display: ${({ $isDisplay }) => ($isDisplay ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  background-color: rgba(var(--main-dark-rgb), 0.75);
  z-index: 1000;
  animation: 400ms linear 0s 1 alternate ${({ $isOpen }) => ($isOpen ? 'visibility' : 'disable')};

  @keyframes visibility {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes disable {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;
