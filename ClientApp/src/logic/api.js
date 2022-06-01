import { store } from "../store";
import { selectToken, setToken } from "../store/authReducer";

const request =
  async (url, postBody, getArgs, method) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    const token = selectToken(store.getState());

    if (token)
      headers['Authorization'] = `Bearer ${token}`;

    return await (await fetch(url 
        + (getArgs ? `?${Object.entries(getArgs)
          .map(arg => arg[0]+'='+arg[1]).join('&')}`
        : ''),
      {
        headers,
        method: method,
        body: postBody && JSON.stringify(postBody)
      }
    )).json();
}

export const post = 
  (url, body) => request(url, body, null, 'POST');

export const get =
  (url, body) => request(url, null, body, 'GET');

export const getApplications = () =>
  get("api/Applications/GetApplications")

export const login = async (email, password) =>
  store.dispatch(
    setToken(
      (await post("api/Auth/Login", 
        {email, password})
      ).token
    )
  );

export default {
  get,
  post,
  getApplications
}