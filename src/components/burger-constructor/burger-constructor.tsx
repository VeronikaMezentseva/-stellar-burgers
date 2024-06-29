import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  clearConstructor,
  selectAddedBunDetails,
  selectAddedIngredients
} from '../../slices/constructorIngredients-slice';
import {
  cleanConstructor,
  cleanOrderData,
  orderBurgerThunk,
  selectOrderData,
  selectOrderRequest
} from '../../slices/order-burger-slice';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { selectUserData } from '../../slices/user-slice';

type TconstructorItems = {
  bun: TBun | null;
  ingredients: TConstructorIngredient[];
};

type TBun = {
  price: number;
};

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const addedIngredients = useSelector(selectAddedIngredients);
  const addedBunDetails = useSelector(selectAddedBunDetails);
  const user = useSelector(selectUserData);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const constructorItems: TconstructorItems = {
    bun: addedBunDetails,
    ingredients: addedIngredients
  };

  const orderRequest = useSelector(selectOrderRequest);

  const orderModalData = useSelector(selectOrderData);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    const idIngredients = addedIngredients.map((ingredient) => ingredient._id);
    const bun = addedBunDetails?._id;
    if (bun) {
      idIngredients.push(bun, bun);
    }
    dispatch(orderBurgerThunk(idIngredients)).then(() => {
      dispatch(cleanConstructor());
      dispatch(clearConstructor());
    });
  };
  const closeOrderModal = () => {
    dispatch(cleanOrderData());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
