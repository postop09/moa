-- 기존 DB에 name 컬럼 추가
alter table public.transactions
  add column if not exists name text;

update public.transactions
set name = coalesce(memo, '거래')
where name is null;

alter table public.transactions
  alter column name set not null;
