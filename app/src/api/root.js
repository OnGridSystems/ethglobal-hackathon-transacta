/**
 * @param {() => Promise<Response>} fetchLikeFn a function that returns Promise, similar to fetch, just like () => fetch(url, opt)  
 */
export async function fetcherJson(fetchLikeFn, options = {}) {
  const now = Date.now()
  const res = await fetchLikeFn()
  
  if (!res || !res.ok) {
    throw new Error(`[ERR ${fetchLikeFn.name}] ${res.status}: ${res.statusText}`)
  }
  if (options.minDuration) {
    if (Date.now() - now < options.minDuration) await new Promise((r) => setTimeout(r, options.minDuration - Date.now() + now))
  }
  return res.json()
}
