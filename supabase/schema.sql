-- Moa 가계부 스키마
-- Supabase SQL Editor에서 실행하세요.

-- 프로필
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  nickname text not null
);

-- 가구
create table public.household (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid not null references public.profiles (id) on delete cascade
);

-- 가구 구성원
create table public.household_member (
  id uuid primary key default gen_random_uuid(),
  household_id uuid not null references public.household (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  unique (household_id, user_id)
);

create index household_member_user_id_idx
  on public.household_member (user_id);

create index household_owner_id_idx
  on public.household (owner_id);

-- RLS
alter table public.profiles enable row level security;
alter table public.household enable row level security;
alter table public.household_member enable row level security;

-- profiles: 본인 프로필만 조회·수정
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- household: 소유자 또는 구성원만 조회
create policy "household_select_member"
  on public.household for select
  using (
    auth.uid() = owner_id
    or exists (
      select 1
      from public.household_member hm
      where hm.household_id = household.id
        and hm.user_id = auth.uid()
    )
  );

create policy "household_insert_owner"
  on public.household for insert
  with check (auth.uid() = owner_id);

create policy "household_update_owner"
  on public.household for update
  using (auth.uid() = owner_id);

create policy "household_delete_owner"
  on public.household for delete
  using (auth.uid() = owner_id);

-- household_member: 같은 가구 구성원만 조회
create policy "household_member_select"
  on public.household_member for select
  using (
    exists (
      select 1
      from public.household_member hm
      where hm.household_id = household_member.household_id
        and hm.user_id = auth.uid()
    )
  );

create policy "household_member_insert_owner"
  on public.household_member for insert
  with check (
    exists (
      select 1
      from public.household h
      where h.id = household_member.household_id
        and h.owner_id = auth.uid()
    )
    or auth.uid() = household_member.user_id
  );

create policy "household_member_delete_owner"
  on public.household_member for delete
  using (
    exists (
      select 1
      from public.household h
      where h.id = household_member.household_id
        and h.owner_id = auth.uid()
    )
    or auth.uid() = household_member.user_id
  );
