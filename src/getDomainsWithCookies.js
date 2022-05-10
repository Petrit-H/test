import axios from "axios";
import jsonData from "./data.json";
import { setCookie } from "./utils/cookie";
import { filterCookiesByCategory } from "./utils/logic";
import {
  ANALYTICAL,
  CMP_API_BASE_URL,
  MARKETING,
  NECESSARY,
  OTHER,
  PREFERENCES,
} from "./constants";

export let categories = [];
export let responseData = [];
export let cookiesPerCategory = [];
export let filteredCookiesPerDomain = [];
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

/**
 * fetch all the data from the local file and export them
 * @returns the data from the local JSON
 */
export const fetchDataFromJSONFile = async () => {
  try {
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
      CookiesPerDomain,
    };
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

/**
 *  fetch all the cookies based on the domain you are in
 * @returns all the cookies for the domain at hand
 */
export const getCookies = async () => {
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

/**
 * fetch all the cookies for a specific category
 * @param {Integer} categoryId the category you filter the domain
 * @param {Integer} domainId the domain you fetch data from
 * @returns the array of the cookies
 */
export const getCookiesPerCategory = async (categoryId, domainId) => {
  const config = {
    method: "GET",
    url: `${CMP_API_BASE_URL}/GetCookiesByCategoryHalabaku?domainId=${domainId}&categoryId=${categoryId}`,
  };
  try {
    const cookies = await axios(config);
    return cookies.data;
  } catch (error) {
    console.error(error.message);
  }
};

/**
 * save the cookies that are necessary
 */
export const saveNecessaryCookies = () => {
  let config = {
    method: "GET",
    url: `${CMP_API_BASE_URL}/GetCookiesByCategoryHalabaku?domainId=${domainId}&categoryId=5`,
  };
  axios(config)
    .then(function (response) {
      const data = response.data.cookies;
      for (const cookie of data) {
        const { name, plaintext_value, expiration, domain, path, is_secure } =
          cookie;
        setCookie(name, plaintext_value, expiration, domain, path, is_secure);
      }
      return filteredCookiesPerDomain;
    })
    .catch(function (err) {
      console.log(err.message);
    });
};

/**
 * save the cookies of the specified id/category
 * @param {Integer} id the id of cookie
 */
export const saveSpecificCookies = (id) => {
  let config = {
    method: "GET",
    url: `${CMP_API_BASE_URL}/GetAllCookiesByDomainId?domainId=${domainId}`,
  };
  axios(config)
    .then(function (response) {
      const data = response.data;
      data.filter((cookie) => {
        const { name, plaintext_value, expiration, domain, path, is_secure } =
          cookie;
        if (cookie.categoryId === +id) {
          setCookie(name, plaintext_value, expiration, domain, path, is_secure);
        }
      });
      return filteredCookiesPerDomain;
    })
    .catch(function (err) {
      console.log(err.message);
    });
};

/**
 * fetch data from the CATEGORIES endpoint
 * @returns the array of the categories
 */
export const getCategories = () => {
  let config = {
    method: "get",
    url: `${CMP_API_BASE_URL}/GetAllCategoriesByDomainId?domainId=${domainId}`,
    // url: `${CMP_API_BASE_URL}/GetAllCategoriesByDomainId?domainId=135`,
  };
  axios(config)
    .then(function (response) {
      categories = response.data;
      // console.log("CATEGORIES LIST: ", response.data);
      return categories;
    })
    .catch(function (error) {
      console.log(error);
    });
  return categories;
};

/**
 * fetch all the domains, their cookies and filter cookies for categories
 */
export const getDomains = () => {
  let config = {
    method: "GET",
    url: `${CMP_API_BASE_URL}/GetAllCookiesByDomainId?domainId=${domainId}`,
  };
  axios(config)
    .then(function (response) {
      responseData = response.data;
      console.log("==========︾==========");
      filterCookiesByCategory(response.data, 5, "NECESSARY");
      filterCookiesByCategory(response.data, 4, "PREFERENCES");
      filterCookiesByCategory(response.data, 3, "ANALYTICAL");
      filterCookiesByCategory(response.data, 2, "MARKETING");
      filterCookiesByCategory(response.data, 1, "OTHER");
      console.log("==========︽==========");
      return responseData;
    })
    .catch(function (error) {
      console.log(error.message);
    });
};
