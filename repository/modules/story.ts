import { FetchOptions } from 'ofetch';
import { AsyncDataOptions } from '#app';

import FetchFactory from '../factory';

type IStory = {
  id: number,
  title: string,
  content: string,
  createdAt: string,
  updatedAt: string,
  coverImage: object,
  category: object,
  author: object,
}

type IStoriesResponse = {
  data: any,
  meta: object
}

type IDetailStoryResponse = {
  data: IStory
}

class StoriesModule extends FetchFactory<IStoriesResponse>{
  private RESOURCE = '/api/stories'
  private UPLOAD = '/api/upload'

  /**
    * Return the stories as IStoriesResponse 
    * @param asyncDataOptions options for `useAsyncData`
    * @returns 
  */
  async getStories(
    options?: FetchOptions<'json'>,
    asyncDataOptions?: AsyncDataOptions<IStoriesResponse[]>
  ){
    return useAsyncData(() => {
      const fetchOptions: FetchOptions<'json'> = options || {}
      return this.call(
        'GET',
        `${this.RESOURCE}`,
        undefined,
        fetchOptions,
      )
    })
  }

  /**
    * Return the detail story as IDetailStoryResponse 
    * @param id for get story detail by id
    * @param asyncDataOptions options for `useAsyncData`
    * @returns 
  */
  async getDetailStory(
    id: any,
    asyncDataOptions?: AsyncDataOptions<IDetailStoryResponse>
  ){
    console.log(`${this.RESOURCE}/${id}`)
    
    return useAsyncData(() => {
      return this.call(
        'GET',
        `${this.RESOURCE}/${id}`,
      )
    })
  }

  async createStory(
    body: any,
    asyncDataOptions?: AsyncDataOptions<IDetailStoryResponse>
  ){
    return useAsyncData(() => {
      return this.call(
        'POST',
        this.RESOURCE,
        body
      )
    })
  }

  async uploadStoryImage(
    body: any,
  ){
    return useAsyncData(() => {
      return this.call(
        'POST',
        this.UPLOAD,
        body
      )
    })
  }

  async deleteStory(
    id: string
  ){
    return useAsyncData(() => {
      return this.call(
        'DELETE',
        `${this.RESOURCE}/${id}`
      )
    })
  }
}

export default StoriesModule