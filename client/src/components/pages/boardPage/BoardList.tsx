import React from 'react';
import styled from 'styled-components';
import { IBoardList } from '../../../types/boards';
import ThreeDotsMenu from '../../features/ThreeDotsMenu';
import { AddNewCard } from '../../features/Actions';
import { useDispatch } from 'react-redux';
import { setModalConfig } from '../../../store/actions/modalPopupSlicer';
import BoardTaskCard from './BoardTaskCard';

interface IProps {
  list: IBoardList;
  column: number;
  children?: React.ReactNode;
}

const BoardList: React.FC<IProps> = ({ list, column, children = '' }) => {
  const dispatch = useDispatch();

  const handleAddNewTask = () => {
    dispatch(
      setModalConfig({
        isModalOpen: true,
        action: 'addTask',
        contentKey: 'dataEditor',
        boardEntity: 'task',
        listId: list.id,
      })
    );
  };

  return (
    <BoardListItem $column={column}>
      <BoardListTitle>
        <span
          data-tooltip-text={list.description ?? ''}
          data-is-tooltip={!!list.description}
        >
          {list.title}
        </span>
        <span>{list?.tasks?.length || 0}</span>
        <BoardListMenuWrapper>
          <ThreeDotsMenu
            menus={['edit', 'addTask', 'delete']}
            listId={list.id}
          />
        </BoardListMenuWrapper>
      </BoardListTitle>
      <AddNewCard
        type="button"
        onClick={handleAddNewTask}
      >
        Add new task
      </AddNewCard>
      {list?.tasks &&
        list.tasks.length > 0 &&
        list.tasks.map((item) => (
          <React.Fragment key={item.id}>
            <BoardTaskCard task={item} />
          </React.Fragment>
        ))}
      {children}
    </BoardListItem>
  );
};

export default BoardList;

const BoardListItem = styled.li<{ $column: number }>`
  list-style: none;
  grid-column: ${({ $column }) => `${$column} / ${$column + 1}`};
  grid-row: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 300px;
  padding: 0 4px 8px 4px;
  background: #fff;
  overflow: hidden auto;
`;

const BoardListTitle = styled.h3`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 -4px 0 -4px;
  width: calc(100% + 8px);
  padding: 8px 32px 8px 4px;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  border-top: 2px solid rgba(var(--main-dark-rgb), 0.5);
  border-bottom: 2px solid rgba(var(--main-dark-rgb), 0.5);

  & span[data-is-tooltip='true']::before {
    content: attr(data-tooltip-text);
    position: absolute;
    inset: 95% 0 auto 0;
    display: none;
    padding: 6px;
    font-weight: 400;
    color: rgba(var(--main-dark-rgb), 1);
    border-radius: 4px;
    background: rgba(var(--main-tooltip-bg-rgb), 1);
    z-index: 10;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & span:hover::before {
    display: flex;
  }
`;

const BoardListMenuWrapper = styled.div`
  position: absolute;
  inset: 50% 4px auto auto;
  transform: translateY(-50%);
  width: 16px;
  height: 32px;
  z-index: 100;
`;
