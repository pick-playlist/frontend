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

export async function fetchGuestLogIn(nickname) {
  const data = {
    nickname,
  };

  const response = await instance.post("/user/guest-login", data);
  return response;
}

export async function fetchUser(userId) {
  const response = await instance.get(`/user/${userId}`);
  return response;
}
