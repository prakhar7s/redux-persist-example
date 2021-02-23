import storage from "redux-persist/lib/storage";
// Error
// const storage = require("redux-persist/lib/storage");

const { combineReducers } = require("redux");

const { persistReducer } = require("redux-persist");

const {
  default: randomTaskReducer,
} = require("./random-task/random-task.reducer");

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["randomTasks"],
};

const rootReducer = combineReducers({
  randomTasks: randomTaskReducer,
});

export default persistReducer(persistConfig, rootReducer);
