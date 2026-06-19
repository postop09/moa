# 모아 (MoA)

Expo + React Native 기반 모바일 앱 프로젝트입니다. [Expo Router](https://docs.expo.dev/router/introduction/)로 라우팅을 처리하고, [Feature-Sliced Design (FSD)](https://feature-sliced.design/) 아키텍처로 코드를 구성합니다.

## 시작하기

```bash
pnpm install
pnpm start
```

| 명령어               | 설명               |
| -------------------- | ------------------ |
| `pnpm start`         | 개발 서버 실행     |
| `pnpm android`       | Android 에뮬레이터 |
| `pnpm ios`           | iOS 시뮬레이터     |
| `pnpm web`           | 웹 브라우저        |
| `pnpm lint`          | ESLint 검사        |
| `pnpm lint -- --fix` | ESLint 자동 수정   |

## FSD 아키텍처

| 명칭               | 설명                             | 예시                                                                 |
| ------------------ | -------------------------------- | -------------------------------------------------------------------- |
| 레이어(Layers)     | 규격화 되어있는 최상위 층계      | `app`, `entities`, `pages(screens)`, `widgets`, `features`, `shared` |
| 슬라이스(Slices)   | 비즈니스 도메인 별 구분하는 층계 | `home`, `login`, ...                                                 |
| 세그먼트(Segments) | 코드의 용도에 따른 그룹화 층계   | `ui`, `api`, `config`, `lib`, `model`                                |

- 모든 레이어를 사용할 필요는 없으며, 현 프로젝트에서는 pages -> screens 로 대체하여 사용합니다.
- 세그먼트 이름은 표준으로 제한된 것은 아니며, 필요하다면 추가합니다.

### 레이어 역할

`app` 레이어의 원래 역할은 앱이 실행하는 기본적인 요소들을 배치하는 곳 이지만, 현 프로젝트에서는 라우팅 폴더로 사용합니다.

| 레이어     | 역할                                       | 예시                            |
| ---------- | ------------------------------------------ | ------------------------------- |
| `app`      | URL ↔ 화면 연결, 레이아웃·네비게이션 설정  | `(tabs)/index.tsx` → `HomePage` |
| `screens`  | 페이지 단위 UI 조합                        | `HomePage`, `ExplorePage`       |
| `widgets`  | 대규모의 독립적인 기능 또는 UI             | `ParallaxScrollView`            |
| `features` | 재사용 가능한 비즈니스 핵심 액션·기능·로직 | `Collapsible`, `HapticTab`      |
| `entities` | 도메인 모델, API                           | (추가 예정)                     |
| `shared`   | 프로젝트 전역 공용 코드                    | `ThemedText`, `useColorScheme`  |

## 1. 프로젝트 구조

```
moa/
├── app/                  # 라우팅 레이어 (Expo Router)
│   ├── _layout.tsx       # 루트 레이아웃
│   ├── (tabs)/           # 탭 네비게이션
│   └── modal.tsx         # 모달 화면
│
├── screens/              # 페이지 (FSD pages)
│   ├── home/
│   ├── explore/
│   └── modal/
│
├── widgets/              # 독립적인 UI 블록
│   └── parallax-scroll-view/
│
├── features/             # 사용자 기능 단위
│   ├── collapsible/
│   └── haptic-tab/
│
├── entities/             # 비즈니스 엔티티
│
├── shared/               # 공용 코드
│   ├── assets/           # 이미지, 아이콘 등 정적 리소스
│   ├── config/           # 테마, 상수
│   ├── lib/              # 훅, 유틸
│   └── ui/               # 공용 UI 컴포넌트
│
├── scripts/              # 프로젝트 스크립트
├── eslint.config.js
├── .prettierrc
└── tsconfig.json
```

### 슬라이스 내부 구조

각 슬라이스는 세그먼트 폴더와 루트 `index.ts`(Public API)로 구성합니다.

```
features/collapsible/
├── index.ts              # export { Collapsible } from './ui/collapsible'
└── ui/
    └── collapsible.tsx
```

### 경로 별칭

`tsconfig.json`의 `@/*` 별칭으로 레이어 간 import를 수행합니다.

```ts
import { Collapsible } from '@/features/collapsible';
import { ThemedText } from '@/shared/ui';
import { ParallaxScrollView } from '@/widgets/parallax-scroll-view';
```

## 2. FSD 아키텍처 개발 원칙

### 레이어 의존성 규칙

상위 레이어만 하위 레이어를 import할 수 있습니다. **역방향·동일 레이어 간 직접 참조는 금지**합니다.

```
app → screens → widgets → features → entities → shared
```

| 허용                                        | 금지                   |
| ------------------------------------------- | ---------------------- |
| `screens` → `features`, `widgets`, `shared` | `features` → `screens` |
| `app` → `screens`, `features`, `shared`     | `shared` → `features`  |
| `widgets` → `features`, `shared`            | `features` → `widgets` |

### Public API

- 슬라이스 외부에서는 **반드시 슬라이스 루트 `index.ts`** 를 통해 import합니다.
- 내부 파일(`ui/`, `model/` 등)을 직접 import하지 않습니다.

```ts
// ✅ Good
import { Collapsible } from '@/features/collapsible';

// ❌ Bad
import { Collapsible } from '@/features/collapsible/ui/collapsible';
```

### `app/` 레이어 역할 분리

`app/`은 라우팅과 네비게이션 설정만 담당합니다. 페이지 UI 로직은 `screens/`에 둡니다.

```tsx
// app/(tabs)/index.tsx
import { HomePage } from '@/screens/home';

export default HomePage;
```

### 세그먼트 네이밍

| 세그먼트 | 용도                     |
| -------- | ------------------------ |
| `ui/`    | 컴포넌트, 스타일         |
| `model/` | 상태, 비즈니스 로직, API |
| `lib/`   | 슬라이스 내부 유틸       |
| `api/`   | 서버 통신                |

현재 프로젝트는 `ui/` 세그먼트 위주로 구성되어 있으며, 기능이 커지면 `model/`, `api/` 세그먼트를 추가합니다.

## 3. 린트 설정

ESLint Flat Config + Prettier 조합을 사용합니다.

### 구성

| 패키지                   | 역할                                         |
| ------------------------ | -------------------------------------------- |
| `eslint-config-expo`     | Expo/React/Import 기본 규칙                  |
| `typescript-eslint`      | TypeScript 권장 규칙 (`configs.recommended`) |
| `eslint-plugin-prettier` | Prettier 포맷을 ESLint 규칙으로 실행         |
| `eslint-config-prettier` | ESLint 포맷 규칙과 Prettier 충돌 방지        |

```js
// eslint.config.js
export default defineConfig([
  expoConfig,
  ...configs.recommended,
  eslintPluginPrettierRecommended,
  { ignores: ['dist/*'] },
]);
```

### Prettier 옵션 (`.prettierrc`)

| 옵션            | 값     |
| --------------- | ------ |
| `semi`          | `true` |
| `singleQuote`   | `true` |
| `trailingComma` | `all`  |
| `printWidth`    | `80`   |
| `tabWidth`      | `2`    |

### 대표 Rules

#### TypeScript (`typescript-eslint` + `eslint-config-expo`)

| 규칙                                            | 수준  | 설명                                |
| ----------------------------------------------- | ----- | ----------------------------------- |
| `@typescript-eslint/no-unused-vars`             | warn  | 미사용 변수 검사 (인자는 제외)      |
| `@typescript-eslint/no-require-imports`         | warn  | `require()` 금지 (에셋 import 예외) |
| `@typescript-eslint/no-dupe-class-members`      | error | 중복 클래스 멤버                    |
| `@typescript-eslint/array-type`                 | warn  | 배열 타입은 `T[]` 형식 사용         |
| `@typescript-eslint/consistent-type-assertions` | warn  | 타입 단언은 `as` 스타일 사용        |

#### React (`eslint-config-expo`)

| 규칙                          | 수준  | 설명                    |
| ----------------------------- | ----- | ----------------------- |
| `react-hooks/rules-of-hooks`  | error | Hook 호출 규칙          |
| `react-hooks/exhaustive-deps` | warn  | useEffect 의존성 배열   |
| `react/react-in-jsx-scope`    | off   | React 17+ 자동 JSX 변환 |

#### Import (`eslint-plugin-import`)

| 규칙                   | 수준  | 설명                           |
| ---------------------- | ----- | ------------------------------ |
| `import/first`         | warn  | import를 파일 최상단에 배치    |
| `import/no-unresolved` | error | 존재하지 않는 모듈 import 방지 |

#### 공통 (`eslint-config-expo`)

| 규칙       | 수준  | 설명                         |
| ---------- | ----- | ---------------------------- |
| `eqeqeq`   | warn  | `===` 사용 권장              |
| `no-var`   | error | `var` 금지                   |
| `no-undef` | error | 정의되지 않은 변수 사용 금지 |

#### Prettier (`eslint-plugin-prettier`)

| 규칙                | 수준  | 설명                                 |
| ------------------- | ----- | ------------------------------------ |
| `prettier/prettier` | error | `.prettierrc` 기준 포맷 위반 시 에러 |

### 린트 대상

```bash
# → app, screens, shared, features, widgets, entities
pnpm lint
pnpm lint -- --fix
```

## 참고

- [Expo 문서](https://docs.expo.dev/)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [Expo ESLint 가이드](https://docs.expo.dev/guides/using-eslint/)
