import {combineReducers, createStore} from "redux";
import {persistReducer, persistStore, Storage} from "redux-persist";
import {MMKV} from "react-native-mmkv";
import Config from "../config";
import UserReducer from "./slices/UserSlice";

const storage = new MMKV();

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key) => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: Config.STORE_NAME,
  storage: reduxStorage,
};

const rootReducers = combineReducers({
  user: UserReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = createStore(persistedReducer);

export const persistor = persistStore(store);

export default store;

export type IRootState = ReturnType<typeof store.getState>;

export type IAppDispatch = typeof store.dispatch;
