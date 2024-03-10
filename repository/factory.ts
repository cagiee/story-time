import { $Fetch, FetchOptions } from 'ofetch';

class FetchFactory<T> {
  private $fetch: $Fetch;

  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher;
    const token = useCookie('token')
  }

  /**
   * The HTTP client is utilized to control the process of making API requests.
   * @param method the HTTP method (GET, POST, ...)
   * @param url the endpoint url
   * @param data the body data
   * @param fetchOptions fetch options
   * @returns 
   */
  async call(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    data?: object,
    fetchOptions?: FetchOptions<'json'>
  ): Promise<T> {
    const token = useCookie('token')
    
    const headers = new Headers(fetchOptions?.headers)
    token.value ? headers.set('Authorization', `Bearer ${token.value || ''}`) : ''
    
    return this.$fetch<T>(
      url, 
      { 
        method, 
        body: data, 
        ...fetchOptions,
        headers
      }
    )
  }
}

export default FetchFactory;