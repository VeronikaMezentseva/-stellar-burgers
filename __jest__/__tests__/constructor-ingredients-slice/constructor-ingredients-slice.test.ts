import {
  constructorIngredientsReducer,
  addIngredient,
  constructorIngredientsSlice,
  TIngredientsState,
  initialState as constructorInitialState,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient
} from '../../../src/slices/constructor-ingredients-slice';
import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../../src/utils/types';

const ingredientBun = {
  calories: 420,
  carbohydrates: 53,
  fat: 24,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  name: 'Краторная булка N-200i',
  price: 1255,
  proteins: 80,
  type: 'bun',
  __v: 0,
  _id: '643d69a5c3f7b9001cfa094c'
};

const ingredientSauce = {
  calories: 420,
  carbohydrates: 53,
  fat: 24,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  name: 'Краторная булка N-200i',
  price: 1255,
  proteins: 80,
  type: 'sauce',
  __v: 0,
  _id: '643d69a5c3f7b9001cfa094c'
};

// Используем частичное type assertion, чтобы указать только нужные свойства
const payload: TConstructorIngredient = {
  ...ingredientBun, // Сначала копируем все свойства
  id: '555' //  Добавляем id
};

const action: PayloadAction<TConstructorIngredient> = {
  type: constructorIngredientsSlice.actions.addIngredient.type,
  payload: payload
};

const payloadSauce: TConstructorIngredient = {
  ...ingredientSauce, // Сначала копируем все свойства
  id: '555' //  Добавляем id
};

const actionSauce: PayloadAction<TConstructorIngredient> = {
  type: constructorIngredientsSlice.actions.addIngredient.type,
  payload: payloadSauce
};

describe('constructor-ingredient-slice', () => {
  test('add bun ingredient', () => {
    const result = constructorIngredientsReducer(
      constructorInitialState,
      action
    );

    const { bun, addedIngredients } = result;

    expect(addedIngredients).toEqual([]);
    expect(bun.bunDetails).toEqual({ ...ingredientBun, id: '555' });
  });

  test('add sauce ingredient', () => {
    const result = constructorIngredientsReducer(
      constructorInitialState,
      actionSauce
    );

    const { bun, addedIngredients } = result;

    expect(bun.bunDetails).toEqual(null);
    expect(addedIngredients).toEqual([{ ...ingredientSauce, id: '555' }]);
  });

  test('remove ingredient', () => {
    const initialState = {
      addedIngredients: [
        {
          calories: 420,
          carbohydrates: 53,
          fat: 24,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          name: 'Краторная булка N-200i',
          price: 1255,
          proteins: 80,
          type: 'bun',
          __v: 0,
          _id: '643d69a5c3f7b9001cfa093c',
          id: '1'
        }
      ],
      bun: {
        _id: '',
        bunDetails: null
      }
    };
    const result = constructorIngredientsReducer(
      initialState,
      removeIngredient(initialState.addedIngredients[0])
    );
    expect(result.addedIngredients).toEqual([]);
  });

  test('move ingredient', () => {
    const initialState = {
      addedIngredients: [
        {
          calories: 420,
          carbohydrates: 53,
          fat: 24,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          name: 'Краторная булка N-200i',
          price: 1255,
          proteins: 80,
          type: 'bun',
          __v: 0,
          _id: '643d69a5c3f7b9001cfa093c',
          id: '1'
        },
        {
          calories: 420,
          carbohydrates: 53,
          fat: 24,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          name: 'Краторная булка N-200i',
          price: 1255,
          proteins: 80,
          type: 'bun',
          __v: 0,
          _id: '643d69a5c3f7b9001cfa094c',
          id: '2'
        }
      ],
      bun: {
        _id: '',
        bunDetails: null
      }
    };

    const resultMoveUp = constructorIngredientsReducer(
      initialState,
      moveUpIngredient(initialState.addedIngredients[1])
    );
    expect(resultMoveUp.addedIngredients[0].id).toBe('2');
    const resultMoveDown = constructorIngredientsReducer(
      initialState,
      moveDownIngredient(initialState.addedIngredients[0])
    );
    expect(resultMoveDown.addedIngredients[0].id).toBe('2');
  });
});

// {
//   calories: 420,
//   carbohydrates:53,
//   fat: 24,
//   image: "https://code.s3.yandex.net/react/code/bun-02.png",
//   image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
//   image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
//   name: "Краторная булка N-200i",
//   price: 1255,
//   proteins: 80,
//   type: "bun",
//   __v: 0,
//   _id: "643d69a5c3f7b9001cfa093c",
//   id: '1'
// },
// {
//   calories: 420,
//   carbohydrates:53,
//   fat: 24,
//   image: "https://code.s3.yandex.net/react/code/bun-01.png",
//   image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
//   image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
//   name: "Краторная булка N-200i",
//   price: 1255,
//   proteins: 80,
//   type: "bun",
//   __v: 0,
//   _id: "643d69a5c3f7b9001cfa094c",
//   id: '2'
// }
