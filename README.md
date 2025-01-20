# 🍊HOLO🍊

### 1인가구를 위한 정보 제공 서비스, 나 HOLO 산다!
배포 링크: [https://holo-psi.vercel.app/](https://holo-psi.vercel.app/)

<br />

![Group 1000006482](https://github.com/user-attachments/assets/40285653-d706-4899-a2ca-fb60c2bc8449)

<br/>

# 👨‍👩‍👧‍👦 Our Team 
| 우지영        |    김민지      |  최강건        |    신상용      |     정은혜     |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| [@zi0w](https://github.com/zi0w) | [@minji7901](https://github.com/minji7901) | [@Choi-kanggun](https://github.com/Choi-kanggun3)   |    [@tkddyd0817](https://github.com/tkddyd0817) | [@gracejelly125](https://github.com/gracejelly125)

<br/>

### [📝 프로젝트 노션 바로가기](https://www.notion.so/teamsparta/1-01b5bf3f2ede441599cf10d97626d59b)

<br/>

# 🕹️ 프로젝트 기능
### 1️⃣ 로그인, 회원가입, 마이페이지
- 👥 소셜 로그인 (Google, Kakao, Github)
  - OAuth 2.0 인증 방식을 사용하여 간편한 사용자 인증 제공
  - 각 플랫폼에서 제공하는 OAuth Provider를 통해 로그인/회원가입 지원
- 💻 사용자 상태 관리 (Zustand)
  - Zustand를 사용하여 전역 상태로 사용자 정보 및 인증 상태 관리
  - 로그인 상태( isLogin )와 사용자 정보( user )를 전역으로 유지
  - supabase.auth.signOut() 을 통해 인증 세션을 해제하고, 로그아웃 기능 제공
- ✉️ 회원 탈퇴 기능
  - Supabase의 Admin API를 사용하여 안전하게 사용자 계정 삭제
  - SERVICE_ROLE_KEY 를 활용하여 서버 환경에서만 실행되도록 설정
- ❗️ 접근 제어 (Next.js Middleware)
  - 로그인 여부에 따른 페이지 접근 제어
- 👤 마이페이지 (React Query)
  - React Query를 활용한 상태관리와 낙관적 업데이트로 사용자 경험 최적화
  - 페이지네이션 적용으로 효율적인 데이터 렌더링 구현
  - 모달 기반의 프로필 수정 시스템 (이미지, 닉네임, 비밀번호 개별 수정 가능)
  - 입력값 없을 시 기존 데이터 유지 기능으로 사용자 편의성 향상
  - 좋아요, 댓글, 작성글 실시간 상태 동기화 및 리스트 업데이트 구현

  
### 2️⃣ 오늘의 메뉴 추천, 오늘의 운세 페이지
- 🍜 오늘의 메뉴 추천
  - Funnel 패턴을 사용해 사용자가 4개의 질문에 응답하며 데이터를 입력할 수 있도록 구현
    - 이전 단계로 돌아가도 입력한 데이터가 유지되도록 처리
  - OpneAI API를 통해 사용자 응답 기반 오늘의 추천 메뉴 제공
  - 프로그레스바를 통해 현재 진행 단계 시각적으로 표시
- 🍀 오늘의 운세
  - OpenAI API를 통해 오늘의 운세 제공
  - 사용자가 직관적으로 선택할 수 있도록 포춘쿠키 UI 제공
- 📥 추천 결과 저장
  - toPng, file-saver 라이브러리를 사용해 결과 페이지를 PNG 형식으로 다운로드 가능
- 🔗 추천 결과 공유
  - Route Handler를 통해 추천 결과 데이터를 Map 객체(임시 저장소)에 저장 후, UUID를 반환해 링크를 단축
  - 반환된 UUID를 기반으로 공유 페이지의 URL 생성(+ 오늘의 메뉴 추천은 쿼리 파라미터에 메뉴 타입 포함)
    - navigator.clipboard를 사용해 버튼 클릭 시 URL이 클립보드에 복사되도록 구현
  - 해당 URL에 접속하면 GET 요청을 통해 추천 결과를 받아와 페이지에 표시

  
### 3️⃣ 쓰레기 가이드, 청년 정책 페이지
- 📅 지역별 쓰레기 배출 요일 조회
  - OpenAI GPT-4 API를 활용하여 지역별 정확한 쓰레기 배출 일정 정보 제공
  - RegionSelect 컴포넌트를 통한 계층형 지역 선택 UI 구현
  - 선택된 지역에 따른 실시간 배출 요일 데이터 응답

- 🥗 음식물 쓰레기 분류 확인 
  - OpenAI GPT-4 API를 활용한 음식물 쓰레기 판별 시스템 구현
  - 사용자 입력값에 대한 실시간 AI 기반 분류 처리
  - 시각적 피드백을 통한 직관적인 결과 표시 (FoodYesIcon/FoodNoIcon)

- 🔍 정책 검색 시스템 
  - 공공데이터포털 청년정책 API 연동을 통한 실시간 정책 정보 제공
  - xml2js를 사용하여 XML 데이터를 JSON으로 파싱하여 효율적인 데이터 처리 구현
  - 지역별, 분야별 필터링 기능으로 맞춤형 정책 검색 지원

- 📋 정책 목록 및 페이지네이션 
  - React Query를 활용한 효율적인 데이터 캐싱 및 상태 관리
  - 커스텀 페이지네이션 훅을 통한 대량의 정책 데이터 효율적 표시
  - 동적 라우팅을 통한 정책 상세 페이지 구현

- 📝 정책 상세 정보 표시 
  - Next.js 서버 컴포넌트를 활용한 서버 사이드 렌더링 구현
  - 정책별 상세 정보 포맷팅 및 레이아웃 최적화
  - 신청 사이트 및 참고 사이트 링크 제공


### 4️⃣ 꿀팁 게시판 페이지
- 📝게시물 관리
  - Supabase를 사용하여 게시물 CRUD 기능 제공
  - Day.js 라이브러리를 사용하여 작성 일자를 직관적으로 표시
  - 카테고리 별로 게시물을 필터링 할 수 있는 기능 제공
  - 페이지네이션을 사용하여 사용자 편의성 제공
  - 서버액션을 활용하여 캐시 무효화 및 최신 데이터 동기화

- 🧡좋아요/댓글 기능
  - Supabase를 사용하여 좋아요/댓글 CRUD 기능 제공
  - TanstackQuery를 사용하여 전역 상태로 좋아요/댓글 데이터 관리
  - 낙관적 업데이트를 활용하여 사용자 액션에 따른 즉각적인 피드백 제공
  - 게시물에 좋아요/댓글 수를 표시하여 사용자 참여도 확인 가능


### 5️⃣ 우리동네 핫플 페이지
- 🗺️ 카카오 지도
  - KakaoMap API를 이용하여 지도 제공
  - geolocation API를 이용하여 사용자의 위치 표시
  - 지도 확대, 축소 및 사용자 위치 이동 버튼 제공
  - 편의시설 카테고리 버튼 제공
  - 카테고리 버튼 클릭 시, 주변 카테고리 시설 검색 및 마커와 리스트 표시
  - 마커 클릭 시, 해당 장소 정보 제공

<br />

# 🎥 시연 영상

<br />

# 📅 Development Period
2024.12.31 ~

<br />

# ⚙️ Tech Stack & Tools ⚙️
<div>
  
### ✔️ Language

<img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white"> 

### ✔️ Framework & Libraries

<img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white"> 
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/Tanstack Query-FF4154?style=for-the-badge&logo=TanstackQuery&logoColor=white">
<img src="https://img.shields.io/badge/zustand-FF4154?style=for-the-badge&logo=TanstackQuery&logoColor=white">
<img src="https://img.shields.io/badge/tailwind css-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white">
<img src="https://img.shields.io/badge/kakaomap-FFCD00?style=for-the-badge&logo=kakao&logoColor=white">


### ✔️ Hosting & Deployment

<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">

### ✔️ Version Control

<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

</div>

<br />

# 🌳 프로젝트 구조
```bash
📦src
 ┣ 📂app
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┗ 📂callback
 ┃ ┃ ┣ 📂delete-user
 ┃ ┃ ┣ 📂recommend
 ┃ ┃ ┣ 📂signin
 ┃ ┃ ┗ 📂signup
 ┃ ┣ 📂fortune
 ┃ ┃ ┣ 📂_components
 ┃ ┃ ┣ 📂result
 ┃ ┣ 📂honeytips
 ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┣ 📂_hooks
 ┃ ┃ ┣ 📂_actions
 ┃ ┃ ┣ 📂_components
 ┃ ┃ ┣ 📂_constans
 ┃ ┃ ┣ 📂_types
 ┃ ┃ ┣ 📂_utils
 ┃ ┃ ┣ 📂post
 ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┣ 📂search-results
 ┃ ┣ 📂map
 ┃ ┃ ┣ 📂_components
 ┃ ┃ ┣ 📂_hooks
 ┃ ┃ ┣ 📂_types
 ┃ ┃ ┣ 📂_utils
 ┃ ┃ ┣ 📂constants
 ┃ ┣ 📂mypage
 ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┃ ┣ 📂Mycomment
 ┃ ┃ ┃ ┃ ┣ 📂Mylike
 ┃ ┃ ┃ ┃ ┗ 📂Mypost
 ┃ ┃ ┃ ┗ 📂_hooks
 ┃ ┃ ┣ 📂_components
 ┃ ┃ ┣ 📂_hooks
 ┃ ┃ ┣ 📂_types
 ┃ ┃ ┣ 📂_utils
 ┃ ┣ 📂policy
 ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┃ ┣ 📂_hooks
 ┃ ┃ ┣ 📂_actions
 ┃ ┃ ┣ 📂_components
 ┃ ┃ ┣ 📂_constants
 ┃ ┃ ┣ 📂_types
 ┃ ┃ ┣ 📂_utils
 ┃ ┣ 📂recommend
 ┃ ┃ ┣ 📂_actions
 ┃ ┃ ┣ 📂_components
 ┃ ┃ ┣ 📂_constants
 ┃ ┃ ┣ 📂_hooks
 ┃ ┃ ┣ 📂_layout
 ┃ ┃ ┣ 📂_types
 ┃ ┃ ┣ 📂_utils
 ┃ ┃ ┣ 📂menu
 ┃ ┃ ┣ 📂result
 ┃ ┣ 📂sign-in
 ┃ ┃ ┣ 📂_components
 ┃ ┃ ┣ 📂_hooks
 ┃ ┃ ┣ 📂_types
 ┃ ┃ ┣ 📂_utils
 ┃ ┣ 📂sign-up
 ┃ ┃ ┣ 📂_components
 ┃ ┃ ┣ 📂_types
 ┃ ┃ ┣ 📂_utils
 ┃ ┣ 📂trash-guide
 ┃ ┃ ┣ 📂_actions
 ┃ ┃ ┣ 📂_components
 ┃ ┃ ┣ 📂_types
 ┣ 📂assets
 ┃ ┣ 📂fonts
 ┃ ┗ 📂images
 ┃ ┃ ┣ 📂common
 ┃ ┃ ┣ 📂daily
 ┃ ┃ ┣ 📂fortune
 ┃ ┃ ┣ 📂honeytips
 ┃ ┃ ┣ 📂main
 ┃ ┃ ┣ 📂map
 ┃ ┃ ┣ 📂recommend
 ┃ ┃ ┣ 📂social-login
 ┃ ┃ ┣ 📂splash
 ┃ ┃ ┗ 📂trash
 ┣ 📂components
 ┃ ┣ 📂common
 ┃ ┣ 📂daily
 ┃ ┣ 📂layout
 ┃ ┣ 📂main
 ┃ ┗ 📂providers
 ┣ 📂constants
 ┣ 📂hooks
 ┣ 📂lib
 ┃ ┣ 📂types
 ┃ ┗ 📂utils
 ┃ ┃ ┣ 📂daily
 ┃ ┃ ┗ 📂supabase
 ┣ 📂store
 ┣ 📂types
 ┗ 📜middleware.ts
```
