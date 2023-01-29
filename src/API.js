const apiPrefix = "http://localhost:8000";

export const apiEndpoint = (endpoint) => `${apiPrefix}/${endpoint}/`;

export const apiRequest = (
  endpoint,
  method = "get",
  session = {},
  data = undefined
) => {
  const endpoint_ = apiEndpoint(endpoint);
  method = method.toUpperCase();

  const options = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  if (session.access) {
    options.headers.Authorization = `Bearer ${session.access}`;
  }

  if (data) {
    options.body = JSON.stringify(data);
  }

  return fetch(endpoint_, options)
    .then(async (response) => {
      const data = await response.json();

      if (response.status !== 200) {
        return Promise.reject({
          status: response.status,
          data: data,
        });
      }

      return Promise.resolve(data);
    })
    .catch((error) => {
      if (error.data) {
        return Promise.reject(error);
      } else {
        return Promise.reject({
          status: 500,
          data: { detail: "Unable to contact API" },
        });
      }
    });
};

export const apiRefresh = (token) => {
  const endpoint = apiEndpoint("auth/refresh");
  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh: token,
    }),
  }).then((response) => response.json());
};

export const apiLogin = (user, password) => {
  return apiRequest("auth", "post", {}, { user, password });
};
