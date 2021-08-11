import { BlackBoxClass as BlackBox } from "./BlackBoxClass";

type Middleware = (ctx: BlackBox) => BlackBox;

function compose(...middlewares: Array<Middleware>): Middleware {
  return (ctx) => {
    let current = ctx;
    middlewares.forEach((middleware) => {
      current = middleware(current);
    });
    return current;
  };
}

type User = { name: string };

const AuthenticatedContext = BlackBox.createContext<User | false>(false);

const AuthenticationMiddleware: Middleware = (ctx) => {
  const isAuthenticated = Math.random() > 0.5;
  return ctx.with(
    AuthenticatedContext,
    isAuthenticated ? { name: "Paul" } : false
  );
};

const LogMiddleware: Middleware = (ctx) => {
  const response = ctx.get(ResponseContext);
  console.log(`Response: ${response}`);
  return ctx;
};

const ResponseContext = BlackBox.createContext<string | null>(null);

const homeMiddleware: Middleware = compose(
  AuthenticationMiddleware,
  LogMiddleware,
  (ctx) => {
    const user = ctx.get(AuthenticatedContext);
    if (user === false) {
      return ctx.with(ResponseContext, "Unothorized !");
    }
    return ctx.with(ResponseContext, `Hello ${user.name}`);
  },
  LogMiddleware
);

const result = homeMiddleware(BlackBox.createEmpty());
console.log(result.get(ResponseContext));
