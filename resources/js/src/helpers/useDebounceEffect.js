import { useEffect } from 'react'

const useDebounceEffect = (effect, deps = [], delay = 0) => {
  useEffect(() => {
    const handler = setTimeout(() => effect(), delay);
    return () => clearTimeout(handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, delay]);
}

export default useDebounceEffect