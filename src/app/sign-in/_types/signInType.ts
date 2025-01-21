export type FormData = {
  email: string;
  nickname: string;
  password: string;
  checkPassword: string;
};

export type SignUpPayload = {
  email: string;
  password: string;
  nickname: string;
};


export type SignInPayload ={
  email: string;
  password: string;
}