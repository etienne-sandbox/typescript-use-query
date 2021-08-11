import { BlackBoxClass as BlackBox } from "./BlackBoxClass";

type Result = Promise<string | null>;

type Next = (ctx: BlackBox) => Result;

type Middleware = (ctx: BlackBox, next: Next) => Result;

function compose(...middlewares: Array<Middleware>): Middleware {
  const [first, ...other] = [...middlewares].reverse();
  let current: Middleware = first;
  for (const middleware of other) {
    let nextMiddleware = current;
    current = (ctx, next) => {
      return middleware(ctx, (nextCtx) => nextMiddleware(nextCtx, next));
    };
  }
  return current;
}

type User = { name: string };

const AuthenticatedContext = BlackBox.createContext<User | false>(false);

const AuthenticationMiddleware: Middleware = (ctx, next) => {
  const isAuthenticated = Math.random() > 0.5;
  return next(
    ctx.with(AuthenticatedContext, isAuthenticated ? { name: "Paul" } : false)
  );
};

const IsAuthenticatedContext = BlackBox.createContext<User>({
  name: "Invalid",
});

const IsAuthenticatedMiddleware: Middleware = async (ctx, next) => {
  const user = ctx.get(AuthenticatedContext);
  if (user === false) {
    return "Unauthorized !";
  }
  return next(ctx.with(IsAuthenticatedContext, user));
};

const LogMiddleware: Middleware = async (ctx, next) => {
  const response = next(ctx);
  console.log(`Response: ${response}`);
  return response;
};

const homeMiddleware: Middleware = compose(
  AuthenticationMiddleware,
  IsAuthenticatedMiddleware,
  LogMiddleware,
  async (ctx, next) => {
    const user = ctx.get(IsAuthenticatedContext);
    return `Hello ${user.name}`;
  }
);

homeMiddleware(BlackBox.createEmpty(), async () => null).then((result) => {
  console.log(result);
});
