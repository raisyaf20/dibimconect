// import user, { postUser } from "../utils/api";

export default async function authService(name, pw) {
  try {
    const response = await user();
    const validate = response.data?.find(
      (e) => e.username === name && e.password === pw
    );
    if (validate !== undefined) {
      const orang = {
        name: validate.username,
        token: validate.token,
      };
      localStorage.setItem("authToken", JSON.stringify(orang));

      window.location.assign("/dashboard");
      return true;
    } else {
      console.log("susc");
      throw new Error("Username and password wrong");
      return false;
    }
  } catch (error) {
    console.error("Error while authenticating:", error);
    return false;
  }
}

export function regis(name, pw) {
  let id = 1;
  const rand = () => {
    return Math.random().toString(36).substr(2);
  };

  const token = () => {
    return rand() + rand();
  };
  postUser(name, pw, token())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}
