alter table public.categories
  add column if not exists budget numeric(12, 2);
