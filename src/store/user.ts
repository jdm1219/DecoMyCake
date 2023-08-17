import { atom } from 'recoil';

const localStorageEffect =
  (key: string) =>
    ({ setSelf, onSet }: any) => {
      const savedValue = localStorage.getItem(key);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
      onSet((newValue: any, _: any, isReset: boolean) => {
        isReset
          ? localStorage.removeItem(key)
          : localStorage.setItem(key, JSON.stringify(newValue));
      });
    };

const accessToken = atom({
  key: 'accessToken',
  default: null,
  effects: [localStorageEffect('accessToken')],
});

const user = atom({
  key: 'userId',
  default: null,
});
