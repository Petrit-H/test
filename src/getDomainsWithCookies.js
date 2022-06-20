import axios from "axios";
// import jsonData from "./data.json";
import { getCookie, setCookie } from "./utils/cookie";
import { filterCookiesByCategory } from "./utils/logic";
import { CMP_API_BASE_URL, CMP_IS_LOCALHOST } from "./constants";
import { cmpDomainCategoriesWithCookies, cmpDomainId, cmpCookiesPerDomain } from "./cookies";
// import { fillJSONWithCheckedCategory } from "./initFile";

export let categories = [];
export let responseData = [];
export let cookiesPerCategory = [];
export let filteredCookiesPerDomain = [];
let cookiesPerCateroryArr = [];

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
    cookiesPerCategory = filterCookiesByCategory(cmpCookiesPerDomain, id, cookiesPerCategory, `Category #${id}`);
    console.log("✅", cookiesPerCategory);
    for (let index = 0; index < cookiesPerCategory.length; index++) {
      console.log("1️⃣");
      const cookie = cookiesPerCategory[index];
      let { categoryId, name, plaintext_value, expiration, cookieDomain, path, is_secure } = cookie;
      console.log(categoryId, name, plaintext_value, expiration, cookieDomain, path, is_secure);
      if (categoryId === +id) {
        setCookie(name, plaintext_value, expiration, !CMP_IS_LOCALHOST ? cookieDomain : null, path, is_secure);
        console.log("2️⃣", getCookie(name));
        console.log("------");
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const saveAllCookies = () => {
  try {
    for (let index = 0; index < cmpCookiesPerDomain.length; index++) {
      const cookie = cmpCookiesPerDomain[index];
      let { name, plaintext_value, expiration, cookieDomain, path, is_secure } = cookie;
      setCookie(name, plaintext_value, expiration, !CMP_IS_LOCALHOST ? cookieDomain : null, path, is_secure);
      // console.log("🟥VALUE ALL:", cookie);
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
      return responseData;
    })
    .catch(function (error) {
      console.log(error.message);
    });
};
