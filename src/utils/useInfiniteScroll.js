import { useState, useEffect, useCallback } from "react";
import { getBackOptions } from "./getBackOptions";

import { throttle } from "./throttle";

const useInfiniteScroll = (fetcher, { size, onSuccess, onError }) => {
  const [page, setPage] = useState(1);
  const [totalCounts, setTotalCounts] = useState(1);
  const [data, setData] = useState([]);
  const [isFetching, setFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);
  const [backParams, setBackParams] = useState({
    roomKind: "전체",
    cellKind: "전체",
    py: "전체",
    toilet_counts: "전체",
    room_counts: "전체",
    maintenanceFeeRange: [0, 30],
    priceRange: [0, 30],
    depositRange: [0, 30],
    monthlyRentRange: [0, 30],
  });

  const executeFetch = useCallback(async () => {
    try {
      const data = await fetcher({ page, size, ...backParams });
      console.log();

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

  useEffect(() => {
    console.log("scroll", backParams);
    if (hasNextPage) {
      executeFetch();
    }
  }, [backParams]);

  return { page, data, totalCounts, setFetching, setBackParams, hasNextPage };
};

export default useInfiniteScroll;
