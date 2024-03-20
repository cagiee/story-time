export function getImageUrl(url: string, isLocal: boolean = false): string {
  const config = useRuntimeConfig()
  const result = `${isLocal ? config.public.baseUrl : config.public.apiBaseUrl}${url}`
  return result
}