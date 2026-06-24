alter table public.transactions
  add column if not exists is_recurring boolean not null default false;

create index if not exists transactions_recurring_idx
  on public.transactions (user_id, is_recurring)
  where is_recurring = true;
