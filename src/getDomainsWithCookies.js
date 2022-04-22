// import CMP_Section from "./cookies";
// import CMP_Section from "./utils/logic.js";

import axios from "axios";
import {
  ANALYTICAL,
  CMP_API_BASE_URL,
  MARKETING,
  NECESSARY,
  OTHER,
  PREFERENCES,
} from "./constants";
import { setCookie } from "./utils/cookie";
import { filterCookiesByCategory } from "./utils/logic";

export let categories = [];
export let responseData = [];
export let cookiesPerCategory = [];
export let filteredCookiesPerDomain = [];

export const getCookies = async () => {
  let filteredCookiesPerCategory = [];
  let config = {
    method: "GET",
    url: `${CMP_API_BASE_URL}/GetAllCookiesByDomainId?domainId=135`,
  };
  try {
    const response = await axios(config);
    cookiesPerCategory = response.data;
    return cookiesPerCategory;
  } catch (error) {
    console.log(error.message);
  }
  return cookiesPerCategory;
};
export const getCookiesPerCategory = async (categoryId, domainId) => {
  // let domainId = "135";
  // let categoryId = "1";
  const config = {
    method: "GET",
    url: `${CMP_API_BASE_URL}/GetCookiesByCategoryHalabaku?domainId=${domainId}&categoryId=${categoryId}`,
  };
  try {
    const cookies = await axios(config);
    console.log("COOKIES", cookies.data);
    return cookies.data;
  } catch (error) {
    console.error(error.message);
  }
};
export const saveNecessaryCookies = () => {
  let config = {
    method: "GET",
    url: `${CMP_API_BASE_URL}/GetAllCookiesByDomainId?domainId=135`,
  };
  axios(config)
    .then(function (response) {
      const data = response.data;
      data.filter((cookie) => {
        if (cookie.categoryId === 5) {
          setCookie(
            cookie.name, // name
            cookie.value, // value
            // "", // value
            cookie.expiryDays, // expiration day
            cookie.domain, // domain
            cookie.path, // path
            cookie.is_secure // is secure
          );
        } else {
          return;
        }
      });
      return filteredCookiesPerDomain;
    })
    .catch(function (err) {
      console.log(err.message);
    });
};
export const saveSpecificCookies = (id) => {
  let config = {
    method: "GET",
    url: `${CMP_API_BASE_URL}/GetAllCookiesByDomainId?domainId=135`,
  };
  axios(config)
    .then(function (response) {
      const data = response.data;
      data.filter((cookie) => {
        if (cookie.categoryId === +id) {
          setCookie(
            cookie.name, // name
            cookie.value, // value
            cookie.expiryDays, // expiration day
            cookie.domain, // domain
            cookie.path, // path
            cookie.is_secure // is secure
          );
        }
      });
      return filteredCookiesPerDomain;
    })
    .catch(function (err) {
      console.log(err);
    });
};
//! Fetch data from the CATEGORIES endpoint
export const getCategories = () => {
  let config = {
    method: "get",
    url: `${CMP_API_BASE_URL}/GetAllCategoriesByDomainId?domainId=135`,
    // ur`: "${CMP_API_BASE_URL}/CategoryListView`,
  };
  axios(config)
    .then(function (response) {
      categories = response.data;
      console.log("CATEGORIES LIST: ", response.data);
      categories.forEach((category) => {
        //  console.log(category)
        // filterCookiesByCategory(category, category.id, NECESSARY, category.name);
        NECESSARY.push(category);
        console.log(`🚀 ~ ${category.name} id:`, category.id, `=> `, NECESSARY);
      });
      return categories;
    })
    .catch(function (error) {
      console.log(error);
    });
  return categories;
};

//! fetch all the domains, their cookies and filter cookies for categories
export const getDomains = () => {
  let config = {
    method: "GET",
    url: `${CMP_API_BASE_URL}/GetAllCookiesByDomainId?domainId=135`,
    // ur`: "${CMP_API_BASE_URL}/DomainListViewTestHalabaku`,
  };

  axios(config)
    .then(function (response) {
      responseData = response.data;
      console.log("🚀 ~ responseData", responseData);
      return responseData;
    })
    .catch(function (error) {
      console.log(error.message);
    });
};
