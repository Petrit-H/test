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

/* const cookies = [
  {
    name: "QAZA",
    cookieDomain: "",
    path: "",
    expiration: "1 days 5 hours ",
    is_secure: false,
    is_httponly: true,
    description: "",
    isDeleted: false,
    creation_utc: null,
    last_access_utc: null,
    has_expires: false,
    is_presistent: false,
    priority: null,
    encrypted_value: null,
    plaintext_value: null,
    samesite: null,
    source_scheme: null,
    source_port: null,
    is_same_party: null,
    isFromCrawler: false,
    categoryId: 1,
    domainId: 135,
    serviceId: null,
    category: {
      name: "Other",
      title: null,
      checked: false,
      usedForTracking: false,
      preconsent: false,
      description: null,
      domainId: null,
      serviceId: null,
      isDeafult: true,
      isDeleted: false,
      isEnabled: true,
      domain: null,
      service: null,
      scripts: null,
      cookies: [],
      id: 1,
      createdAt: "2022-05-05T16:53:46.5758573",
      updatedAt: "2022-05-05T16:53:46.5758578",
    },
    domain: null,
    service: null,
    encryptedId:
      "CfDJ8PqqNXts7VZCusYeXtwhEAtFaWc8lksTD1KYcS5XnQTfZgtb6lzhOI5KkNteYRAuzy0ppmVzaQ94Ptzd2TAyFoSBhTIXCG0djc_pTq0TqwhKykI-8v-who3cyErYpYZu4Q",
    encryptedCategoryId:
      "CfDJ8PqqNXts7VZCusYeXtwhEAvcKRY5bkJeJryQvXserumXxB5H_lMZfQjX0qDlCcUBXsXUAmdblULKMn3IfDDofMffBYXMzjGcvDM2MXyw2Jorv5eNYPHJrfTEXmccy3p7hA",
    expirationUnit: "1 days 5 hours ",
    top_Frame_Site_Key: null,
    id: 4974,
    createdAt: "2022-05-04T14:59:06.2685302",
    updatedAt: "2022-05-04T14:59:06.268531",
  },
  {
    name: "KIZJA",
    cookieDomain: "",
    path: "",
    expiration: "1 days 3 hours ",
    is_secure: false,
    is_httponly: false,
    description: "",
    isDeleted: false,
    creation_utc: null,
    last_access_utc: null,
    has_expires: false,
    is_presistent: false,
    priority: null,
    encrypted_value: null,
    plaintext_value: null,
    samesite: null,
    source_scheme: null,
    source_port: null,
    is_same_party: null,
    isFromCrawler: false,
    categoryId: 1,
    domainId: 135,
    serviceId: null,
    category: {
      name: "Other",
      title: null,
      checked: false,
      usedForTracking: false,
      preconsent: false,
      description: null,
      domainId: null,
      serviceId: null,
      isDeafult: true,
      isDeleted: false,
      isEnabled: true,
      domain: null,
      service: null,
      scripts: null,
      cookies: [],
      id: 1,
      createdAt: "2022-05-05T16:53:46.5758573",
      updatedAt: "2022-05-05T16:53:46.5758578",
    },
    domain: null,
    service: null,
    encryptedId:
      "CfDJ8PqqNXts7VZCusYeXtwhEAu-jn5uNMKJ8URsBhfdf2FCv_9qH0Ppqe6BzrQbzp70nOz-zVkjHJQnKg9mAWxGw04C5w5mdA76zRbynNH2ctQtG7UOMvNrSam3coJ1IwV7hA",
    encryptedCategoryId:
      "CfDJ8PqqNXts7VZCusYeXtwhEAv9Um_K9E4oCZSUr-GIIvn2idtGpb7p81SmeNUuKQVfMxhqCk3xK7Q13zHVETRLy5ZwBJKHYY8UB3c8lRRTVFukTFVrUksOMHd9Ph95lkHnIw",
    expirationUnit: "1 days 3 hours ",
    top_Frame_Site_Key: null,
    id: 4973,
    createdAt: "2022-05-04T13:16:43.6255472",
    updatedAt: "2022-05-04T13:16:43.6255479",
  },
  {
    name: "RAZA",
    cookieDomain: "",
    path: "",
    expiration: "1 days 3 hours ",
    is_secure: false,
    is_httponly: false,
    description: "",
    isDeleted: false,
    creation_utc: null,
    last_access_utc: null,
    has_expires: false,
    is_presistent: false,
    priority: null,
    encrypted_value: null,
    plaintext_value: null,
    samesite: null,
    source_scheme: null,
    source_port: null,
    is_same_party: null,
    isFromCrawler: false,
    categoryId: 1,
    domainId: 135,
    serviceId: null,
    category: {
      name: "Other",
      title: null,
      checked: false,
      usedForTracking: false,
      preconsent: false,
      description: null,
      domainId: null,
      serviceId: null,
      isDeafult: true,
      isDeleted: false,
      isEnabled: true,
      domain: null,
      service: null,
      scripts: null,
      cookies: [],
      id: 1,
      createdAt: "2022-05-05T16:53:46.5758573",
      updatedAt: "2022-05-05T16:53:46.5758578",
    },
    domain: null,
    service: null,
    encryptedId:
      "CfDJ8PqqNXts7VZCusYeXtwhEAsObIASgf_t_cCABpSExLtXhMAd3d0w7PKF9BYm9iZGn5uxFpg7weYvcMtRwq3uB8xu7s29qlmLWlbdvZiuYY4UCnAOn5aDjg3baRgBYucHVQ",
    encryptedCategoryId:
      "CfDJ8PqqNXts7VZCusYeXtwhEAszxTO1ohInjc_InxBvLJIhNfAptpajPxXglObMZBkmRyu3bzTqzpuxkWpwavVnFtKpKaeIVX9uozDdsUbalnkQCroaCgSFI5Eupxg5D0RZug",
    expirationUnit: "1 days 3 hours ",
    top_Frame_Site_Key: null,
    id: 4972,
    createdAt: "2022-05-04T13:59:29.3390424",
    updatedAt: "2022-05-04T13:59:29.3390468",
  }

];

cookies.forEach((cookie) => {
  console.log(cookie.id);
  let { name, plaintext_value, expiration, cookieDomain, path, is_secure } =
    cookie;
  setCookie(name, plaintext_value, expiration, cookieDomain, path, is_secure);
}); */
