import React from 'react';

import styled from 'styled-components';
import ModalTitle from './components/ModalsTitle';
import { Action, ID } from '../../types/common';
import ListEditor from '../dataEditors/ListEditor';
import CardEditor from '../dataEditors/CardEditor';

interface IEditorContentsProps {
  listId?: ID;
  taskId?: ID;
  action?: Action;
}
type IEditorContents = {
  [key: string]: (props?: IEditorContentsProps) => React.ReactNode;
};

const editorContents: IEditorContents = {
  list: (props) => <ListEditor {...props} />,
  task: (props) => <CardEditor {...props} />,
};

interface IProps {
  action?: Action;
  boardEntity?: keyof typeof editorContents | null;
  listId?: ID;
  taskId?: ID;
}

const DataEditor: React.FC<IProps> = ({ action, boardEntity, listId, taskId }) => {
  return (
    <EditorWrapper>
      <ModalTitle />
      {editorContents[boardEntity as keyof typeof editorContents]({ action: action, listId, taskId })}
    </EditorWrapper>
  );
};

export default DataEditor;

const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 85%;
  min-width: 320px;
  min-height: 200px;
  border-radius: 20px;
  background-color: rgba(224, 224, 224, 1);
  overflow: hidden;
`;
