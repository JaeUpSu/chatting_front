import { useState, useEffect, useCallback } from "react";
import { initParams } from "../services/local";
import { getBackOptions } from "../utils/getBackOptions";

import { throttle, throttleTwo } from "../utils/throttle";

const useInfiniteScroll = (fetcher, { size, onSuccess, onError }) => {
  const [page, setPage] = useState(1);
  const [totalCounts, setTotalCounts] = useState(-1);
  const [data, setData] = useState([]);
  const [isFetching, setFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);
  const [backParams, setBackParams] = useState(getBackOptions(initParams()));

  const executeFetch = useCallback(async () => {
    try {
      const data = await fetcher({ page, ...backParams });
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
    const handleScroll = throttleTwo(() => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if (window.innerHeight + scrollTop >= offsetHeight * 0.7) {
        setFetching(true);
      }
    });
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isFetching && hasNextPage) {
      executeFetch();
    } else if (!hasNextPage) setFetching(false);
  }, [isFetching]);

  useEffect(() => {
    setPage(1);
    setData([]);
    setNextPage(true);
    setFetching(true);
  }, [backParams]);

  return {
    hasNextPage,
    data,
    totalCounts,
    isFetching,
    setFetching,
    setBackParams,
  };
};

export default useInfiniteScroll;
