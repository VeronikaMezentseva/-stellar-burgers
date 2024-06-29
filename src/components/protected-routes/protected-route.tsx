import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { useSelector } from '../../services/store';
import {
  selectIsAuthChecked,
  selectUserAuthenticated
} from '../../slices/user-slice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactNode;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth,
  children
}) => {
  const userAuthenticated = useSelector(selectUserAuthenticated);
  const userAuthChecked = useSelector(selectIsAuthChecked);
  const location = useLocation();
  if (!userAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !userAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && userAuthenticated) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
