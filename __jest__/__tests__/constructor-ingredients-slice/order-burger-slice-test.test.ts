import {
  cleanConstructor,
  cleanOrderData,
  initialState as initialOrderBurgerState,
  orderBurgerReducer,
  orderBurgerThunk
} from '../../../src/slices/order-burger-slice';

describe('order burger', () => {
  const testData = {
    orderData: [
      {
        _id: 'string',
        status: 'string',
        name: 'string',
        createdAt: 'string',
        updatedAt: 'string',
        number: 5,
        ingredients: ['1', '2', '3']
      },
      {
        _id: 'string',
        status: 'string',
        name: 'string',
        createdAt: 'string',
        updatedAt: 'string',
        number: 10,
        ingredients: ['1', '2', '3', '4']
      }
    ],
    orderRequest: false,
    ingredients: ['1', '2', '3']
  };

  test('clean order data', () => {
    const result = orderBurgerReducer(testData, { type: cleanOrderData.type });
    expect(result.orderData).toBe(null);
  });

  test('clean constructor', () => {
    const result = orderBurgerReducer(testData, {
      type: cleanConstructor.type
    });
    expect(result.ingredients).toEqual([]);
  });

  test('order request pending', () => {
    const result = orderBurgerReducer(testData, {
      type: orderBurgerThunk.pending.type
    });
    expect(result.orderRequest).toBe(true);
  });

  test('order request fulfilled', () => {
    const payloadResponse = {
      order: testData.orderData[0],
      name: 'string'
    };
    const result = orderBurgerReducer(initialOrderBurgerState, {
      type: orderBurgerThunk.fulfilled.type,
      payload: payloadResponse
    });
    expect(result.ingredients).toEqual(testData.ingredients);
    expect(result.orderData).toEqual(testData.orderData[0]);
    expect(result.orderRequest).toEqual(false);
  });
});
