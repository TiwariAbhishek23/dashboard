export const safeJSONParse = (str: any, defaultValue = {}) => {
  if (typeof str === 'object')
    return str;

  try {
    return JSON.parse(str);
  } catch {
    return defaultValue;
  }
}

export const safeJSONStringify = (obj: any, defaultValue = '{}') => {
  try {
    return JSON.stringify(obj);
  } catch {
    return defaultValue;
  }
}
