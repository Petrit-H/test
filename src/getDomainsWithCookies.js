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
      console.log("==========︾==========");
      console.log("🚀 ~ categories", categories);
      console.log("🚀 ~ responseData", responseData);
      console.log("==========xxx==========");
      filterCookiesByCategory(response.data, 5, NECESSARY, "NECESSARY");
      filterCookiesByCategory(response.data, 4, PREFERENCES, "PREFERENCES");
      filterCookiesByCategory(response.data, 3, ANALYTICAL, "ANALYTICAL");
      filterCookiesByCategory(response.data, 2, MARKETING, "MARKETING");
      filterCookiesByCategory(response.data, 1, OTHER, "OTHER");
      console.log("==========︽==========");
      return responseData;
    })
    .catch(function (error) {
      console.log(error.message);
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
      return categories;
    })
    .catch(function (error) {
      console.log(error);
    });
  return categories;
};
