-- Moa 가계부 초기 스키마
-- Supabase SQL Editor에서 실행하세요.

-- 카테고리 (수입/지출 분류)
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  type text not null check (type in ('income', 'expense')),
  icon text,
  color text,
  sort_order int not null default 0,
  budget numeric(12, 2),
  created_at timestamptz not null default now()
);

-- 거래 내역
create table public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  category_id uuid references public.categories (id) on delete set null,
  name text not null,
  type text not null check (type in ('income', 'expense')),
  amount numeric(12, 2) not null check (amount > 0),
  memo text,
  transaction_date date not null default current_date,
  is_recurring boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index transactions_user_date_idx
  on public.transactions (user_id, transaction_date desc);

create index transactions_user_type_idx
  on public.transactions (user_id, type);

-- updated_at 자동 갱신
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger transactions_set_updated_at
  before update on public.transactions
  for each row execute function public.set_updated_at();

-- RLS
alter table public.categories enable row level security;
alter table public.transactions enable row level security;

create policy "categories_select_own"
  on public.categories for select
  using (auth.uid() = user_id);

create policy "categories_insert_own"
  on public.categories for insert
  with check (auth.uid() = user_id);

create policy "categories_update_own"
  on public.categories for update
  using (auth.uid() = user_id);

create policy "categories_delete_own"
  on public.categories for delete
  using (auth.uid() = user_id);

create policy "transactions_select_own"
  on public.transactions for select
  using (auth.uid() = user_id);

create policy "transactions_insert_own"
  on public.transactions for insert
  with check (auth.uid() = user_id);

create policy "transactions_update_own"
  on public.transactions for update
  using (auth.uid() = user_id);

create policy "transactions_delete_own"
  on public.transactions for delete
  using (auth.uid() = user_id);

-- 기본 카테고리 시드 (회원가입 후 user_id로 insert하는 함수 예시)
create or replace function public.seed_default_categories()
returns trigger as $$
begin
  insert into public.categories (user_id, name, type, icon, color, sort_order) values
    (new.id, '급여', 'income', 'wallet', '#2563EB', 1),
    (new.id, '부수입', 'income', 'trending-up', '#2563EB', 2),
    (new.id, '식비', 'expense', 'restaurant', '#EF4444', 1),
    (new.id, '교통', 'expense', 'directions-car', '#EF4444', 2),
    (new.id, '쇼핑', 'expense', 'shopping-bag', '#EF4444', 3),
    (new.id, '주거', 'expense', 'home', '#EF4444', 4),
    (new.id, '기타', 'expense', 'more-horiz', '#EF4444', 5);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.seed_default_categories();
