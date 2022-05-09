// import CMP_Section from "./cookies";
// import CMP_Section from "./utils/logic.js";
import jsonData from "./data.json";
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
import axios from "axios";

export let categories = [];
export let responseData = [];
export let cookiesPerCategory = [];
export let filteredCookiesPerDomain = [];

//!!!!!!!!!!!
export let User = {};
export let DomainId = "";
export let DomainName = "";
export let DomainWebsiteUrl = "";
export let Language = {};
export let LanguagesList = [];
export let LomainCategoriesWithCookies = [];
export let DomainCategories = [];
export let CookiesPerDomain = [];
export let DomainCategoriesWithCookies = [];
const {
  user,
  domainId,
  domainName,
  domainWebsiteUrl,
  language,
  languagesList,
  domainCategoriesWithCookies,
  domainCategories,
  cookiesPerDomain,
} = jsonData;

//!!!!!!!!!!!
export const fetchDataFromJSONFile = async () => {
  const URL = "data.json";
  const config = {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    // let response = await fetch("data.json");
    // let cmpData = await response.json();
    // console.log(`Domain #${cmpData.domainId} => `, cmpData);
    DomainId = domainId;
    User = user;
    DomainName = domainName;
    DomainWebsiteUrl = domainWebsiteUrl;
    Language = language;
    LanguagesList = languagesList;
    DomainCategoriesWithCookies = domainCategoriesWithCookies;
    DomainCategories = domainCategories;
    CookiesPerDomain = cookiesPerDomain;
    return {
      User,
      DomainId,
      DomainName,
      DomainWebsiteUrl,
      Language,
      LanguagesList,
      DomainCategoriesWithCookies,
      DomainCategories,
      CookiesPerDomain
    };
    // return json
  } catch (error) {
    console.log(error);
  }
  return {
    User,
    DomainId,
    DomainName,
    DomainWebsiteUrl,
    Language,
    LanguagesList,
    DomainCategoriesWithCookies,
    DomainCategories,
    CookiesPerDomain,
  };
};
// console.log("first", jsonData);
//!!!!!!!!!!!

export const getCookies = async () => {
  let filteredCookiesPerCategory = [];
  let config = {
    method: "GET",
    url: `${CMP_API_BASE_URL}/GetAllCookiesByDomainId?domainId=${domainId}`,
    // url: `${CMP_API_BASE_URL}/GetAllCookiesByDomainId?domainId=135`,
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
    // url: `${CMP_API_BASE_URL}/GetAllCookiesByDomainId?domainId=135`,
    url: `${CMP_API_BASE_URL}/GetCookiesByCategoryHalabaku?domainId=135&categoryId=5`,
  };
  axios(config)
    .then(function (response) {
      const data = response.data.cookies;
      // data.filter((cookie) => {
      for (const cookie of data) {
        setCookie(
          cookie.name, // name
          cookie.plaintext_value, // value
          // "", // value
          cookie.expiration, // expiration day
          // cookie.expiration, // expiration day
          cookie.domain, // domain
          cookie.path, // path
          cookie.is_secure // is secure
        );
      }
      // });
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
            cookie.plaintext_value, // value
            cookie.expiration, // expiration day
            // cookie.expiration, // expiration day
            cookie.domain, // domain
            cookie.path, // path
            cookie.is_secure // is secure
          );
        }
      });
      return filteredCookiesPerDomain;
    })
    .catch(function (err) {
      console.log(err.message);
    });
};
//! Fetch data from the CATEGORIES endpoint
/* export const getCategories = () => {
  let config = {
    method: "get",
    url: `${CMP_API_BASE_URL}/GetAllCategoriesByDomainId?domainId=${domainId}`,
    // url: `${CMP_API_BASE_URL}/GetAllCategoriesByDomainId?domainId=135`,
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
}; */

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
