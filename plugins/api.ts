// [File]: plugins/api.ts

// 3rd's
import { $fetch, FetchOptions } from 'ofetch';

// locals
import StoriesModule from '~/repository/modules/story';
import AuthModule from '~/repository/modules/auth';
import UserModule from '~/repository/modules/user';

interface IApiInstance {
  stories: StoriesModule,
  auth: AuthModule,
  user: UserModule,
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const fetchOptions: FetchOptions = {
    baseURL: config.public.apiBaseUrl
  };

  // Create a new instance of $fecther with custom option
  const apiFecther = $fetch.create(fetchOptions);

  // An object containing all repositories we need to expose
  const modules: IApiInstance = {
    stories: new StoriesModule(apiFecther),
    auth: new AuthModule(apiFecther),
    user: new UserModule(apiFecther),
  };

  return {
    provide: {
      api: modules
    }
  };
});