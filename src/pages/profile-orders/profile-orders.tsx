import { FC, useEffect } from 'react';
import { ProfileOrdersUI } from '@ui-pages';
import {
  getUserOrdersThunk,
  selectUserOrders
} from '../../slices/user-orders-slice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrdersThunk());
  }, []);

  const orders = useSelector(selectUserOrders);

  return <ProfileOrdersUI orders={orders} />;
};
