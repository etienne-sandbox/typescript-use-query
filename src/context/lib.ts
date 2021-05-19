const CONTEXT = Symbol.for(
  "__INTERNAL_CONTEXT_DO_NOT_USE_OR_YOU_WILL_GET_FIRED"
);

type MultiResult<T> = {
  [K in keyof T]: T[K] extends Context<infer Data> ? Data : MultiResult<T[K]>;
};

interface Store {
  get: <T>(context: Context<T>) => T;
  set: <T>(context: Context<T>, value: T) => void;
  has: (context: Context<unknown>) => boolean;
  remove: (context: Context<unknown>) => void;
  getMulti<T>(data: T): MultiResult<T>;
}

interface Context<T> {
  [CONTEXT]: {
    defaultValue: T;
  };
}

export function createStore(): Store {
  const data = new Map<Context<unknown>, unknown>();

  function isContext(maybe: unknown): maybe is Context<unknown> {
    return maybe && (maybe as any)[CONTEXT];
  }

  function getMulti<T>(data: T): MultiResult<T> {
    const result: any = {};
    Object.keys(data).forEach((key) => {
      const item = (data as any)[key];
      result[key] = isContext(item) ? get(item) : getMulti(item);
    });
    return result;
  }

  function get<T>(context: Context<T>): T {
    if (data.has(context)) {
      return data.get(context) as any;
    }
    return context[CONTEXT].defaultValue;
  }

  return {
    get,
    set<T>(context: Context<T>, value: T): void {
      data.set(context, value);
    },
    has(context: Context<unknown>): boolean {
      return data.has(context);
    },
    remove(context: Context<unknown>): void {
      data.delete(context);
    },
    getMulti,
  };
}

export function createContext<T>(defaultValue: T): Context<T> {
  return {
    [CONTEXT]: {
      defaultValue,
    },
  };
}
