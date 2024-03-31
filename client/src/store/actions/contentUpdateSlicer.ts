import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IContentUpdate {
  isContentUpdate: boolean;
}

const initialState: IContentUpdate = {
  isContentUpdate: true,
};

const contentUpdateSlicer = createSlice({
  name: 'contentUpdate',
  initialState,
  reducers: {
    setIsContentUpdate: (state, action: PayloadAction<IContentUpdate>) => {
      state.isContentUpdate = action.payload.isContentUpdate;
    },
  },
});

export const { setIsContentUpdate } = contentUpdateSlicer.actions;

export default contentUpdateSlicer.reducer;
