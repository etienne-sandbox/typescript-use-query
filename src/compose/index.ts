import { BlackBoxClass as BlackBox } from "./BlackBoxClass";

const blackbox = BlackBox.createEmpty();

const NumContext = BlackBox.createContext<number>(4);
const StringContext = BlackBox.createContext<string>("");

const blackbox2 = blackbox.with(NumContext, 45);
const blackbox3 = blackbox2.with(NumContext, 8);

const num = blackbox3.get(NumContext);
const string = blackbox2.get(StringContext);

console.log({
  num,
  string,
  isBlackBox: blackbox instanceof BlackBox,
});
