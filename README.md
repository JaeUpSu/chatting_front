# 🏘️ BANGSAM

## 부동산 채팅 WEB/APP

---

## ✏️ 요약

    기존의 부동산 WEB 형식에 Custom 하게 채팅 기능을 추가

---

<br />

## ⚙️ Dependency

<br />

- axios
- js-cookie
- react-hook-form,
- @tanstack/react-query
- @tanstack/react-query-devtools
- react-helmet
- react-js-pagination

- styled-components
- react-slick
- @chakra-ui/react
- slick-carousel

- react-icons
- @fortawesome/free-brands-svg-icons
- @fortawesome/free-regular-svg-icons
- @fortawesome/free-solid-svg-icons
- @fortawesome/react-fontawesome

<br />

---

<br />

## 📄 기능목록

<br/>

- [x] 로딩

- [x] 헤더

  - [x] WEB

    - [x] 홈
    - [x] 검색
      - [x] 주소 검색
        - [x] 도 / 시 + 구 + 동
    - [x] 채팅목록
    - [x] 마이 페이지

    <br/>

- [x] 홈 페이지

  - [x] Brand name
  - [x] Icon Buttons
    - [x] 방 종류
  - [x] TopViews (조회순)

  <br/>

- [x] 회원가입 페이지

  - [x] User model 기입
  - [x] 가입하기
  - [x] 카카오, 네이버 가입

  <br/>

- [x] 로그인 페이지

  - [x] ID / PW 기입
  - [x] 로그인하기
    - [x] ID/PW 유효성 검사
  - [x] ID / 비번찾기 / 회원가입
  - [x] 카카오, 네이버 가입

  <br/>

- [x] 마이 페이지

  - [x] 프로필 정보

  - [x] 최근 본 리스트

  - [x] 위시 리스트

  - [x] 판매 내역

    - [x] 모든 판매 내역
    - [x] 판매중 내역
    - [x] 판매완료 내역

  <br/>

- [x] 하우스 리스트 페이지

  - [x] 옵션 리스트

    - [ ] 메뉴
      - [ ] Radio 형식
      - [ ] 선택시 params 추가

  - [ ] 방 목록

    - [ ] 대표 이미지
    - [ ] House Category 표시
    - [ ] (➕) 전세/월세/매매 표시
    - [ ] (➕) 평수, 층수
    - [ ] (➕) 주소
    - [ ] (➕) 앞부분 내용

    <br/>

- [ ] 지역 상세 페이지

  - [ ] 이미지 슬라이더
  - [ ] 요약 정보 창

    - [ ] (➕) 찜 버튼
    - [ ] (➕) 등록시간
    - [ ] (➕) 주소
    - [ ] (➕) 월세/전세/매매 표시 (가격)
    - [ ] (➕) 평수
    - [ ] (➕) 집 종류
    - [ ] (➕) 주차
    - [ ] (➕) 층수

  - [ ] 설명
  - [ ] Footer

    - [ ] position : fixed
    - [ ] Talk
      - [ ] 집 주인 Talk
        - [ ] 온/오프 표시
      - [ ] 중개인 Talk
        - [ ] 온/오프 표시
      - [ ] ( ✅ ) 매크로 Bot hint 표시

    <br/>

- [ ] 채팅 페이지

  - [ ] 목록페이지에 있는 리스트 Item
  - [ ] 채팅하기
  - [ ] ( ✅ ) 매크로 Bot

    - [ ] on/off 스위치
    - [ ] 매크로 가능한 List 채팅창 입장때 보냄
    - [ ] 매크로 입력시 답변하기

    <br />

- [ ] 채팅 목록 페이지

  - [ ] 집주인 / 중개인 Tab 메뉴
  - [ ] 고객센터 채팅창
    - [ ] position : fixed
    - [ ] 신고하기
    - [ ] App 문의
    - [ ] ( ✅ ) etc...
  - [ ] 채팅 리스트

    - [ ] 채팅 썸네일
      - [ ] 방 이미지
      - [ ] 주소
      - [ ] 매매/전세/월세 표시
      - [ ] 가격 표시
      - [ ] 읽지 않은 채팅 개수 표시

<br />

---

<br />

## 기능 목록

- [x] 로그인

  - [x] post api
  - [x] validate

- [x] 회원가입

  - [x] post api
  - [x] validate

- [x] 아이디 찾기

  - [x] post api
  - [x] validate

- [x] 비밀번호 찾기

  - [x] post api
  - [x] validate

- [x] 로그아웃

  - [x] post api
  - [x] validate

- [x] 판매하기

  - [x] 이미지 url 만들기
    - [x] post url api
      - [x] url 만들기
      - [x] 이미지 model post
  - [x] post api
  - [x] validate

- [x] 수정하기

  - [x] get api
  - [x] put api
  - [x] validate

- [x] useInfiniteScroll
  - [x] scroll handler
  - [x] requestAnimationFrame 이벤트 제한 함수
  - [x] params 변할 시 가진 state 초기화 및 api call

## 📋 DB Model Diagram

![diagram](https://velog.velcdn.com/images/hugh0223/post/e6abb1ec-5b59-4b1c-9028-35ae68a412c7/image.png)

<br />
