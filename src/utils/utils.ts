export function deepClone<T>(value: T): T {
  if (typeof value !== 'object' || value === null) return value;

  if (Array.isArray(value)) {
    const newValue = value.map((item) => {
      if (typeof value !== 'object' || value === null) return item;
      return deepClone(item);
    });

    return (newValue as unknown) as T;
  }

  const obj: T = {} as T;
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      const val = value[key];
      if (typeof val !== 'object' || val === null) obj[key] = val;
      else obj[key] = deepClone(val);
    }
  }

  return obj;
}
