import { setCookie } from "./utils/cookie";
import { fetchClientIp } from "./options/location";
import jsonData from "./data.json";

// console.log(createUUID());
let locationData = "";

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

window.addEventListener("load", function (event) {
  console.log(
    "welcome to🔐 \n",
    `
.------..------..------.
|C.--. ||M.--. ||P.--. |
| :/\\: || (\\/) || :/\\: |
| :\\/: || :\\/: || (__) |
| '--'C|| '--'M|| '--'P|
\`------'\`------'\`------'
    `
  );

  setTimeout(() => {
    fetchClientIp().then((location) => {
      locationData = location;
      return location;
    });
  }, 400);
});
