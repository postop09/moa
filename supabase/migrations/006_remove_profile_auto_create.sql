-- 프로필은 앱에서 닉네임 입력 후 생성

drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();
