import { store } from "../store";
import { selectToken, setToken } from "../store/authReducer";

const request =
  async (controller, apiMethod, postBody, getArgs, method) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    const token = selectToken(store.getState());

    if (token)
      headers['Authorization'] = `Bearer ${token}`;

    return await (await fetch("api/" + controller + "/" + apiMethod 
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
  (conroller, method, body) => request(conroller, method, body, null, 'POST');

export const get =
  (controller, method, body) => request(controller, method, null, body, 'GET');

export const applications = {
  controller: "Applications",
  getApplications: () =>
    get(this.controller,"GetApplications")
}

export const auth = {
  controller: "Auth",
  login: async (email, password) =>
    store.dispatch(
      setToken(
        (await post(this.controller, "Login", 
          {email, password})
        ).token
      )
    ),
  createEmployer: function(name, position, email, password, 
    phoneNumber, hireDate = new Date().toISOString(), id = null
  ) {
      return post(this.controller, "CreateEmployer", {
        name,
        position,
        email,
        password,
        phoneNumber,
        hireDate,
        id
      })
  }
}

export default {
  get,
  post,
  auth,
  applications
}