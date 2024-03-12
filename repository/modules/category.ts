import { FetchOptions } from 'ofetch';
import { AsyncDataOptions } from '#app';

import FetchFactory from '../factory';

type ICategory = {
  id: Number,
  name: String,
  createdAt: String,
  updatedAt: String,
}

type ICategoryResponse = {
  data: ICategory[],
  meta: Object
}

class CategoryModule extends FetchFactory<ICategoryResponse> {
  private RESOURCE = '/api/categories'

  async getCategoryList() {
    return useAsyncData(() => {
      return this.call(
        'GET',
        this.RESOURCE
      )
    })
  }
}

export default CategoryModule