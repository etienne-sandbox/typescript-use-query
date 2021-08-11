export {};

type User = { name: string };

function getUser(): User {
  return { name: "Superman" };
}

// withUser

function withUser<Result>(fn: (user: User) => Result): () => Result {
  return () => {
    return fn(getUser());
  };
}

const fn = withUser((user) => {
  return user.name.toUpperCase();
});

const fn2 = withUser(() => {
  return 42;
});

fn();

// withUserObject

type WithUserObjectBase = Record<string, (user: User) => any>;

type WithUserObject<Obj extends WithUserObjectBase> = {
  [K in keyof Obj]: () => ReturnType<Obj[K]>;
};

function withUserObject<Obj extends WithUserObjectBase>(
  obj: Obj
): WithUserObject<Obj> {
  const result: any = {} as any;
  Object.keys(obj).forEach((key) => {
    result[key] = withUser(obj[key]);
  });
  return result;
}

const tools = withUserObject({
  uppercaseUser: (user) => user.name.toUpperCase(),
  randomNumber: (user) => user.name + Math.random(),
  num: () => Math.random(),
  getUser: (user) => user,
});

tools.getUser();
tools.randomNumber();

// compose withUser

const tools2 = {
  uppercaseUser: withUser((user) => user.name.toUpperCase()),
  randomNumber: withUser((user) => user.name + Math.random()),
  num: withUser(() => Math.random()),
  getUser: withUser((user) => user),
};

tools2.getUser();
tools2.randomNumber();
