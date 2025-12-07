# 특허관리 시스템 (Patent Management System)

특허 출원, 등록, 관리를 위한 통합 특허관리 시스템입니다.

## 주요 기능

- **대시보드**: 특허 현황을 한눈에 파악 (출원중, 등록, 거절, 만료)
- **특허 목록**: 검색 및 필터링 (상태별, 분류별)
- **특허 등록**: 새 특허 정보 입력
- **특허 관리**: 상세 보기, 수정, 삭제

## 기술 스택

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Build Tool**: Vite
- **Form**: React Hook Form, Zod
- **State**: TanStack Query

## 로컬 환경 실행 방법

### 1. 사전 요구사항

- Node.js 18.x 이상
- npm 또는 bun

### 2. 저장소 클론

```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

### 3. 의존성 설치

```bash
# npm 사용 시
npm install

# 또는 bun 사용 시
bun install
```

### 4. 개발 서버 실행

```bash
# npm 사용 시
npm run dev

# 또는 bun 사용 시
bun run dev
```

### 5. 브라우저에서 확인

개발 서버가 실행되면 브라우저에서 다음 주소로 접속합니다:

```
http://localhost:8080
```

## 프로젝트 구조

```
src/
├── components/
│   ├── dashboard/          # 대시보드 컴포넌트
│   │   ├── Dashboard.tsx
│   │   └── StatCard.tsx
│   ├── layout/             # 레이아웃 컴포넌트
│   │   └── Header.tsx
│   ├── patent/             # 특허 관련 컴포넌트
│   │   ├── PatentCard.tsx
│   │   ├── PatentDialog.tsx
│   │   ├── PatentForm.tsx
│   │   └── PatentList.tsx
│   └── ui/                 # shadcn/ui 컴포넌트
├── data/
│   └── samplePatents.ts    # 샘플 데이터
├── hooks/                  # 커스텀 훅
├── lib/                    # 유틸리티 함수
├── pages/                  # 페이지 컴포넌트
│   ├── Index.tsx
│   └── NotFound.tsx
├── types/
│   └── patent.ts           # 타입 정의
├── App.tsx                 # 앱 라우팅
├── index.css               # 전역 스타일 (디자인 시스템)
└── main.tsx                # 앱 진입점
```

## 빌드

프로덕션 빌드를 생성하려면:

```bash
npm run build
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.

## 배포

Lovable에서 직접 배포하려면:
1. Lovable 에디터에서 **Publish** 버튼 클릭
2. **Share → Publish** 선택

## 라이선스

MIT License
