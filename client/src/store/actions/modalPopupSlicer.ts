import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import modalPopups from '../../components/modals/modalPopups';
import { Action, Entity, ID } from '../../types/common';

export interface IModalPopup {
  isModalOpen: boolean;
  contentKey: keyof typeof modalPopups | null;
  action?: Action | undefined;
  boardEntity?: Entity;
  listId?: ID;
  taskId?: ID;
}

const initialState: { modalPopup: IModalPopup } = {
  modalPopup: {
    isModalOpen: false,
    contentKey: null,
    action: undefined,
    boardEntity: null,
    listId: '',
    taskId: '',
  },
};

const modalPopupSlicer = createSlice({
  name: 'modalPopup',
  initialState,
  reducers: {
    setModalConfig: (state, action: PayloadAction<IModalPopup>) => {
      state.modalPopup.isModalOpen = action.payload.isModalOpen;
      state.modalPopup.contentKey = action.payload.contentKey;
      state.modalPopup.action = action.payload.action;
      state.modalPopup.boardEntity = action.payload.boardEntity;
      state.modalPopup.listId = action.payload.listId;
      state.modalPopup.taskId = action.payload.taskId;
    },
    setIsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.modalPopup = {
        ...state.modalPopup,
        isModalOpen: action.payload,
      };
    },
    resetModalConfig: (state) => {
      state.modalPopup = initialState.modalPopup;
    },
  },
});

export const { setModalConfig, setIsModalOpen, resetModalConfig } = modalPopupSlicer.actions;

export default modalPopupSlicer.reducer;
