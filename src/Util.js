export function isPropsChanged(props, prevProps, keys) {
  if (prevProps == null) {
    return true;
  } else {
    return !!keys.find((key) => props[key] !== prevProps[key]);
  }
}
export function isIndexIn(index, length) {
  return index >= 0 && index < length;
}
