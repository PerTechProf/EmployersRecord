import { store } from "../store";
import { selectToken, setUser } from "../store/authReducer";

const authController = "Auth";
const applicationsController = "Applications";
const reportsController = "Reports";

const request =
  async (controller, apiMethod, postBody, getArgs, method, isJSON) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    const token = selectToken(store.getState());

    if (token)
      headers['Authorization'] = `Bearer ${token}`;

    let response = await fetch("api/" + controller + "/" + apiMethod 
        + (getArgs ? `?${Object.entries(getArgs)
          .map(arg => arg[0]+'='+arg[1]).join('&')}`
        : ''),
      {
        headers,
        method: method,
        body: postBody && JSON.stringify(postBody)
      }
    );

    if (isJSON)
      return await response.json();
    return response;
}

export const post = 
  (conroller, method, body, isJSON=true) => request(conroller, method, body, null, 'POST', isJSON);

export const get =
  (controller, method, body, isJSON=true) => request(controller, method, null, body, 'GET', isJSON);

export const applications = {
  getApplications: () =>
    get(applicationsController,"GetApplications"),

  postApplication: (name, type, content) =>
    post(applicationsController, "PostApplication", {
      name,
      type,
      content
    }, false),
  
  approveApplication: (id) =>
    post(applicationsController, `ApproveApplication/${id}`, null, false),
  
  rejectApplication: (id) =>
    post(applicationsController, `RejectApplication/${id}`, null, false),
}

export const reports = {
  getReports: () =>
    get(reportsController,"GetReports")
}

export const auth = {
  login: async function(email, password) {
    store.dispatch(
      setUser(
        await post(
          authController, 
          "Login", 
          {email, password}
        )
      )
    )
  },

  logout: async () => {
    await post(authController, "Logout", null, false);
    store.dispatch(setUser(null));
  },

  createEmployer: (name, position, email, password, phoneNumber) =>
      post(authController, "CreateEmployer", {
        name,
        position,
        email,
        password,
        phoneNumber
      }, false),

  editEmployer: (id, name, position, email, phoneNumber, hireDate, fireDate) =>
      post(authController, "EditEmployer", {
        id,
        name,
        position,
        email,
        phoneNumber,
        hireDate,
        fireDate: fireDate
      }, false),

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