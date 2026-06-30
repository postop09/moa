import { useState } from 'react';

import { signOutFromSetup, useCreateProfile } from '../model/useCreateProfile';

export function useSetupProfile() {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const { mutate, isPending } = useCreateProfile();

  const handleSubmit = () => {
    const trimmed = nickname.trim();

    if (!trimmed) {
      setError('닉네임을 입력해주세요.');
      return;
    }

    if (trimmed.length > 20) {
      setError('닉네임은 20자 이하로 입력해주세요.');
      return;
    }

    setError('');
    mutate(trimmed);
  };

  return {
    nickname,
    setNickname,
    error,
    setError,
    isPending,
    handleSubmit,
    handleSignOut: signOutFromSetup,
  };
}
