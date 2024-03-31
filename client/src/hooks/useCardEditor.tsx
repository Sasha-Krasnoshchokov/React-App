import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IHistory, ISelectorOption } from '../types/common';

import { resetModalConfig } from '../store/actions/modalPopupSlicer';
import { History } from '../models/History';
import activitiesGenerator from '../helpers/activitiesGenerator';

import editIconUrl from '../assets/editor.svg';
import deleteIconUrl from '../assets/delete.svg';
import { Task } from '../models/Task';
import priorities from '../data/priorities';
import { IBoardList, IBoardTask } from '../types/boards';
import requests, { TMethod } from '../api/api';
import { setIsContentUpdate } from '../store/actions/contentUpdateSlicer';

const useCardEditor = () => {
  const dispatch = useDispatch();
  const { listId, taskId, action } = useSelector((state: RootState) => state.modalPopup.modalPopup);

  const [isEdit, setIsEdit] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newPriority, setNewPriority] = useState('');
  const [currentList, setCurrentList] = useState<IBoardList | null>(null);

  const currentTask = useMemo(
    () => (currentList?.tasks ?? []).find((item) => item.id === taskId),
    [currentList, taskId]
  );

  const getListById = useCallback(async () => {
    const response = await requests.get({
      entity: 'lists',
      listId: listId ?? '',
    });
    setCurrentList(response?.data?.data ?? null);
  }, [listId]);

  const status = useMemo(() => {
    if (!currentList) return 'New';
    return currentList?.title ?? '';
  }, [currentList]);

  const createActivities = useCallback(() => {
    const activities: {
      title: null | IHistory;
      dueData: null | IHistory;
      priority: null | IHistory;
      description: null | IHistory;
    } = {
      title: null,
      dueData: null,
      priority: null,
      description: null,
    };
    if (newTitle && (!activities.title || (activities.title && !activities.title.description.includes(newTitle)))) {
      activities.title = {
        ...new History(
          activitiesGenerator({
            creator: 'You',
            contentDescription: 'a title of this task from',
            action,
            strongLabel1: currentTask?.title ?? '',
            strongLabel2: newTitle,
          })
        ),
      };
    }
    if (
      newDescription &&
      (!activities.description ||
        (activities.description && !activities.description.description.includes(newDescription)))
    ) {
      activities.description = {
        ...new History(
          activitiesGenerator({
            creator: 'You',
            contentDescription: 'a description of this task',
            action,
          })
        ),
      };
    }
    if (
      newDueDate &&
      (!activities.dueData || (activities.dueData && !activities.dueData.description.includes(newDueDate)))
    ) {
      activities.dueData = {
        ...new History(
          activitiesGenerator({
            creator: 'You',
            contentDescription: 'a due date of this task',
            action,
            spanLabel1: currentTask?.dueDate ?? '',
            spanLabel2: newDueDate,
          })
        ),
      };
    }
    if (
      newPriority &&
      (!activities.priority || (activities.priority && !activities.priority.description.includes(newPriority)))
    ) {
      activities.priority = {
        ...new History(
          activitiesGenerator({
            creator: 'You',
            contentDescription: 'a priority of this task',
            action,
            spanLabel1: (currentTask?.priority ?? '') as string,
            spanLabel2: newPriority,
          })
        ),
      };
    }
    return activities;
  }, [newTitle, newDueDate, newPriority, newDescription, currentTask, action]);

  const updateServer = useCallback(
    async (method: TMethod, body?: IBoardTask | IHistory, entity?: 'activities') => {
      await requests[method]({
        query:
          method === 'delete' ? { entity: entity ?? 'tasks', taskId: taskId ?? '' } : { entity: entity ?? 'tasks' },
        body,
      });
    },
    [taskId]
  );

  const handleEditorAction = useCallback(async () => {
    const newActivities = createActivities();
    if (
      action === 'edit' &&
      (!newTitle || newTitle === currentTask?.title) &&
      (!newDueDate || newDueDate === currentTask?.dueDate) &&
      (!newPriority || newPriority === currentTask?.priority) &&
      (!newDescription || newDescription === currentTask?.description)
    ) {
      setIsEdit(!isEdit);
      return;
    }
    let strongLabel1 = '';
    let spanLabel1 = '';
    let contentDescription = 'task';
    let spanLabel2 = currentList?.title ?? '';
    let newTask: IBoardTask | null = null;
    switch (action) {
      case 'delete':
        strongLabel1 = currentTask?.title ?? '';
        spanLabel1 = currentList?.title ?? '';
        spanLabel2 = '';
        await updateServer('delete');
        break;
      case 'edit':
        strongLabel1 = (newTitle || currentTask?.title) ?? '';
        contentDescription = 'the fields of the task';
        if (!currentTask) return;
        newTask = {
          ...currentTask,
          title: newTitle || currentTask?.title || '',
          description: newDescription || currentTask?.description || '',
          dueDate: newDueDate || currentTask?.dueDate || '',
          priority: newPriority || currentTask?.priority || '',
          activities: [
            ...(currentTask?.activities || []),
            newActivities.title,
            newActivities.dueData,
            newActivities.priority,
            newActivities.description,
          ].filter((item: IHistory | null) => !!item) as IHistory[],
        };
        await updateServer('put', newTask);
        break;
      case 'addTask':
        strongLabel1 = newTitle;
        newTask = {
          ...new Task({
            title: newTitle,
            description: newDescription,
            listId: listId ?? '',
            status,
            dueDate: newDueDate,
            priority: newPriority || priorities[0].title,
            activity: {
              ...new History(
                activitiesGenerator({
                  creator: 'You',
                  contentDescription,
                  action: 'create',
                  strongLabel1,
                  spanLabel2: currentList?.title ?? '',
                })
              ),
            },
          }),
        };
        await updateServer('post', newTask);
        break;
      default:
        console.error('Unknown action', action);
    }
    const newActivity: IHistory = {
      ...new History(
        activitiesGenerator({
          creator: 'You',
          contentDescription,
          action,
          strongLabel1,
          spanLabel1,
          spanLabel2,
          afterSpanLabel2: 'list',
        })
      ),
    };
    await updateServer('post', newActivity, 'activities');
    dispatch(resetModalConfig());
    dispatch(setIsContentUpdate({ isContentUpdate: true }));
  }, [
    action,
    createActivities,
    currentList?.title,
    currentTask,
    dispatch,
    isEdit,
    listId,
    newDescription,
    newDueDate,
    newPriority,
    newTitle,
    status,
    updateServer,
  ]);

  const handleDate = (e: React.ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setNewDueDate(value);
  };

  const handlePriority = (option: ISelectorOption) => {
    setNewPriority(option.title);
  };

  useEffect(() => {
    setIsEdit(action === 'create' || action === 'addTask');
  }, [action]);

  useEffect(() => {
    if (listId) {
      getListById();
    }
  }, [getListById, listId]);

  return {
    isEdit,
    newTitle,
    currentTask,
    newDescription,
    actionIconUrl: action === 'delete' ? deleteIconUrl : editIconUrl,
    status,
    handleDate,
    setNewTitle,
    handlePriority,
    setNewDescription,
    handleEditorAction,
  };
};

export default useCardEditor;
