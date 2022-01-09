export default function memoize(fn: any) {
  let cached = new Map();

  return (id: string, ...params: any) => {
    if (cached.has(id)) {
      return cached.get(id);
    }

    const result = fn(id, ...params);

    cached.set(id, result);

    return result;
  };
}
