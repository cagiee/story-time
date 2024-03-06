export function getImageUrl(url: string): string {
  const config = useRuntimeConfig();
  const result = `${config.public.apiBaseUrl}${url}`
  return result
}