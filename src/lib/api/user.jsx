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

export async function fetchLogIn(email, password) {
  const data = {
    email,
    password,
  };

  const response = await instance.post("/user/login", data);
  return response;
}
