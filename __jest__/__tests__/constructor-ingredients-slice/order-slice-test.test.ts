import { gerOrderByNumber, orderReducer, initialState as initialOrderState } from '../../../src/slices/order-slice';

describe('order slice', () => {
  test('get order by number pending', () => {
    const result = orderReducer(initialOrderState, {type: gerOrderByNumber.pending.type});
    expect(result.isLoading).toBe(true);
  });
  test('get order by number fulfilled', () => {
    const testPayload = {
      orders: [
        {
          _id: 'string',
          status: 'string',
          name: 'string',
          createdAt: 'string',
          updatedAt: 'string',
          number: 5,
          ingredients: ['1','2','3']
        }
      ]
    }
    const result = orderReducer(initialOrderState, {type: gerOrderByNumber.fulfilled.type, payload: testPayload});
    expect(result.isLoading).toBe(false);
    expect(result.orderData).toEqual(testPayload.orders[0]);
  })
})