import React from 'react';

import styled from 'styled-components';
import BoardHeader from './boardPage/BoardHeader';
import BoardContent from './boardPage/BoardContent';

interface IProps {}

const BoardPage: React.FC<IProps> = () => {
  return (
    <BoardPageWrapper>
      <BoardHeader />
      <BoardContent />
    </BoardPageWrapper>
  );
};

export default React.memo(BoardPage);

const BoardPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: rgba(var(--main-dark-rgb), 0.05);
`;
