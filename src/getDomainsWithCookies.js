import axios from "axios";
import jsonData from "./data.json";
import { setCookie } from "./utils/cookie";
import { filterCookiesByCategory } from "./utils/logic";
import { CMP_API_BASE_URL } from "./constants";
import { cmpDomainCategoriesWithCookies, cmpDomainId, cmpCookiesPerDomain } from "./cookies";
// import { fillJSONWithCheckedCategory } from "./initFile";

export let categories = [];
export let responseData = [];
export let cookiesPerCategory = [];
export let filteredCookiesPerDomain = [];
let cookiesPerCateroryArr = [];

/**
 *  fetch all the cookies based on the domain you are in
 * @returns all the cookies for the domain at hand
 */
export const getCookies = async () => {
  let config = {
    method: "GET",
    url: `${CMP_API_BASE_URL}/GetAllCookiesByDomainId?domainId=${cmpDomainId}`,
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
/* export const getCookiesPerCategory = async (categoryId, domainId) => {
  const config = {
    method: "GET",
    url: `${CMP_API_BASE_URL}/GetCookiesByCategoryHalabaku?domainId=${DomainId}&categoryId=${categoryId}`,
  };
  try {
    const cookies = await axios(config);
    return cookies.data;
  } catch (error) {
    console.error(error.message);
  }
}; */

/**
 * save the cookies that are necessary
 */
export const saveNecessaryCookies = () => {
  try {
    filterCookiesByCategory(cmpCookiesPerDomain, 5, cookiesPerCateroryArr, "filteredCookies");
    /* for (let index = 0; index < DomainCategoriesWithCookies.length; index++) {
      const category = DomainCategoriesWithCookies[index];
      let {
        categoryId,
        cookies: { data },
      } = category;
      if (categoryId === 5) {
        for (const cookie of data) {
          let { name, plaintext_value, expiration, cookieDomain, path, is_secure } = cookie;
          setCookie(name, plaintext_value, expiration, cookieDomain, path, is_secure);
        }
      }
    } */
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * save the cookies of the specified id/category
 * @param {Integer} id the id of cookie
 */
export const saveSpecificCookies = (id) => {
  try {
    for (let index = 0; index < cmpDomainCategoriesWithCookies.length; index++) {
      const category = cmpDomainCategoriesWithCookies[index];
      let {
        categoryName,
        categoryId,
        cookies: { data },
      } = category;
      if (categoryId === +id) {
        for (const cookie of data) {
          let { name, plaintext_value, expiration, cookieDomain, path, is_secure } = cookie;
          setCookie(name, plaintext_value, expiration, cookieDomain, path, is_secure);
        }
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const saveAllCookies = () => {
  try {
    for (let index = 0; index < cmpCookiesPerDomain.length; index++) {
      const cookie = CookiesPerDomain[index];
      let { name, plaintext_value, expiration, cookieDomain, path, is_secure } = cookie;
      setCookie(name, plaintext_value, expiration, cookieDomain, path, is_secure);
    }
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * fetch data from the CATEGORIES endpoint
 * @returns the array of the categories
 */
export const getCategories = () => {
  let config = {
    method: "get",
    url: `${CMP_API_BASE_URL}/GetAllCategoriesByDomainId?domainId=${cmpDomainId}`,
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
    url: `${CMP_API_BASE_URL}/GetAllCookiesByDomainId?domainId=${cmpDomainId}`,
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
