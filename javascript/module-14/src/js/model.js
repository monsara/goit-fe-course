import { lStorageKey, isActiveLS, getLS, setLS, removeLS } from './services/apiLocalStorage';
import * as apiUrl from './services/apiUrl';
import * as generateId from './services/generateId';

export default class Model {
  constructor(urlInfo = []) {
    this._urlInfo = urlInfo;

    this.init();
  }

  init() {
    if(isActiveLS && getLS(lStorageKey) !== undefined)
    return this._urlInfo = getLS(lStorageKey);
  }

  getUrl() {
    return this._urlInfo;
  }

  setUrl(url) {
    return apiUrl.getUrlInfo(url).then(data => {
      const urlList = this._urlInfo.map((item) => item.url);

      if( urlList.includes(data.url) ) {
        return alert('Your url adress is already exists!');
      } else {
        data.id = generateId.generateId();
        this._urlInfo.push(data);
      }

      if (isActiveLS) {
        removeLS(lStorageKey);
        setLS(lStorageKey, this._urlInfo);
      }

      return data;
    });
  }

  removeUrl(id) {
    this._urlInfo = this._urlInfo.filter(url => url.id !== id);

    if (isActiveLS) {
      removeLS(lStorageKey);
      setLS(lStorageKey, this._urlInfo);
    }
  }
}
