import React from 'react';
import styled from 'styled-components';
import { CreateNewListButton, HistoryButton } from '../../features/Actions';
import useBoardActions from '../../../hooks/useBoardActions';

interface IProps {}

const BoardHeader: React.FC<IProps> = () => {
  const { handleHistory, handleCreateList } = useBoardActions();
  return (
    <BoardPageHeader>
      <BoardPageTitle>My Task Board</BoardPageTitle>
      <BoardPageActions>
        <HistoryButton
          type="button"
          onClick={handleHistory}
        >
          History
        </HistoryButton>
        <CreateNewListButton
          type="button"
          onClick={handleCreateList}
        >
          Create new list
        </CreateNewListButton>
      </BoardPageActions>
    </BoardPageHeader>
  );
};

export default BoardHeader;

const BoardPageHeader = styled.header`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

const BoardPageTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  line-height: 40px;
  letter-spacing: -0.25px;
`;

const BoardPageActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
