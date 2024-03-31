import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { IBoardTask } from '../../../types/boards';
import ThreeDotsMenu from '../../features/ThreeDotsMenu';

import calendarIconUrl from '../../../assets/calendar.svg';
import Selector from '../../features/Selector';
import { useDispatch } from 'react-redux';
import { IHistory, ISelectorOption } from '../../../types/common';
import activitiesGenerator from '../../../helpers/activitiesGenerator';
import { History } from '../../../models/History';
import { BoardListsContext, IBoardListsContext } from './BoardContent';

import requests from '../../../api/api';
import { setIsContentUpdate } from '../../../store/actions/contentUpdateSlicer';

interface IProps {
  task: IBoardTask;
}

const BoardTaskCard: React.FC<IProps> = ({ task }) => {
  const dispatch = useDispatch();
  const { lists } = React.useContext(BoardListsContext) as IBoardListsContext;

  const moveToList = useMemo(
    () =>
      lists
        .filter((item) => item.id !== task.listId)
        .map((item) => ({
          key: item.id as string,
          iconUrl: '',
          color: '',
          title: item.title ?? '',
        })),
    [lists, task]
  );

  const handleMoveTo = useCallback(
    async (option: ISelectorOption) => {
      const spanLabel1 = lists.find((item) => item.id === task.listId)?.title ?? '';
      await requests.put({
        query: { entity: 'taskMove' },
        body: {
          listId: task.listId ?? '',
          taskId: task.id ?? '',
          newListId: option.key,
          status: option.title,
          activity: {
            ...new History(
              activitiesGenerator({
                creator: 'You',
                contentDescription: 'the card',
                action: 'move',
                spanLabel1,
                spanLabel2: option.title,
                afterSpanLabel2: 'list',
              })
            ),
          } as IHistory,
        },
      });
      await requests.post({
        query: { entity: 'activities' },
        body: {
          ...new History(
            activitiesGenerator({
              creator: 'You',
              contentDescription: 'the task',
              action: 'move',
              strongLabel1: task.title,
              spanLabel1,
              spanLabel2: option.title,
              afterSpanLabel2: 'list',
            })
          ),
        },
      });
      dispatch(setIsContentUpdate({ isContentUpdate: true }));
    },
    [lists, task, dispatch]
  );

  return (
    <BoardTaskCardItem>
      <BoardTaskCardTitle>
        <span>{task.title}</span>
        <BoardTaskCardMenuWrapper>
          <ThreeDotsMenu
            menus={['edit', 'delete']}
            listId={task.listId}
            taskId={task.id}
          />
        </BoardTaskCardMenuWrapper>
      </BoardTaskCardTitle>
      <BoardTaskCardDescription>{task.description}</BoardTaskCardDescription>
      <BoardTaskCardDueDate>{task.dueDate}</BoardTaskCardDueDate>
      <BoardTaskCardPriority>{task.priority as string}</BoardTaskCardPriority>
      {moveToList.length > 0 && (
        <BoardTaskCardMoveTo>
          <Selector
            options={moveToList}
            defaultTitle=""
            staticTitle="Move to"
            getSelectedOption={handleMoveTo}
            containerWidth="100%"
          />
        </BoardTaskCardMoveTo>
      )}
    </BoardTaskCardItem>
  );
};

export default BoardTaskCard;

const BoardTaskCardItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  background: #fff;
  border: 2px solid rgba(var(--main-dark-rgb), 0.5);
  border-radius: 8px;
`;

const BoardTaskCardTitle = styled.h5`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 4px;
  font-size: 14px;
  line-height: 16px;
`;

const BoardTaskCardMenuWrapper = styled.div`
  width: 16px;
  height: 32px;
`;
const BoardTaskCardDescription = styled.p`
  padding: 8px 4px;
  font-size: 12px;
  line-height: 16px;
`;
const BoardTaskCardDueDate = styled.div`
  position: relative;
  padding: 8px 4px 8px 28px;
  font-size: 14px;
  line-height: 18px;

  &::before {
    content: '';
    position: absolute;
    inset: 50% auto auto 2px;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background-image: url(${calendarIconUrl});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
`;

const BoardTaskCardPriority = styled.div`
  position: relative;
  margin-left: 4px;
  padding: 1px 4px 1px 16px;
  width: max-content;
  min-height: 20px;
  font-size: 14px;
  line-height: 18px;
  border-radius: 4px;
  background-color: rgba(var(--main-dark-rgb), 0.45);

  &::before {
    content: '';
    position: absolute;
    inset: 50% auto auto 4px;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: rgba(var(--main-dark-rgb), 0.75);
  }
`;

const BoardTaskCardMoveTo = styled.div`
  font-size: 14px;
  line-height: 16px;
`;
