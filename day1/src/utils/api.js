import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export async function register(data) {
  const urlGet = await axiosClient.post("/auth/register", data);
  return urlGet;
}
export async function login(nm, password) {
  const loginData = await axiosClient.post("/auth/login", {
    name: nm,
    password,
  });
  return loginData;
}

export async function filterNotes(param) {
  const filter = await axiosClient.get(`/notes?author=${param}`);
  return filter;
}

export async function getAllNotes() {
  const result = await axiosClient.get("/notes");
  return result;
}
export async function getById(id) {
  const saveData = await axiosClient.get(`/notes/${id}`);
  return saveData;
}

export async function addNotes(data, token) {
  const response = await axiosClient.post("/notes", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

export async function upadateNotes(id, data, token, name) {
  const saveData = await axiosClient.put(
    `/notes/${id}`,
    {
      title: data.title,
      description: data.description,
      author: name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return saveData;
}
export async function destroy(id, token) {
  const hapus = await axiosClient.delete(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return hapus;
}
