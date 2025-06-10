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

### [📝 프로젝트 노션 바로가기](https://www.notion.so/teamsparta/1-_-3352f19eed63440682cd1745d31ed566)

<br/>


# 🕹️ 프로젝트 기능
<details>
<summary> 1️⃣ 로그인, 회원가입, 마이페이지 </summary>
<div markdown="1">
  
- 📝 폼 관리 및 유효성 검사
  - react-hook-form과 zod를 활용한 폼 관리
  - 실시간 유효성 검사 기반 즉각적인 피드백 제공
  - 커스텀 에러 메세지 제공을 통한 사용자 친화적 UI 구현
  - 비밀번호 규칙, 이메일 형식, 닉네임 제한 등 상세 검증
    
- 👥 소셜 로그인 (Google, Kakao, Github)
  - OAuth 2.0 인증 방식을 사용하여 간편한 사용자 인증 제공
  - 각 플랫폼에서 제공하는 OAuth Provider를 통해 로그인/회원가입 지원
    
- 💻 사용자 상태 관리 (Zustand)
  - Zustand를 사용하여 전역 상태로 사용자 정보 및 인증 상태 관리
  - 로그인 상태( isLogin )와 사용자 정보( user )를 전역으로 유지

- 🔐 로그아웃 기능
  - 서버 액션을 통한 로그아웃 처리
  - supabase.auth.signOut()을 통해 인증 세션을 해제하고, 로그아웃 기능 제공

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

- 🎨 스켈레톤 UI
  - 스켈레톤 UI를 사용하여 사용자의 UX 편의성 향상 및 사용자 경험 최적화

</div>
</details>

<details>
<summary> 2️⃣ 오늘의 메뉴 추천, 오늘의 운세 페이지 </summary>
<div markdown="1">

- 🍜 오늘의 메뉴 추천
  - Funnel 패턴을 사용해 사용자가 4개의 질문에 응답하며 데이터를 입력할 수 있도록 구현
    - 이전 단계로 돌아가도 입력한 데이터가 유지되도록 처리
  - OpneAI API를 통해 사용자 응답 기반 오늘의 추천 메뉴 제공
  - 프로그레스바를 통해 현재 진행 단계 시각적으로 표시
    
- 🍀 오늘의 운세
  - OpenAI API를 통해 오늘의 운세 제공
  - 사용자가 직관적으로 선택할 수 있도록 포춘쿠키 UI 제공
  - framer-motion 라이브러리를 사용해 포춘쿠키 클릭 시 애니메이션 효과 제공
    
- 📥 추천 결과 저장
  - toPng, file-saver 라이브러리를 사용해 결과 페이지를 PNG 형식으로 다운로드 가능
    
- 🔗 추천 결과 공유
  - Route Handler를 통해 추천 결과 데이터를 Map 객체(임시 저장소)에 저장 후, UUID를 반환해 링크를 단축
  - 반환된 UUID를 기반으로 공유 페이지의 URL 생성(+ 오늘의 메뉴 추천은 쿼리 파라미터에 메뉴 타입 포함)
    - navigator.clipboard를 사용해 버튼 클릭 시 URL이 클립보드에 복사되도록 구현
  - 해당 URL에 접속하면 GET 요청을 통해 추천 결과를 받아와 페이지에 표시
  - Kakao SDK for JavaScript를 활용한 feed 형식의 카카오톡 공유 기능 제공

</div>
</details>

<details>
<summary> 3️⃣ 우리동네 쓰레기 정보, 청년 정책 페이지 </summary>
<div markdown="1">

- 📅 지역별 쓰레기 배출 요일 조회
  - OpenAI API를 활용한 지역별 쓰레기 배출 일정 정보 제공
  - 내 위치 불러오기 기능을 통한 현재 위치 기반 정보 조회
  - 시/군/구/동 단위의 주소 검색 시스템 구현
  - 재활용, 일반, 대형, 음식물 쓰레기 등 종류별 배출 요일 안내

- 🥗 음식물 쓰레기 분류 확인 
  - OpenAI API를 활용한 음식물 쓰레기 판별 시스템 구현
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

</div>
</details>

<details>
<summary> 4️⃣ 꿀팁 게시판 페이지 </summary>
<div markdown="1">

- 📝 게시글 관리
  - Supabase를 활용한 게시글 CRUD 기능 제공
  - Day.js로 작성 일자를 직관적으로 표시
  - 키워드 검색을 통해 원하는 게시글을 빠르게 찾을 수 있는 기능 제공
  - 카테고리 필터링을 지원하여 원하는 주제의 게시글만 조회 가능
  - 최신순/인기순 정렬 기능으로 원하는 방식으로 게시글 정렬
  - 서버액션을 활용하여 게시글 수정 시 실시간 업데이트 적용
  - 페이지네이션 적용으로 사용자 편의성 향상

- 🧡 좋아요/댓글 기능
  - Supabase를 활용한 좋아요/댓글 CRUD 기능 제공
  - TanStack Query를 활용하여 전역 상태로 좋아요 및 댓글 데이터 관리
  - 낙관적 업데이트 적용으로 사용자 액션에 즉각적인 피드백 제공
  - 게시글별 좋아요 및 댓글 수 표시로 사용자 참여도 확인 가능
  - 댓글 작성자 뱃지 추가로 해당 게시글 작성자를 명확하게 구분

</div>
</details>

<details>
<summary> 5️⃣ 우리동네 핫플 페이지 </summary>
<div markdown="1">

- 🗺️ 지도 표시 
  - Kakao Map API를 활용하여 지도를 제공

- 📌 내 위치 표시 
  - Geolocation API를 사용하여 사용자의 현재 위치를 지도에 표시

- 🔍 지도 조작 기능
  - 지도 확대/축소 및 현재 위치로 이동할 수 있는 컨트롤 버튼 제공

- 🏢 카테고리별 장소 검색
  - 음식점, 편의점, 약국 등 다양한 카테고리 버튼 제공
  - 특정 카테고리 선택 시, 주변 해당 시설 검색 후 지도에 마커와 리스트로 표시

- 📍 마커 및 장소 정보
  - 검색된 장소를 지도 마커로 표시
  - 마커 클릭 시, 해당 장소의 상세 정보 제공

</div>
</details>


<br />

# 🎥 시연 영상
<details>
<summary>전체 페이지 웹과 반응형 시연</summary>
<div markdown="1">
  
![전체 페이지 웹과 반응형 시연](https://github.com/user-attachments/assets/b0c1259a-1c60-4157-947d-1dba145899b9)

</div>
</details>
<details>
<summary>로그인 및 회원가입</summary>
<div markdown="1">
  
![로그인 및 회원가입 페이지](https://github.com/user-attachments/assets/ffe0cc9a-6b44-445b-b3b0-7415cd2d8642)

</div>
</details>
<details>
<summary>마이페이지 프로필 정보 수정, 회원탈퇴, 로그아웃</summary>
<div markdown="1">
  
![마이페이지 프로필 정보 수정, 회원탈퇴, 로그아웃](https://github.com/user-attachments/assets/725ad71f-d4e9-4cfb-b17e-336a31175914)

</div>
</details>
<details>
<summary>마이페이지 좋아요, 댓글, 내가 쓴 글 목록 및 삭제</summary>
<div markdown="1">
  
![마이페이지 좋아요, 댓글, 내가 쓴 글 목록 및 삭제](https://github.com/user-attachments/assets/4b0f422a-acf7-4f21-8318-f9583f7ca0a0)

</div>
</details>
<details>
<summary>오늘의 메뉴 추천</summary>
<div markdown="1">
  
![음식 추천](https://github.com/user-attachments/assets/6031ee5e-42f2-4056-8aec-b21ad968c91c)

</div>
</details>
<details>
<summary>오늘의 운세</summary>
<div markdown="1">
  
![포춘 쿠키](https://github.com/user-attachments/assets/284771f9-e990-44b2-bad7-bf2183881159)

</div>
</details>
<details>
<summary>지역별 쓰레기 배출 정보 확인</summary>
<div markdown="1">

![쓰레기 페이지](https://github.com/user-attachments/assets/4a0f6c5b-03f9-4cd2-9c93-054a96d6782a)

</div>
</details>
<details>
<summary>음식물 쓰레기 여부 확인</summary>
<div markdown="1">

![음식물 페이지](https://github.com/user-attachments/assets/bf085dbc-164b-4876-ab3d-398b8ee3ab49)

</div>
</details>
<details>
<summary>청년 정책</summary>
<div markdown="1">
  
![청년 정책 페이지](https://github.com/user-attachments/assets/c856adb3-f0f6-472d-a984-5fd3cc71a2e7)

</div>
</details>
<details>
<summary>꿀팁 게시판 소개</summary>
<div markdown="1">
  
![꿀팁 게시판 페이지 소개](https://github.com/user-attachments/assets/9b95bdbb-5dde-49ff-af67-ec7ab2d5d92a)

</div>
</details>
<details>
<summary>꿀팁 게시판 댓글, 좋아요, 글작성 CRUD</summary>
<div markdown="1">
  
![꿀팁 게시판 댓글, 좋아요, 글작성 CRUD](https://github.com/user-attachments/assets/98cacfa0-4baa-4f1e-82fc-a783a94295d0)

</div>
</details>
<details>
<summary>동네 핫플</summary>
<div markdown="1">
  
![맵 페이지](https://github.com/user-attachments/assets/bd565316-5ca0-426d-991e-7234e0ddbdc6)

</div>
</details>

<br />

# 📅 Development Period
2024.12.31 ~ 2025.02.04

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


### ✔️ Hosting & Deployment

<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">

### ✔️ Version Control

<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

### ✔️ API
<img src="https://img.shields.io/badge/kakaomap-FFCD00?style=for-the-badge&logo=kakao&logoColor=white">
<img src="https://img.shields.io/badge/JavaScript SDK-FFCD00?style=for-the-badge&logo=kakao&logoColor=white">
<img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=OpenAI&logoColor=white">
<img src="https://img.shields.io/badge/청년정책API-073B5A?style=for-the-badge&logo=TanstackQuery&logoColor=white">
<img src="https://img.shields.io/badge/Navigator-006600?style=for-the-badge&logo=TanstackQuery&logoColor=white">



</div>

<br />

# 🌳 프로젝트 구조
```bash
📦src
 ┣ 📂app
 ┃ ┣ 📂api                     # API 요청 관련 로직
 ┃ ┣ 📂recommend               # 오늘의 메뉴 추천 페이지 (나머지 페이지들도 폴더 구조 동일)
 ┃ ┃ ┣ 📂_actions              # recommend에서 사용되는 서버 액션
 ┃ ┃ ┣ 📂_components           # recommend에서 사용되는 컴포넌트
 ┃ ┃ ┣ 📂_constants            # recommend에서 사용되는 상수
 ┃ ┃ ┣ 📂_hooks                # recommend에서 사용되는 훅
 ┃ ┃ ┣ 📂_layout               # recommend에서 사용되는 레이아웃
 ┃ ┃ ┣ 📂_types                # recommend에서 사용되는 타입
 ┃ ┃ ┣ 📂_utils                # recommend에서 사용되는 유틸 함수
 ┃ ┃ ┣ 📜error.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂fortune                 # 오늘의 운세 페이지
 ┃ ┣ 📂honeytips               # 꿀팁 게시판 페이지
 ┃ ┣ 📂map                     # 동네 핫플 페이지
 ┃ ┣ 📂mypage                  # 마이페이지
 ┃ ┣ 📂policy                  # 청년 정책 페이지
 ┃ ┣ 📂trash-guide             # 쓰레기 가이드 페이지
 ┃ ┣ 📂sign-in                 # 로그인 페이지
 ┃ ┣ 📂sign-up                 # 회원가입 페이지
 ┃ ┣ 📜global-error.tsx        
 ┃ ┣ 📜globals.css 
 ┃ ┣ 📜layout.tsx
 ┃ ┣ 📜not-found.tsx
 ┃ ┗ 📜page.tsx
 ┣ 📂assets
 ┃ ┣ 📂fonts
 ┃ ┗ 📂images
 ┣ 📂components                # 공통 컴포넌트
 ┣ 📂lib                       # 공통 type, util 함수
 ┣ 📂store                     # zustand 스토어
 ┣ 📜.eslintrc.json            # ESLint 설정 파일
 ┣ 📜.prettierrc               # Prettier 코드 포맷팅 설정
 ┣ 📜next.config.mjs           # Next.js 설정 파일
 ┣ 📜pull_request_template     # Pull request 템플릿
 ┗ 📜tailwind.config.ts        # TailwindCSS 설정 파일
```
