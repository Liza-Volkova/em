function isObject(value) {
  return typeof value === 'object' && value !== null;
}

function deepCopy(value) {
  if (!isObject(value)) {
    return value;
  }

  if (Array.isArray(value)) {
    const result = [];
    for (let i = 0; i < value.length; i++) {
      result[i] = deepCopy(value[i]);
    }
    return result;
  }

  const result = {};
  const keys = Object.keys(value);
  for (const key of keys) {
    result[key] = deepCopy(value[key]);
  }
  return result;
}

function deepEqual(a, b) {
  if (!isObject(a) && !isObject(b)) {
    return a === b;
  }

  if (!isObject(a) || !isObject(b)) {
    return false;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }

  if (Array.isArray(a) || Array.isArray(b)) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!deepEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
}
