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
  profile_picture: any
}

class UserModule extends FetchFactory<{ data: IProfile }>{
  private RESOURCE = '/api/users'
  private UPLOAD = '/api/upload'

  async getProfile(
    fetchOption?: FetchOptions<"json">,
    asyncDataOptions?: AsyncDataOptions<{ data: IProfile }>
  ){
    return useAsyncData(() => {
      // const token = 
      return this.call(
        'GET',
        `${this.RESOURCE}/me`,
        undefined,
        fetchOption
      )
    })
  }

  async updateProfile(
    body: any,
  ){
    return useAsyncData(() => {
      return this.call(
        'PATCH',
        `${this.RESOURCE}/me`,
        body,
      )
    })
  }
  
  async updateProfileImage(
    body: any,
  ) {
    return useAsyncData(() => {
      return this.call(
        'POST',
        this.UPLOAD,
        body,
      )
    })
  }
  
  async deleteProfileImage(
    id: any,
  ) {
    return useAsyncData(() => {
      return this.call(
        'DELETE',
        `${this.UPLOAD}/files/${id}`,
      )
    })
  }
}

export default UserModule