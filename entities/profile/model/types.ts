export type Profile = {
  id: string;
  email: string;
  nickname: string;
};

export type CreateProfileInput = {
  nickname: string;
};

export type UpdateProfileInput = {
  nickname: string;
};
