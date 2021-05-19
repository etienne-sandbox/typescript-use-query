import { createContext, createStore } from "./lib";

type User = {
  age: number;
  name: string;
};

const StrContext = createContext("yolo");
const NumContext = createContext(42);
const UserContext = createContext<User | null>(null);

const store = createStore();

const num1 = store.get(NumContext); // 42
console.log({ num1 });

store.set(NumContext, 7);

const num2 = store.get(NumContext); // 7
console.log({ num2 });

if (store.has(NumContext)) {
  console.log(`Store has a NumContext`);
}

// override older value
store.set(NumContext, 7444);

store.remove(NumContext);

const str = store.get(StrContext);
console.log({ str });

store.set(StrContext, "Youpi");

const str2 = store.get(StrContext);
console.log({ str2 });

store.set(UserContext, { name: "Etienne", age: 25 });
const user = store.get(UserContext);
console.log({ user });

const multi = store.getMulti({
  num: NumContext,
  str: StrContext,
  yolo: {
    user: UserContext,
  },
});
console.log(multi);
