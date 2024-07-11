import { getUserOrdersThunk, initialState as initialUserOrdersState, userOrdersReducer } from "../../../src/slices/user-orders-slice";

describe('user order slice', () => {
  test('get user orders fulfilled', () => {
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
    const result = userOrdersReducer(initialUserOrdersState, {type: getUserOrdersThunk.fulfilled.type, payload: testPayload.orders});
    expect(result.orders).toEqual(testPayload.orders);
  });
});