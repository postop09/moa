import { useState } from 'react';

export const useHouseholdNameForm = () => {
  const [householdName, setHouseholdName] = useState('');
  const [error, setError] = useState('');

  const clearError = () => {
    setError('');
  };

  const validate = () => {
    const trimmedName = householdName.trim();

    if (!trimmedName) {
      setError('가계부 이름을 입력해주세요.');
      return null;
    }

    return trimmedName;
  };

  return {
    householdName,
    setHouseholdName,
    error,
    clearError,
    validate,
  };
};
