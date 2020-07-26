import Cookies from 'js-cookie'
import { tokenKey, cookieExpires } from '@/utils/config'

export const getToken = () => Cookies.get(tokenKey)
export const setToken = (token: string) => Cookies.set(tokenKey, token, {expires: cookieExpires || 1, path: ''})
export const removeToken = () => Cookies.remove(tokenKey)