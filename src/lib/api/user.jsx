import instance from "~/lib/api/base";

export async function fetchSignUp(email, nickname, password) {
  const data = {
    email,
    nickname,
    password,
  };
  const response = await instance.post("/user/signup", data);
  return response;
}
