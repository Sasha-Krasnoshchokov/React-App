import React, { useCallback, useEffect, useState } from 'react';

import ModalTitle from './components/ModalsTitle';
import {
  HistoryList,
  HistoryListItem,
  HistoryListItemDate,
  HistoryListItemPoint,
  HistoryListItemText,
  HistoryPopupWrapper,
} from './styling';
import { IHistory } from '../../types/common';
import requests from '../../api/api';

export const Activities: React.FC<{ list: IHistory[] }> = ({ list }) => (
  <HistoryList>
    {[...list].reverse().map((item) => (
      <React.Fragment key={item.id}>
        <HistoryListItem>
          <HistoryListItemPoint />
          <HistoryListItemText dangerouslySetInnerHTML={{ __html: item.description }} />
          <HistoryListItemDate>{item.date}</HistoryListItemDate>
        </HistoryListItem>
      </React.Fragment>
    ))}
  </HistoryList>
);

interface IProps {}

const HistoryPopup: React.FC<IProps> = () => {
  const { get } = requests;

  const [activities, setActivities] = useState<IHistory[]>([]);

  const getData = useCallback(async () => {
    const response = await get({ entity: 'activities' });
    setActivities(response?.data?.data || []);
  }, [get]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <HistoryPopupWrapper>
      <ModalTitle title="History" />
      <HistoryList>
        <Activities list={activities} />
      </HistoryList>
    </HistoryPopupWrapper>
  );
};

export default HistoryPopup;
