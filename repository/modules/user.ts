import { FetchOptions } from 'ofetch';
import { AsyncDataOptions } from '#app';

import FetchFactory from '../factory';

type IProfile = {
  id: number,
  username: string,
  email: string,
  provider: string,
  confirmed: boolean,
  blocked: boolean,
  name: string,
  createdAt: string,
  updatedAt: string,
  biodata: string,
  profile_picture: object
}

class UserModule extends FetchFactory<{ data: IProfile }>{
  private RESOURCE = '/api/users'

  async getProfile(
    asyncDataOptions?: AsyncDataOptions<{ data: IProfile }>
  ){
    return useAsyncData(() => {
      // const token = 
      return this.call(
        'GET',
        `${this.RESOURCE}/me`,
      )
    })
  }
}

export default UserModule