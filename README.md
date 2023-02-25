# 🏘️ 부동산 채팅 WEB/APP

---

## ✏️ 요약

    기존의 부동산 WEB 형식에 Custom 하게 채팅 기능을 추가

---

<br />

## ⚙️ Dependency

- axios
- react-hook-form
- react-router-dom
- @chakra-ui/react

<br/>

- styled-components
- @fortawesome/free-brands-svg-icons
- @fortawesome/free-regular-svg-icons
- @fortawesome/free-solid-svg-icons
- @fortawesome/react-fontawesome

<br />

---

<br />

## 📄 기능목록

<br/>

- [ ] 로딩

- [ ] 헤더

  - [ ] WEB

    - [ ] 홈
    - [ ] 검색
      - [ ] 주소 검색
        - [ ] 도 / 시 + 구 + 동
    - [ ] 채팅목록
    - [ ] 마이 페이지

    <br />

  - [ ] Mobile

    - [ ] 뒤로가기
    - [ ] 주소 검색
    - [ ] 햄버거
      - [ ] 채팅목록
      - [ ] 마이 페이지

    <br/>

- [ ] 홈 페이지

  - [ ] Top 10
    - [ ] Review 등으로 점수 Order
  - [ ] Like List
    - [ ] 등록한 순으로 Order
    - [ ] 없으면 비어있다는 hint 표시
  - [ ] Latest Visited List

    - [ ] 최근 방문한 순으로 Order
    - [ ] 없으면 비어있다는 hint 표시

    <br/>

- [ ] 회원가입 페이지

  - [ ] isHost, isCustom, isRealtor 선택 페이지
  - [ ] User model 기입
    - [ ] User 유효성 hint 표시
  - [ ] 가입하기
    - [ ] User model 유효성 검사
  - [ ] ( option ) 구글, 카카오, 네이버 가입

  <br/>

- [ ] 로그인 페이지

  - [ ] ID / PW 기입
  - [ ] 로그인하기
    - [ ] ID/PW 유효성 검사
  - [ ] ( option ) ID / 비번찾기

  <br/>

- [ ] 지역 목록 페이지

  - [ ] 키워드/카테고리 (DropDown-MENU)
    - [ ] CheckList 형식
  - [ ] 방 목록

    - [ ] 대표 이미지
    - [ ] House Category 표시
    - [ ] 전세/월세/매매 표시
    - [ ] 평수, 층수
    - [ ] 주소
    - [ ] 앞부분 내용

    <br/>

- [ ] 지역 상세 페이지

  - [ ] 이미지 슬라이더
  - [ ] 요약 정보 창

    - [ ] 찜 버튼
    - [ ] 등록시간
    - [ ] 주소
    - [ ] 월세/전세/매매 표시 (가격)
    - [ ] 평수
    - [ ] 집 종류
    - [ ] 주차
    - [ ] 층수

  - [ ] 설명
  - [ ] Footer

    - [ ] position : fixed
    - [ ] Talk
      - [ ] 집 주인 Talk
        - [ ] 온/오프 표시
      - [ ] 중개인 Talk
        - [ ] 온/오프 표시
      - [ ] ( option ) 매크로 Bot hint 표시

    <br/>

- [ ] 채팅 페이지

  - [ ] 목록페이지에 있는 리스트 Item
  - [ ] 채팅하기
  - [ ] ( option ) 매크로 Bot

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
    - [ ] ( option ) etc...
  - [ ] 채팅 리스트

    - [ ] 채팅 썸네일
      - [ ] 방 이미지
      - [ ] 주소
      - [ ] 매매/전세/월세 표시
      - [ ] 가격 표시
      - [ ] 읽지 않은 채팅 개수 표시

    <br />

- [ ] 마이 페이지

  - [ ] 프로필 정보
  - [ ] on/off 표시
  - [ ] 거래정보

<br />

---

<br />

## 📋 DB Model Diagram

![diagram](https://velog.velcdn.com/images/hugh0223/post/e6abb1ec-5b59-4b1c-9028-35ae68a412c7/image.png)

<br />
