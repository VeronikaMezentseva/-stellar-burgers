import { authCheck, clearErrors, getUserThunk, initialState as initialUserState, loginUserThunk, logoutUserThunk, registerUserThunk, updateUserDataThunk, userReducer } from "../../../src/slices/user-slice"

const localStorageMock: Storage = {
  clear: jest.fn(),
  getItem: jest.fn(),
  key: jest.fn(),
  removeItem: jest.fn(),
  setItem: jest.fn(),
  length: 0, 
};

jest.mock('../../../src/utils/cookie', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn(),
}));

describe('user slice', () => {
  beforeAll(() => {
    global.localStorage = localStorageMock;
  });

  afterAll(() => {
    localStorage.clear();
    global.localStorage = localStorage;
  });

  test('user reducer auth check', () => {
    const result = userReducer(initialUserState, {type: authCheck.type});
    expect(result.isAuthChecked).toBe(true);
  });

  test('user reducer clear errors', () => {
    const testInitialState = {
      isAuthChecked: false,
      isAuthenticated: false,
      isLoading: false,
      data: null,
      loginUserError: 'ERROR!',
      loginUserRequest: false,
      registerUserError: 'ERROR!'
    }
    const result = userReducer(testInitialState, {type: clearErrors.type});
    expect(result.loginUserError).toBe('');
    expect(result.registerUserError).toBe('');
  })

  test('login user pending', () => {
    const result = userReducer(initialUserState, {type: loginUserThunk.pending.type});
    const { loginUserRequest, isLoading, loginUserError } = result;
    expect(loginUserError).toBe('');
    expect(isLoading).toBe(true);
    expect(loginUserRequest).toBe(true);
  });

  test('login user rejected', () => {
    const testErrorMessage = 'Error during login';
    const result = userReducer(initialUserState, {type: loginUserThunk.rejected.type, error: {message: testErrorMessage}});
    const { loginUserRequest, isAuthChecked, loginUserError } = result;
    expect(loginUserRequest).toBe(false);
    expect(loginUserError).toEqual(testErrorMessage);
    expect(isAuthChecked).toBe(true);
  });

  test('login user fulfilled', () => {
    const testPayload = {
      email: 'string',
      name: 'string'
    };
    const result = userReducer(initialUserState, {type: loginUserThunk.fulfilled.type, payload: testPayload});
    const { isLoading, loginUserRequest, isAuthChecked, data, isAuthenticated, loginUserError } = result;
    expect(isLoading).toBe(false);
    expect(loginUserRequest).toBe(false);
    expect(isAuthChecked).toBe(true);
    expect(data).toEqual(testPayload);
    expect(isAuthChecked).toBe(true);
    expect(loginUserError).toBe('');
  });

  test('register user pending', () => {
    const result = userReducer(initialUserState, {type: registerUserThunk.pending.type});
    expect(result.isLoading).toBe(true);
  });

  test('register user rejected', () => {
    const result = userReducer(initialUserState, {type: registerUserThunk.rejected.type});
    expect(result.registerUserError).toBe('Ошибка регистрации');
    expect(result.data).toBe(null);
  });

  test('register user fulfilled', () => {
    const testPayload = {
      user: {
        email: 'string',
        name: 'string'
      }
    };
    const result = userReducer(initialUserState, {type: registerUserThunk.fulfilled.type, payload: testPayload});
    expect(result.isLoading).toBe(false);
    expect(result.data).toEqual(testPayload.user);
    expect(result.registerUserError).toBe('');
  });

  test('get user fulfilled', () => {
    const testPayload = {
      user: {
        email: 'string',
        name: 'string'
      }
    };
    const result = userReducer(initialUserState, {type: getUserThunk.fulfilled.type, payload: testPayload});
    const { data, isLoading, loginUserRequest, isAuthChecked, isAuthenticated } = result;
    expect(data).toEqual(testPayload.user);
    expect(isLoading).toBe(false);
    expect(loginUserRequest).toBe(false);
    expect(isAuthChecked).toBe(true);
    expect(isAuthenticated).toBe(true);
  });

  test('logout user fulfilled', () => {
    const result = userReducer(initialUserState, {type: logoutUserThunk.fulfilled.type});
    expect(result.data).toBe(null);
    expect(result.isAuthenticated).toBe(false);
  });

  test('update user data pending', () => {
    const result = userReducer(initialUserState, {type: updateUserDataThunk.pending.type});
    expect(result.isLoading).toBe(true);
  });

  test('update user data fulfilled', () => {
    
    const testPayload = {
      user: {
        email: 'string',
        name: 'string'
      }
    };
    const result = userReducer(initialUserState, {type: updateUserDataThunk.fulfilled.type, payload: testPayload});
    expect(result.data.user).toEqual(testPayload.user);
  });
});