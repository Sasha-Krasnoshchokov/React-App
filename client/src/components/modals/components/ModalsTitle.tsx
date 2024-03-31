import React from 'react';

import styled from 'styled-components';
import { Shutter } from '../../features/Actions';
import { useDispatch } from 'react-redux';
import { setIsModalOpen } from '../../../store/actions/modalPopupSlicer';

interface IProps {
  title?: string;
}

const ModalTitle: React.FC<IProps> = ({ title }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setIsModalOpen(false));
  };
  return (
    <ModalTitleWrapper>
      {title || ''}
      <Shutter onClick={handleClose} />
    </ModalTitleWrapper>
  );
};

export default ModalTitle;

const ModalTitleWrapper = styled.h3`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 48px;
  padding: 12px;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  color: rgb(var(--main-light-rgb));
  background-color: rgb(93, 100, 129);
`;
