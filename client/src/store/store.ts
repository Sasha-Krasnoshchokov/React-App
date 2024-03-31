import { configureStore } from '@reduxjs/toolkit';

import modalPopupSlicer from './actions/modalPopupSlicer';
import contentUpdateSlicer from './actions/contentUpdateSlicer';

export const store = configureStore({
  reducer: {
    modalPopup: modalPopupSlicer,
    contentUpdate: contentUpdateSlicer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
