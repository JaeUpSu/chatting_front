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
      console.log("execute", data);

      setData((prev) => prev.concat(data.contents));
      setPage(data.pageNumber + 1);
      setTotalCounts(data.totalCounts);
      setNextPage(!data.isLastPage);
      setFetching(false);
      onSuccess?.();
    } catch (err) {
      console.log("execute - err", err);
      onError?.(err);
    }
  }, [page]);

  useEffect(() => {
    setFetching(true);
  }, []);

  useEffect(() => {
    if (isFetching && hasNextPage) {
      executeFetch();
    } else if (!hasNextPage) setFetching(false);
  }, [isFetching]);

  return { page, data, totalCounts, hasNextPage, executeFetch };
};

export default useInfiniteScroll;
