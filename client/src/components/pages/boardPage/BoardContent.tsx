import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import BoardList from './BoardList';
import requests from '../../../api/api';
import { IBoardList } from '../../../types/boards';
import { RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setIsContentUpdate } from '../../../store/actions/contentUpdateSlicer';

export interface IBoardListsContext {
  lists: IBoardList[];
}
export const BoardListsContext = React.createContext<IBoardListsContext | null>(null);

interface IProps {}
const BoardContent: React.FC<IProps> = () => {
  const dispatch = useDispatch();
  const { isContentUpdate } = useSelector((state: RootState) => state.contentUpdate);

  const [lists, setLists] = useState<IBoardList[]>([]);

  const getData = useCallback(async () => {
    const response = await requests.get({ entity: 'lists' });
    setLists(response?.data?.data ?? []);
    dispatch(setIsContentUpdate({ isContentUpdate: false }));
  }, [dispatch]);

  useEffect(() => {
    if (isContentUpdate) {
      getData();
    }
  }, [getData, isContentUpdate]);

  return (
    <BoardListsContext.Provider value={{ lists }}>
      <BoardContentWrapper>
        {lists.length > 0 ? (
          <BoardListsWrapper $columns={lists.length > 4 ? lists.length : 4}>
            {lists.map((item, ind) => (
              <React.Fragment key={`${item.title}-${ind}`}>
                <BoardList
                  column={ind + 1}
                  list={item}
                />
              </React.Fragment>
            ))}
          </BoardListsWrapper>
        ) : (
          <p className="empty-content">You have no lists yet</p>
        )}
      </BoardContentWrapper>
    </BoardListsContext.Provider>
  );
};

export default BoardContent;

const BoardContentWrapper = styled.section`
  width: 100%;
  height: 100%;

  & .empty-content {
    margin: 0 auto;
    width: max-content;
    padding: 12px;
    font-size: 24px;
    line-height: 36px;
  }
`;

const BoardListsWrapper = styled.ul<{ $columns?: number }>`
  width: 100%;
  height: calc(100% - 60px);
  overflow: auto hidden;
  ${({ $columns }) =>
    $columns
      ? `
        display: grid;
        grid-gap: 8px;
        grid-template-columns: repeat(${$columns}, 1fr);
      `
      : ''}
    @media (max-width: 540px) {
      height: calc(100% - 100px);
    }
`;
