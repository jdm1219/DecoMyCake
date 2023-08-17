import {http} from '../utils/http'

export function signUp({id, password, nickname}: CreateUser) {
  return http.post('auth/sign-up', {
    id,
    password,
    nickname
  })
}

export function signIn({id, password}: LoginUser) {
  return http.post<{accessToken: string}>('auth/sign-in', {
    id,
    password
  })
}

export function verify() {
  return http.get('auth/verify')
}

export interface CreateUser {
  id: string;
  password: string;
  nickname: string;
}

export interface LoginUser {
  id: string;
  password: string;
}

export interface ApiError {
  status: number;
  message: string;
}