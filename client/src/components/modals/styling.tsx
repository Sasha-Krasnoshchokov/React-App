import styled from 'styled-components';

import dotInOrder from '../../assets/dot-in-border.svg';

export const HistoryPopupWrapper = styled.div`
  position: absolute;
  inset: 0 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 320px;
  background-color: rgba(224, 224, 224, 1);
`;

export const HistoryList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 12px;
  overflow: hidden auto;
`;

export const HistoryListItem = styled.li`
  list-style: none;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  margin: 0 0 12px 0;
  width: 100%;
  padding: 0 0 0 12px;
`;

export const HistoryListItemPoint = styled.div`
  position: absolute;
  inset: 8px auto auto 2px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(var(--main-dark-rgb), 0.7);
`;

export const HistoryListItemText = styled.p`
  margin: 0 0 6px 0;
  font-size: 14px;
  line-height: 18px;
  color: rgba(var(--main-dark-rgb), 0.7);

  & strong {
    position: relative;
    padding: 0 0 0 20px;
    font-weight: 600;
    color: rgb(var(--main-dark-rgb));

    &::before {
      content: '';
      position: absolute;
      inset: 2px auto auto 4px;
      width: 14px;
      height: 14px;
      background-image: url(${dotInOrder});
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }
  }

  & span {
    font-weight: 600;
  }
`;

export const HistoryListItemDate = styled.span`
  font-size: 11px;
  line-height: 14px;
  font-weight: 600;
  color: rgba(var(--main-dark-rgb), 0.5);
  font-style: italic;
`;
