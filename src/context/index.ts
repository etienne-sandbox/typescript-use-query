import { createContext, createStore } from "./lib";

const store = createStore();

const NumContext = createContext(42);

const num1 = store.get(NumContext); // 42

store.set(NumContext, 7);

const num = store.get(NumContext); // 7

if (store.has(NumContext)) {
  console.log(`Store has a NumContext`);
}

// override older value
store.set(NumContext, 7444);

store.remove(NumContext);
