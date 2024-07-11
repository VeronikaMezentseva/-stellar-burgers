import store from '../../src/services/store';
import { ingredientsSlice, initialState } from '../../src/slices/Ingredients-slice';

describe('Root reducer init', () => {
  test('return state correctly', () => {
    const storeState = store.getState();
    expect(storeState[ingredientsSlice.name]).toEqual(initialState);
  });
});
