-- profiles, household, household_member 스키마로 전환

drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.seed_default_categories();
drop function if exists public.set_updated_at() cascade;

drop table if exists public.transactions cascade;
drop table if exists public.categories cascade;
drop table if exists public.household_member cascade;
drop table if exists public.household cascade;
drop table if exists public.profiles cascade;

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  nickname text not null
);

create table public.household (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid not null references public.profiles (id) on delete cascade
);

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

alter table public.profiles enable row level security;
alter table public.household enable row level security;
alter table public.household_member enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

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

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, nickname)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      split_part(coalesce(new.email, 'user'), '@', 1)
    )
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
