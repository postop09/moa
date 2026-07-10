export const authQueryKeys = {
  profile: (userId: string) => ['profile', userId] as const,
};
