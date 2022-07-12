import axios from "axios";
// import jsonData from "./data.json";
import { getCookie, setCookie } from "./utils/cookie";
import { filterCookiesByCategory, getEnvLocal } from "./utils/logic";
import { CMP_API_BASE_URL, CMP_IS_LOCALHOST } from "./constants";
import {
  cmpDomainCategoriesWithCookies,
  cmpDomainId,
  cmpCookiesPerDomain,
} from "./cookies";

export let categories = [];
export let responseData = [];
export let cookiesPerCategory = [];
export let filteredCookiesPerDomain = [];
let cookiesPerCateroryArr = [];
let isLocalEnv = getEnvLocal();
let cs = "https://api.jsonbin.io/v3/b/62cb5cf4f023111c70713c0b";
let en = "https://api.jsonbin.io/v3/b/62cb5ce14bccf21c2edad6f7";
let English;
let Czech;

export const getEnglish = () => {
  let config = {
    method: "get",
    url: en,
  };
  axios(config)
    .then(function ({ data }) {
      English = data.record;
      console.log(English);
      return English;
    })
    .catch(function (error) {
      console.log(error);
    });
  return English;
};

export const getCzech = () => {
  let config = {
    method: "get",
    url: cs,
  };
  axios(config)
    .then(function ({ data }) {
      Czech = data.record;
      console.log(Czech)
      return Czech;
    })
    .catch(function (error) {
      console.log(error);
    });
  return Czech;
};

/**
 * save the cookies of the specified id/category
 * @param {Integer} id the id of cookie
 */
export const saveSpecificCookies = (id) => {
  try {
    cookiesPerCategory = filterCookiesByCategory(
      cmpCookiesPerDomain,
      id,
      cookiesPerCategory,
      `Category #${id}`
    );
    for (let index = 0; index < cookiesPerCategory.length; index++) {
      const cookie = cookiesPerCategory[index];
      let {
        categoryId,
        name,
        plaintext_value,
        expiration,
        cookieDomain,
        path,
        is_secure,
      } = cookie;
      if (categoryId === +id) {
        setCookie(
          name,
          plaintext_value,
          expiration,
          isLocalEnv ? null : cookieDomain,
          path,
          is_secure
        );
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
      let { name, plaintext_value, expiration, cookieDomain, path, is_secure } =
        cookie;
      setCookie(
        name,
        plaintext_value,
        expiration,
        isLocalEnv ? null : cookieDomain,
        path,
        is_secure
      );
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

export const sendAcceptedDataToDb = async (
  id,
  date,
  hasAcceptedAll,
  payload
) => {
  try {
    let config = {
      method: "post",
      url: `${CMP_API_BASE_URL}/AddCookieConsent`,
      data: {
        userId: id,
        date: date,
        acceptedAll: hasAcceptedAll,
        payload: payload,
      },
    };
    const result = await axios(config);
    console.log("SEND🟥", result);
  } catch (error) {
    console.log(error.message);
  }
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
