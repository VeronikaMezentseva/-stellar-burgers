import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { selectUserData } from '../../slices/user-slice';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const userData = useSelector(selectUserData);
  return <AppHeaderUI userName={userData?.name} />;
};
