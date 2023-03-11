// documentElement.scrollTop과 documentElement.offsetHeight
//  if 문 조건에 충족할 때마다 API 콜이 발생
//      => 리플로우(Reflow)가 발생하는 참조이므로 개선해야 하는 부분

// < Debounce(디바운스)와 Throttle(스로틀) 로 개선가능 >

// Debounce=> 이벤트를 그룹화하여 특정 시간이 지난 후
//            하나의 이벤트만 발생하도록 하는 기술
// Throttle=> 일정 주기마다 이벤트를 모아서
//            이벤트가 발생하도록 하는 기술
export const throttle = (handler, timeout = 300) => {
  let invokedTime;
  let timer;
  return function (...args) {
    if (!invokedTime) {
      handler.apply(this, args);
      invokedTime = Date.now();
    } else {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (Date.now() - invokedTime >= timeout) {
          handler.apply(this, args);
          invokedTime = Date.now();
        }
      }, Math.max(timeout - (Date.now() - invokedTime), 0));
    }
  };
};





// setTimeout 보다 실행시간 보장(Animbation Frames 에서 처리되어서)
// const throttleByAnimtaionFrame = (handler) => {
//   let ticking = false;

//   return function (...args) {
//     if (!ticking) {
//       window.requestAnimationFrame(() => {
//         handler.apply(this, args);
//         ticking = false;
//       });
//       ticking = true;
//     }
//   };
// };

// 이벤트가 발생할 때
// requestAnimationFrame 콜백이 Animation Frame으로 들어감
// 그리고 실제로 처리되기 전까지 ticking은 true
// 아무리 이벤트가 다시 발생하더라도 무시
// 그 후 Animation Frame이 처리되면 콜백이 실행
// ticking을 false로
// 이를 반복하여 이벤트 발생을 제어

// 스크롤 이벤트에 rAF를 적용했을 때와
// 적용하지 않았을 때의 성능 차이가 거의 없다
// 스크롤 이벤트는 브라우저가 스크롤 위치 변경을
// 렌더링할 때마다 트리거 되는 것
// 자체적으로 rAF 적용한 것과 동일한 결과

export const throttleByAnimtaionFrame = (handler) => {
  return function (...args) {
    window.requestAnimationFrame(() => {
      handler.apply(this, args);
    });
  };
};

// 스크롤 이벤트에 rAF를 따로 적용할 필요가 없는 것이 아니냐는 의문
// documentElement.scrollTop 또는 documentElement.offsetHeight를 호출
// 별 차이가 없을 수 있지만
// 상황에 따라 강제 동기식 레이아웃이 발생하게 된다면
// 빈번한 리플로우로 이어질 수 있다

// 따라서 이벤트 핸들러에서 리플로우가 발생할 수 있는 로직이 포함
//  => rAF 또는 Throttle을 이용한 최적화가 불가피
