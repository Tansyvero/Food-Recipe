// import axios from "axios";
// import cogoToast from "cogo-toast";

// export const instance = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL_DEV,
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//   },
// });

// instance.interceptors.request.use(
//   (config) => {
//     let authState = window.sessionStorage.getItem("token");

//     config.headers.Authorization = `Bearer ${authState}`;
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       sessionStorage.clear();
//       cogoToast.warn("Session timed out");
//       window.location.href = "/";
//     }
//     return Promise.reject(error);
//   }
// );

// instance.interceptors.response.use(
//   (response) => {
//     if (response.status === 200) {
//       if (response.data.message === "" || response.data.message === undefined) {
//         console.log("");
//       } else {
//         cogoToast.success(response.data.message);
//       }
//     }
//     return response;
//   },
//   (error) => {
//     if (!error?.response?.data) {
//       return;
//     }
//     if (error.response.status >= 300) {
//       return cogoToast.error(
//         !!error.response.data.error
//           ? error.response.data.error
//           : "check your internet connection"
//       );
//     }
//     return Promise.reject(error);
//   }
// );

import axios from "axios";
import cogoToast from "cogo-toast";

// Ensure the environment variable is defined in your .env file
const baseURL = process.env.VITE_BASE_URL_DEV; // Use process.env for non-Vite setups

// Check if baseURL is defined
if (!baseURL) {
  console.error("VITE_BASE_URL_DEV is not defined in .env file.");
}

// Create an Axios instance
export const instance = axios.create({
  baseURL, // Use the base URL defined above
  headers: {
    "Access-Control-Allow-Origin": "*", // Allows requests from any origin
  },
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    const authToken = window.sessionStorage.getItem("token"); // Get the token from session storage
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`; // Attach the token to headers
    }
    return config;
  },
  (error) => Promise.reject(error) // Handle request errors
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    // Check for response status and show success toast if needed
    if (response.status === 200 && response.data.message) {
      cogoToast.success(response.data.message);
    }
    return response; // Return response
  },
  (error) => {
    // Handle unauthorized access (401)
    if (error.response?.status === 401) {
      sessionStorage.clear(); // Clear session storage
      cogoToast.warn("Session timed out"); // Show warning toast
      window.location.href = "/"; // Redirect to home
    }
    // Handle errors with response status >= 300
    if (error.response) {
      cogoToast.error(
        error.response.data.error || "Check your internet connection"
      );
    }
    return Promise.reject(error); // Reject the promise with the error
  }
);
