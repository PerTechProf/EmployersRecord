import { selectToken } from "../store/authReducer";
import { store } from "../store";

const request =
  (url, postBody, getArgs, method) => fetch(url 
      + (getArgs ? `?${Object.entries(getArgs)
        .map(arg => arg[0]+'='+arg[1]).join('&')}`
      : ''),
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${selectToken(store.getState())}`
      },
      method: method,
      body: postBody && JSON.stringify(postBody)
    }
  );

export const post = 
  (url, body) => request(url, body, null, 'POST');

export const get =
  (url, body) => request(url, null, body, 'GET');

export const getApplications = async () =>
  await (await get("api/Applications/GetApplications")).json()

export default {
  get,
  post,
  getApplications
}