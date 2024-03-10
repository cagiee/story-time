import { FetchOptions } from 'ofetch';
import { AsyncDataOptions } from '#app';

import FetchFactory from '../factory';

type IUser = {
  "id": number,
  "username": string,
  "email": string,
  "provider": string,
  "confirmed": boolean,
  "blocked": boolean,
  "name": string,
  "createdAt": string,
  "updatedAt": string,
  "biodata": string,
}

type IAuthResponse = {
  data: {
    jwt: string,
    user: IUser,
  },
  error?: object
}

type IRegistrationForm = {
  name: string,
  username: string,
  email: string,
  password: string,
}

type ILoginForm = {
  identifier: string,
  password: string,
}

class AuthModule extends FetchFactory<IAuthResponse>{
  private RESOURCE = '/api/auth/local'

  async login(
    body: ILoginForm,
    asyncDataOptions?: AsyncDataOptions<IAuthResponse>
  ){
    return useAsyncData(() => {
      return this.call(
        'POST',
        `${this.RESOURCE}`,
        body,
      )
    })
  }
  async register(
    body: IRegistrationForm,
    asyncDataOptions?: AsyncDataOptions<IAuthResponse>
  ){
    return useAsyncData(() => {
      return this.call(
        'POST',
        `${this.RESOURCE}/register`,
        body
      )
    })
  }
}

export default AuthModule