import { BlackBox } from "./BlackBox";

const blackbox = BlackBox.createEmpty();

const NumContext = BlackBox.createContext<number>(4);
const StringContext = BlackBox.createContext<string>("");

const blackbox2 = blackbox.with(NumContext, 45);

const num = blackbox2.get(NumContext);
const string = blackbox2.get(StringContext);
