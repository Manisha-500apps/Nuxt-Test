// Custom Auth Fetch Composable
export const useAuthLazyFetch = (
  request: any,
  options: any | undefined | null
) => {
  return useLazyFetch(request, {
    onRequest({ request, options }) {
      // Set the request headers
      options.headers = {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1IjoiMmJmODExOGI3YzQ0NGY0MmJhZTZhMWEzZGM4YTkyNGMiLCJkIjoiMTY4MDA3OSIsInIiOiJzYSIsInAiOiJmcmVlIiwiYSI6ImZpbmRlci5pbyIsImwiOiJ1czEiLCJleHAiOjE2ODMyNzg0MzR9.FZ6znzedQJY3QMxQrhTMAGZ97sS9tlyj8iHJaO4BhrQ`,
      };
    },

    onRequestError({ request, options, error }) {
      // Handle the request errors
      console.error("Error making request:", error);
    },

    onResponse({ request, response, options }) {
      // Process the response data
      if (response.status === 200) {
        return response._data;
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    },

    onResponseError({ request, response, options }) {
      // Handle the response errors
      console.error("Error in response:", response);
      throw new Error("Error processing response");
    },

    // Spread any additional options passed into the useAuthFetch function
    ...options,
  });
};

/* NOT TESTED */
export const useAuthLazyFetchPut = (
  request: any,
  options: any | undefined | null
) => {
  return useAuthLazyFetch(request, { ...options, method: "put" });
};
export const useAuthLazyFetchPost = (
  request: any,
  options: any | undefined | null
) => {
  return useAuthLazyFetch(request, { ...options, method: "post" });
};
export const useAuthLazyFetchDelete = (
  request: any,
  options: any | undefined | null
) => {
  return useAuthLazyFetch(request, { ...options, method: "delete" });
};
