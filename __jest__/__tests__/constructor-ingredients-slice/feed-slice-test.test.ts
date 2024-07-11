import { configureStore } from "@reduxjs/toolkit";
import { feedReducer, getFeedThunk } from '../../../src/slices/feed-slice';

describe('feed async test', () => {
  test('get feed', async () => {
    const initialState = {
      orders: [],
      total: 0,
      totalToday: 0
    }
    const payload = {
      orders: [
        {
          _id: 'string',
          status: 'string',
          name: 'string',
          createdAt: 'string',
          updatedAt: 'string',
          number: 1,
          ingredients: ['1', '2']
        },
        {
          _id: 'string',
          status: 'string',
          name: 'string',
          createdAt: 'string',
          updatedAt: 'string',
          number: 2,
          ingredients: ['1', '2']
        }
      ],
      total: 20,
      totalToday: 5
    };
    const result = feedReducer(initialState, {type: getFeedThunk.fulfilled.type, payload: payload});
    const { orders, total, totalToday } = result;
    
    expect(payload.orders).toEqual(orders);
    expect(payload.total).toBe(total);
    expect(payload.totalToday).toBe(totalToday);
  });
});
