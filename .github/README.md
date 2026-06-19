# GitHub 설정 가이드

저장소에 워크플로를 push한 뒤 아래 설정을 적용하세요.

## 1. 이슈 라벨 생성

**Settings → Labels**에서 다음 라벨을 추가합니다.

| 라벨 | 색상 | 용도 |
|------|------|------|
| `bug` | `#d73a4a` | 버그 |
| `enhancement` | `#a2eeef` | 기능 요청 |
| `task` | `#0075ca` | 일반 작업 |
| `needs-triage` | `#fbca04` | 분류 대기 |

## 2. 브랜치 보호 (main)

**Settings → Branches → Add branch protection rule**

- Branch name pattern: `main`
- ✅ Require a pull request before merging
- ✅ Require status checks to pass before merging
  - `Lint`
  - `Typecheck`
  - `ESLint Review` (선택)
- ✅ Require branches to be up to date before merging

## 3. 워크플로

| 워크플로 | 트리거 | 역할 |
|----------|--------|------|
| `ci.yml` | PR / push to `main` | ESLint + TypeScript 검사 |
| `pr-review.yml` | PR opened/sync | reviewdog ESLint PR 리뷰 코멘트 |
| `pr-auto-summary.yml` | PR opened/sync | 커밋·변경 파일·FSD 레이어 자동 삽입 |
| `issue-management.yml` | 이슈 생성·수정 | 제목 접두사 기반 라벨 자동 부여 |

## 4. 이슈 템플릿

- **버그 리포트** — `[Bug]` 접두사
- **기능 요청** — `[Feature]` 접두사
- **작업 요청** — `[Task]` 접두사

GitHub **Issues → New issue**에서 선택할 수 있습니다.

## 5. PR 자동 요약

`pr-auto-summary.yml`이 PR 본문을 자동 갱신합니다.

**`<!-- START auto-generated -->` 구간**
- 커밋 목록
- 변경 파일 목록 (A/M/D/R)
- FSD 레이어 변경 감지 체크리스트

**`<!-- START related-issue -->` 구간 (Related Issue)**
- PR 커밋 메시지에서 `Closes #N`, `Refs #N` 감지
- 브랜치명 `feat/12-home` 형태에서 이슈 번호 추출 → `Refs #12`
- `Closes`가 `Refs`보다 우선 (같은 이슈에 둘 다 있으면 `Closes` 사용)

`Summary` 등 마커 밖 섹션은 직접 작성하거나 Cursor Agent에게 요청하세요.
