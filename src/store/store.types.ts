import {
  type TypedUseSelectorHook,
  useSelector,
  useDispatch
} from 'react-redux';

import { type store } from '~/store/store';

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
