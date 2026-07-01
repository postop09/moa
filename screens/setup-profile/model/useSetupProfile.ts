import { useState } from 'react';

import { NICKNAME_MAX_LENGTH } from '../config/nickname';
import { useCreateProfile } from '../model/useCreateProfile';

export const useSetupProfile = () => {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const { mutate, isPending } = useCreateProfile();

  const handleSubmit = () => {
    const trimmed = nickname.trim();

    if (!trimmed) {
      setError('닉네임을 입력해주세요.');
      return;
    }

    if (trimmed.length > NICKNAME_MAX_LENGTH) {
      setError(`닉네임은 ${NICKNAME_MAX_LENGTH}자 이하로 입력해주세요.`);
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
  };
};
