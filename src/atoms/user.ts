import {atom, selector} from 'recoil';
import jwtDecode from "jwt-decode";

interface User {
  id: string;
  nickname: string;
}
export const ACCESS_TOKEN_KEY = 'accessToken';
export const USER_KEY = 'user';

const localStorageEffect =
  (key: string) =>
    ({setSelf, onSet}: any) => {
      const savedValue = localStorage.getItem(key);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
      onSet((newValue: any, _: any, isReset: boolean) => {
        isReset
          ? localStorage.removeItem(key)
          : typeof newValue === "string"
            ? localStorage.setItem(key, newValue)
            : localStorage.setItem(key, JSON.stringify(newValue));
      });
    };

export const accessTokenState = atom({
  key: ACCESS_TOKEN_KEY,
  default: '',
  effects: [localStorageEffect('accessToken')],
});

export const userState = selector({
  key: USER_KEY,
  get: ({get}) => {
    try {
      const token = get(accessTokenState);
      return jwtDecode<User>(token);
    } catch (e) {
      return null
    }
  }
});
