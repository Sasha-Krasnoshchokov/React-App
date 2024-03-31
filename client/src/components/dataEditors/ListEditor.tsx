import React from 'react';

import styled from 'styled-components';

import { Action, ID } from '../../types/common';
import capitalize from '../../helpers/capitalize';
import useListEditor from '../../hooks/useListEditor';
import { EditorAction, EditorDescription, EditorTitle, EditorTitleWrapper } from './styling';

interface IProps {
  listId?: ID;
  action?: Action;
}

const ListEditor: React.FC<IProps> = ({ action }) => {
  const { isEdit, newTitle, currentList, actionIconUrl, setNewTitle, setNewDescription, handleEditorAction } =
    useListEditor();

  return (
    <ListEditorWrapper role="form">
      <EditorTitleWrapper>
        <EditorTitle>
          {isEdit ? (
            <input
              autoFocus
              tabIndex={1}
              placeholder="Add title"
              defaultValue={currentList?.title}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          ) : (
            <span>{currentList?.title ?? ''}</span>
          )}
        </EditorTitle>
        <EditorAction
          type="button"
          tabIndex={3}
          $isEdit={isEdit}
          $iconUrl={actionIconUrl}
          $isDisabled={!newTitle && !currentList?.title}
          onClick={handleEditorAction}
        >
          {`${isEdit ? 'Save' : capitalize(action || '')} list`}
        </EditorAction>
      </EditorTitleWrapper>
      {action !== 'delete' && (
        <EditorDescription>
          Description
          {isEdit ? (
            <textarea
              rows={1}
              tabIndex={2}
              placeholder="Add description"
              defaultValue={currentList?.description}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          ) : (
            <span>{currentList?.description ?? ''}</span>
          )}
        </EditorDescription>
      )}
    </ListEditorWrapper>
  );
};

export default ListEditor;

const ListEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100%;
  padding: 0 20px 20px 20px;
`;
