export const canParseJSON = (data) => {
  try {
    return JSON.parse(data);
  } catch (e) {
    return false;
  }
};

export const getErrorProperties = (obj) => {
  const { name, message, stack } = obj;
  return { name, message, stack };
};

export const isObject = (data) =>
  typeof data === 'object' && !Array.isArray(data) && data !== null;

export const parseError = (err) =>
  JSON.stringify(err, Object.getOwnPropertyNames(err));

export const probablyIsAnError = (obj) => obj.message && obj.stack;
