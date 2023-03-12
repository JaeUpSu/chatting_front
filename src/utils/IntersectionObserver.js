import { useRef, useCallback, useEffect } from "react";

export const useIntersect = (onIntersect, options) => {
  const ref = useRef(null);
  const callback = useCallback(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onIntersect(entry, observer);
      });
    },
    [onIntersect]
  );

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options, callback]);

  return ref;
};

// 먼저 target 요소를 저장하기 위한 ref를 선언
// root와 target이 교차 상태인지 확인하는 isIntersecting 값이 true
//  => 콜백을 실행하는 함수를 useCallback으로 선언
// 그리고 useEffect 콜백에서 IntersectionObserver 객체를 생성
// observe 호출을 통해 target 요소의 관찰을 시작

// 컴포넌트가 언마운트될 때는 cleanup을 통해 disconnect를 호출
// 모든 요소의 관찰을 중지
