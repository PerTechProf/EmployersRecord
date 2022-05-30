import { selectToken } from "../store/authReducer";
import { store } from "../store";

const request =
  async (url, postBody, getArgs, method) => await (await fetch(url 
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
  )).json();

export const post = 
  (url, body) => request(url, body, null, 'POST');

export const get =
  (url, body) => request(url, null, body, 'GET');

export const getApplications = async () =>
  await get("api/Applications/GetApplications")

export default {
  get,
  post,
  getApplications
}