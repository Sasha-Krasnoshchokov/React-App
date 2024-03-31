import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useCallback, useEffect, useState } from 'react';
import { List } from '../models/List';
import { resetModalConfig } from '../store/actions/modalPopupSlicer';
import { History } from '../models/History';
import activitiesGenerator from '../helpers/activitiesGenerator';

import editIconUrl from '../assets/editor.svg';
import deleteIconUrl from '../assets/delete.svg';
import requests, { TMethod } from '../api/api';
import { IBoardList } from '../types/boards';
import { IHistory } from '../types/common';
import { setIsContentUpdate } from '../store/actions/contentUpdateSlicer';

const useListEditor = () => {
  const dispatch = useDispatch();
  const { listId, action } = useSelector((state: RootState) => state.modalPopup.modalPopup);

  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const [currentList, setCurrentList] = useState<IBoardList | null>(null);

  const getListById = useCallback(async () => {
    const response = await requests.get({
      entity: 'lists',
      listId: listId ?? '',
    });
    setCurrentList(response?.data?.data ?? []);
  }, [listId]);

  const updateServer = useCallback(
    async (method: TMethod, body?: IBoardList | IHistory, entity?: 'activities') => {
      await requests[method]({
        query: { entity: entity ?? 'lists', listId: listId ?? '' },
        body,
      });
    },
    [listId]
  );

  const handleEditorAction = useCallback(async () => {
    if (
      action === 'edit' &&
      (!newTitle || newTitle === currentList?.title) &&
      (!newDescription || newDescription === currentList?.description)
    ) {
      setIsEdit(!isEdit);
      return;
    }
    let newList: IBoardList | null = null;
    let strongLabel1 = '';
    let strongLabel2 = '';
    let contentDescription = 'the list label';
    switch (action) {
      case 'delete':
        strongLabel1 = currentList?.title ?? '';
        contentDescription = 'the list';
        await updateServer('delete');
        break;
      case 'edit':
        strongLabel1 = currentList?.title ?? '';
        strongLabel2 = newTitle;
        newDescription &&
          newDescription !== currentList?.description &&
          (contentDescription = 'the description of the list');
        newTitle && newTitle !== currentList?.title && (contentDescription = 'the label of the list from');
        newList = {
          ...currentList,
          title: newTitle || currentList?.title || '',
          description: newDescription || currentList?.description || '',
        };
        await updateServer('put', newList);
        break;
      case 'create':
        contentDescription = 'list';
        strongLabel1 = newTitle;
        newList = { ...new List(newTitle, newDescription) };
        await updateServer('post', newList);
        break;
      default:
        console.error('Unknown action', action);
    }
    const newActivity = {
      ...new History(
        activitiesGenerator({
          creator: 'You',
          contentDescription,
          action,
          strongLabel1,
          strongLabel2,
        })
      ),
    };
    await updateServer('post', newActivity, 'activities');
    dispatch(resetModalConfig());
    dispatch(setIsContentUpdate({ isContentUpdate: true }));
  }, [action, currentList, dispatch, isEdit, newDescription, newTitle, updateServer]);

  useEffect(() => {
    setIsEdit(action === 'create');
    if (listId) {
      getListById();
    }
  }, [action, listId, getListById]);

  return {
    isEdit,
    newTitle,
    currentList,
    newDescription,
    actionIconUrl: action === 'delete' ? deleteIconUrl : editIconUrl,
    setNewTitle,
    setNewDescription,
    handleEditorAction,
  };
};

export default useListEditor;
