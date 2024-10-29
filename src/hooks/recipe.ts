// import { AxiosResponse } from "axios";
// import { useState } from "react";
// import { instance } from "../config";
// import { IRECIPEPAYLOAD, IRECIPERESPONSE } from "./../@types/index";

// export const useRecipe = () => {
//   const [loading, setLoading] = useState<boolean>(false);

//   const searchRecipe = async (
//     q: string
//   ): Promise<AxiosResponse<IRECIPERESPONSE[] | []> | any> => {
//     try {
//       setLoading(true);
//       const response = await instance.get(`/recipe/find?q=${q}`);
//       if (response) {
//         return response?.data;
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addRecipe = async (payload: IRECIPEPAYLOAD): Promise<void> => {
//     const { note, ...rest } = payload;
//     const formData = new FormData();

//     const payloadToArray = Object.keys(rest);

//     for (const item of payloadToArray) {
//       formData.append(item, rest[item as keyof typeof rest]);
//     }
//     if (note) {
//       formData.append("note", note);
//     }

//     try {
//       setLoading(true);
//       await instance.post("/recipe/create", formData);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     loading,
//     addRecipe,
//     searchRecipe,
//   };
// };

import { AxiosResponse } from "axios";
import { useState } from "react";
import { instance } from "../config";
import { IRECIPEPAYLOAD, IRECIPERESPONSE } from "../@types/index";

export const useRecipe = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const searchRecipe = async (
    q: string
  ): Promise<IRECIPERESPONSE[]> => {  // Ensure it only returns an array
    try {
      setLoading(true);
      const response: AxiosResponse<IRECIPERESPONSE[]> = await instance.get(`/recipe/find?q=${q}`);
      
      // Log response data structure
      console.log("API Response Data:", response?.data);
      
      // Safely return an empty array if data is not an array
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Error fetching recipe:", error);
      return []; // Return an empty array in case of error
    } finally {
      setLoading(false);
    }
  };

  const addRecipe = async (payload: IRECIPEPAYLOAD): Promise<void> => {
    const { note, ...rest } = payload;
    const formData = new FormData();

    Object.keys(rest).forEach((key) => {
      formData.append(key, rest[key as keyof typeof rest]);
    });

    if (note) {
      formData.append("note", note);
    }

    try {
      setLoading(true);
      await instance.post("/recipe/create", formData);
    } catch (error) {
      console.error("Error adding recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    addRecipe,
    searchRecipe,
  };
};
