import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import roomReducer from "./reducers/room";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import storageSession from "redux-persist/lib/storage/session";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";

const rootPersistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["user", "room"],
};

const rootReducer = persistReducer(
  rootPersistConfig,
  combineReducers({
    user: userReducer,
    room: roomReducer,
  })
);

const store = configureStore({
  reducer: rootReducer,
});

const persistor = persistStore(store);
export { store, persistor };

export default store;
