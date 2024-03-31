import React from 'react';

import styled from 'styled-components';

import { Action, ID } from '../../types/common';
import capitalize from '../../helpers/capitalize';
import { EditorAction, EditorDescription, EditorTitle, EditorTitleWrapper } from './styling';
import useCardEditor from '../../hooks/useCardEditor';

import statusIconUrl from '../../assets/status.svg';
import calendarIconUrl from '../../assets/calendar.svg';
import priorityIconUrl from '../../assets/priority.svg';
import Selector from '../features/Selector';
import priorities from '../../data/priorities';
import { Activities } from '../modals/History';

interface IProps {
  listId?: ID;
  action?: Action;
}

const CardEditor: React.FC<IProps> = ({ action }) => {
  const {
    isEdit,
    currentTask,
    actionIconUrl,
    status,
    handleDate,
    setNewTitle,
    setNewDescription,
    handleEditorAction,
    handlePriority,
  } = useCardEditor();

  return (
    <CardEditorWrapper role="form">
      <CardContentWrapper>
        <EditorTitleWrapper>
          <EditorTitle>
            {isEdit ? (
              <input
                autoFocus
                tabIndex={1}
                placeholder="Add title"
                defaultValue={currentTask?.title || ''}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            ) : (
              <span>{currentTask?.title || ''}</span>
            )}
          </EditorTitle>
          <EditorAction
            type="button"
            tabIndex={3}
            $isEdit={isEdit}
            $iconUrl={actionIconUrl}
            $isDisabled={false}
            onClick={handleEditorAction}
          >
            {`${isEdit ? 'Save' : capitalize(action?.toLowerCase().replace('task', '') || '')} task`}
          </EditorAction>
        </EditorTitleWrapper>
        <CardInfoWrapper>
          <CardInfoRow>
            <CardInfoLabel $iconUrl={statusIconUrl}>Status</CardInfoLabel>
            <span>{capitalize(currentTask?.status ?? status ?? '')}</span>
          </CardInfoRow>
          <CardInfoRow>
            <CardInfoLabel $iconUrl={calendarIconUrl}>Due date</CardInfoLabel>
            {isEdit ? (
              <CardDatePicker
                type="date"
                defaultValue={currentTask?.dueDate ?? ''}
                onChange={handleDate}
              />
            ) : (
              <span>{currentTask?.dueDate ?? ''}</span>
            )}
          </CardInfoRow>
          <CardInfoRow>
            <CardInfoLabel $iconUrl={priorityIconUrl}>Priority</CardInfoLabel>
            {isEdit ? (
              <Selector
                options={priorities}
                defaultTitle={(currentTask?.priority ?? priorities[0].title ?? '') as string}
                getSelectedOption={handlePriority}
              />
            ) : (
              <span>{(currentTask?.priority ?? priorities[0].title ?? '') as string}</span>
            )}
          </CardInfoRow>
        </CardInfoWrapper>
        <EditorDescription>
          Description
          {isEdit ? (
            <textarea
              rows={1}
              tabIndex={4}
              placeholder="Add description"
              defaultValue={currentTask?.description}
              // value={(newDescription || currentTask?.description) ?? ''}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          ) : (
            <span>{currentTask?.description ?? ''}</span>
          )}
        </EditorDescription>
      </CardContentWrapper>
      <CardActivityWrapper>
        <CardActivitiesTitle>Activities</CardActivitiesTitle>
        {currentTask?.activities && <Activities list={currentTask.activities || []} />}
      </CardActivityWrapper>
    </CardEditorWrapper>
  );
};

export default CardEditor;

const CardEditorWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-grow: 1;
  row-gap: 20px;
  margin-top: -16px;
  width: 100%;

  @media (max-width: 720px) {
    flex-direction: column;
    max-height: 75vh;
    overflow: hidden auto;
  }
`;
const CardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
  width: 60%;
  padding: 20px;

  @media (max-width: 720px) {
    width: 100%;
  }
`;
const CardActivityWrapper = styled.div`
  position: absolute;
  inset: 0 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 40%;
  padding: 20px;
  background-color: rgb(var(--main-tooltip-bg-rgb));

  @media (max-width: 720px) {
    position: relative;
    width: 100%;
  }
`;
const CardInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  gap: 8px;
  width: 100%;
`;
const CardInfoRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 16px;
  line-height: 24px;
`;
const CardInfoLabel = styled.div<{ $iconUrl: string }>`
  position: relative;
  display: flex;
  align-items: center;
  width: 40%;
  padding: 4px 0 4px 32px;
  color: #1c274c;

  &::before {
    content: '';
    position: absolute;
    inset: 50% auto auto 0;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    background-image: url(${({ $iconUrl }) => $iconUrl});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
`;
const CardDatePicker = styled.input`
  border: none;
  outline: none;
  width: max-content;
  min-width: 100px;
  padding: 2px 6px;
  font-size: inherit;
  line-height: inherit;
  background: rgba(var(--main-tooltip-bg-rgb), 0.25);
`;
const CardActivitiesTitle = styled.h5`
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
`;
