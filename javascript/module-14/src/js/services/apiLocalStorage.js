const LOCALSTORAGE = (w => {
  if (!w) return;

  const isActive = 'localStorage' in w;

  const get = key => {
    try {
      const serializedState = localStorage.getItem(key);

      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (err) {
      console.error('Get state error: ', err);
    }
  };

  const set = (key, value) => {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (err) {
      console.error('Set state error: ', err);
    }
  };

  const remove = key => {
    try {
      const serializedState = localStorage.removeItem(key);
    } catch (err) {
      console.error('Get state error: ', err);
    }
  };

  const publicAPI = {
    isActive,
    get,
    set,
    remove,
  };

  return publicAPI;
})(window);

export const lStorageKey = 'urlList';
export const isActiveLS = LOCALSTORAGE.isActive;
export const getLS = LOCALSTORAGE.get;
export const setLS = LOCALSTORAGE.set;
export const removeLS = LOCALSTORAGE.remove;