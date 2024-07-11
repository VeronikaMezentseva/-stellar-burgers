import { fetchIngredients, ingredientsReducer, initialState as initialStateIngredients } from "../../../src/slices/ingredients-slice";

describe('ingredients slice', () => {
  test('is loading while pending', () => {
    const resultLoading = ingredientsReducer(initialStateIngredients, {type: fetchIngredients.pending.type });
    expect(resultLoading.isLoading).toBe(true);
    const resultLoaded = ingredientsReducer(initialStateIngredients, {type: fetchIngredients.fulfilled.type });
    expect(resultLoaded.isLoading).toBe(false);
  });

  test('get ingredients', () => {
    const newState = [
      {
        "_id": "643d69a5c3f7b9001cfa0941",
        "name": "Биокотлета из марсианской Магнолии",
        "type": "main",
        "proteins": 420,
        "fat": 142,
        "carbohydrates": 242,
        "calories": 4242,
        "price": 424,
        "image": "https://code.s3.yandex.net/react/code/meat-01.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
        "__v": 0
      },
      {
        "_id": "643d69a5c3f7b9001cfa093e",
        "name": "Филе Люминесцентного тетраодонтимформа",
        "type": "main",
        "proteins": 44,
        "fat": 26,
        "carbohydrates": 85,
        "calories": 643,
        "price": 988,
        "image": "https://code.s3.yandex.net/react/code/meat-03.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
        "__v": 0
      }
    ];
    const result = ingredientsReducer(initialStateIngredients, {type: fetchIngredients.fulfilled.type, payload: newState});
    expect(result.ingredients).toEqual(newState);
  });
});