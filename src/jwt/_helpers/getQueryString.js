export function getQueryString(queries) {
  return Object.keys(queries)
    .reduce((result, key) => {
      if (queries[key] !== undefined)
        return [...result, `${encodeURIComponent(key)}=${encodeURIComponent(queries[key])}`];
      return result;
    }, [])
    .join("&");
}
