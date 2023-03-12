import { useState, useEffect, useCallback } from "react";

import { throttle } from "./throttle";

const useInfiniteScroll = (fetcher, { size, onSuccess, onError }) => {
  const [page, setPage] = useState(1);
  const [totalCounts, setTotalCounts] = useState(1);
  const [data, setData] = useState([]);
  const [isFetching, setFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);

  const executeFetch = useCallback(async () => {
    try {
      const data = await fetcher({ page, size });

      setData((prev) => prev.concat(data.contents));
      setTotalCounts(data.totalCounts);
      setPage(data.pageNumber + 1);
      setNextPage(!data.isLastPage);
      setFetching(false);
      onSuccess?.();
    } catch (err) {
      console.log("execute - err", err);
      onError?.(err);
    }
  }, [page]);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if (window.innerHeight + scrollTop + 1 >= offsetHeight) {
        setFetching(true);
      }
    });

    setFetching(true);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isFetching && hasNextPage) {
      executeFetch();
    } else if (!hasNextPage) setFetching(false);
  }, [isFetching]);

  return { page, data, totalCounts, setFetching, hasNextPage };
};

export default useInfiniteScroll;
