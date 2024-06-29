import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from '../slices/Ingredients-slice';
import { constructorIngredientsSlice } from '../slices/constructorIngredients-slice';
import { userSlice } from '../slices/user-slice';
import { orderBurgerSlice } from '../slices/order-burger-slice';
import { feedSlice } from '../slices/feed-slice';
import { orderSlice } from '../slices/order-slice';
import { userOrdersSlice } from '../slices/user-orders-slice';

const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [constructorIngredientsSlice.name]: constructorIngredientsSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [orderBurgerSlice.name]: orderBurgerSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [userOrdersSlice.name]: userOrdersSlice.reducer
});
// Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
