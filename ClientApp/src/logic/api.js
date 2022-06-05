import { store } from "../store";
import { selectToken, setToken } from "../store/authReducer";

const authController = "Auth";
const applicationsController = "Applications";
const reportsController = "Reports";

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
  getApplications: () =>
    get(applicationsController,"GetApplications"),

  postApplication: (name, type, content) =>
    post(applicationsController, "PostApplication", {
      name,
      type,
      content
    })
}

export const reports = {
  getReports: () =>
    get(reportsController,"GetReports")
}

export const auth = {
  login: async function(email, password) {
    store.dispatch(
      setToken(
        (await post(authController, "Login", 
          {email, password})
        ).token
      )
    )
  },
  createEmployer: function(name, position, email, password, 
    phoneNumber, hireDate = new Date().toISOString(), id = null
  ) {
      return post(authController, "CreateEmployer", {
        name,
        position,
        email,
        password,
        phoneNumber,
        hireDate,
        id
      })
  },
  getEmployers: () => 
    get(authController, "GetEmployers"),

  getUserInfo: () =>
    get(authController, "GetUserInfo")
}

export default {
  get,
  post,
  auth,
  applications,
  reports
}