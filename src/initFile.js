import i18next from "i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import axios from "axios";
import CookieConsent from "../src/models/CookieConsent";
import { fetchClientIp } from "./options/location";
import {
  // acceptNecessaryCookies,
  acceptAllCookiesWithRadioToggle,
  bannerAccordionToggle,
  fillCategories,
  fillCookiesSettingItem,
  languageButtonToggle,
  allowAllCookiesAtOnce,
  filterCookiesByCategory,
} from "./utils/logic";
import "./lang/en.json";
import "./lang/cs.json";
// import { cmpDomainCategories } from "./getDomainsWithCookies";
import "./styles/main.scss";
import {
  cmpDomainCategories,
  cmpCookiesPerDomain,
  fetchDataFromJSONFile,
  cmpEncryptedDomainId,
} from "./cookies";
import {
  getCzech,
  getEnglish,
  sendAcceptedDataToDb,
} from "./getDomainsWithCookies";
// import { CMP_IS_LOCALHOST } from "./constants";

let ccInstance;
let testType = "info";
let CountryCode = "";
let acceptedCategories = [];
let acceptedCookies = [];
let hasAcceptedAll = false;

function timeStamp() {
  const now = new Date();
  const time = [now.getHours(), now.getMinutes(), now.getSeconds()];
  const date = [now.getFullYear(), now.getUTCMonth() + 1, now.getDate()];
  for (let i = 1; i < 3; i++) {
    if (time[i] < 10) {
      time[i] = "0" + time[i];
    }
  }
  return "[" + time.join(":") + "]";
  // return "" + date.join("-");
  // return date.join("-") + "/" + time.join(":");
}

export let responseJSON = {
  userId: createUUID(),
  domainId: cmpEncryptedDomainId,
  date: timeStamp(),
  acceptedAll: hasAcceptedAll,
  payload: { categories: acceptedCategories, cookies: acceptedCookies },
};

// console.log(en);
export const fillJSONWithCheckedCategory = () => {
  const radioButtons = document.querySelectorAll(".category-radio-button");
  if (radioButtons.length !== 0 && radioButtons !== null) {
    for (let index = 0; index < radioButtons.length; index++) {
      const element = radioButtons[index];
      if (element.checked) {
        acceptedCategories.push(element.name);
      }
    }
    for (let index = 0; index < radioButtons.length; index++) {
      const element = radioButtons[index];
      const cookiesOfACategory = filterCookiesByCategory(
        cmpCookiesPerDomain,
        element.id
      );
      cookiesOfACategory.length !== 0 &&
        acceptedCookies.push(cookiesOfACategory);
    }
  } else {
    for (let index = 0; index < cmpDomainCategories.length; index++) {
      const element = cmpDomainCategories[index];
      if (element.checked) {
        acceptedCategories.push(element.name);
        acceptedCookies.push(element);
      }
    }
  }
  acceptedCategories = [];
  acceptedCookies = [];
  // sendAcceptedDataToDb(
  //   responseJSON.userId,
  //   responseJSON.date,
  //   responseJSON.acceptAll,
  //   JSON.stringify(responseJSON.payload)
  // );
};

// function fn() {
//   hasAcceptedAll = true;
//   console.log(hasAcceptedAll);
//   // return test;
// }

export const fillJSONWithAllCategories = () => {
  hasAcceptedAll = true;
  responseJSON = { ...responseJSON, acceptedAll: hasAcceptedAll };
  // fn()
  console.log(responseJSON.acceptedAll, hasAcceptedAll);
  for (const element of cmpDomainCategories) {
    acceptedCategories.push(element.name);
  }
  for (const cookie of cmpCookiesPerDomain) {
    acceptedCookies.push(cookie);
  }
  sendAcceptedDataToDb(
    responseJSON.userId,
    responseJSON.domainId,
    responseJSON.date,
    responseJSON.acceptedAll,
    JSON.stringify(responseJSON.payload)
  );

  acceptedCategories = [];
  acceptedCookies = [];
};

function createUUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  fetchDataFromJSONFile().then((json) => json);
  return uuid;
}

//!the config file for the consent manager/library to start
const optionsObj = (countryCode, type) => {
  const options = {
    cookieconsent: CookieConsent,
    container: document.getElementById("CMP_Selector"),
    type: type,
    regionalLaw: true,
    // position:"left",
    legal: countryCode,
    location: true,
    revokable: true,
    palette: {
      categories: {
        display: "flex",
        "flex-direction": "column",
        height: "100vh",
      },
    },
  };
  return options;
};

function loadPath(lng) {
  let path = "";
  switch (lng) {
    case "en":
      path = "https://api.jsonbin.io/v3/b/62cb5ce14bccf21c2edad6f7";
      break;
    case "cs":
      path = "https://api.jsonbin.io/v3/b/62cb5cf4f023111c70713c0b";
      break;
    default:
      break;
  }
  return path;
}

const loadResources = async (locale) => {
  let path = loadPath(locale);
  if (locale !== "dev")
    return await axios
      .get(path)
      .then(({ data }) => {
        return data.record;
      })
      .catch((error) => {
        console.log(error);
      });
};

export const backendOptions = {
  loadPath: "{{lng}}",
  request: (options, url, payload, callback) => {
    try {
      loadResources(url).then((response) => {
        callback(null, {
          data: response,
          status: 200,
        });
      });
    } catch (e) {
      console.error(e);
      callback(null, {
        status: 500,
      });
    }
  },
};

/**
 * Init the i18n library
 */
export async function initI18next() {
  await i18next
    .use(HttpApi)
    .use(LanguageDetector)
    .init({
      debug: false,
      supportedLngs: ["en", "cs"],
      fallbackLng: "en",
      nonExplicitSupportedLngs: true,
      backend: backendOptions,
    });
  // .loadLanguages(["en", "cs"])
}

/**
 * Translate the content page/elements
 */
export function translatePageElements() {
  const translatableElements = document.querySelectorAll("[data-i18n-key]");
  translatableElements.forEach((el) => {
    const key = el.getAttribute("data-i18n-key");
    const interpolations = el.getAttribute("data-i18n-opt");
    const parsedInterpolations = interpolations
      ? JSON.parse(interpolations)
      : {};

    el.innerHTML = i18next.t(key, parsedInterpolations);
  });
}

/**
 * Bind the switcher options to the languages available
 * @param {string} initialValue the value for the given element
 */
export function bindLocaleSwitcher(initialValue) {
  // const checkType = document.querySelector(".cc-type-info");

  // if (checkType === null) {
  const switcher = document.querySelector("[data-i18n-switcher]");
  const length = switcher.children.length;
  for (let index = 0; index < length; index++) {
    const element = switcher.children[index];
    element.addEventListener("click", (e) => {
      i18next.changeLanguage(e.target.value).then(translatePageElements);
    });
  }
  // }
}

const options = {
  cookieconsent: CookieConsent,
  container: document.getElementById("CMP_Selector"),
  type: "info",
  regionalLaw: true,
  // position:"left",
  legal: "XK",
  location: true,
  revokable: true,
  palette: {
    categories: {
      display: "flex",
      "flex-direction": "column",
      height: "100vh",
    },
  },
};

fetchClientIp().then((country) => {
  CountryCode = country;
  ccInstance = new CookieConsent(options);
  // ccInstance = new CookieConsent(optionsObj(country, testType));
  ccInstance.autoOpen = true;
  ccInstance
    .on("initialized", function (popup) {
      // ccInstance.popup?.open()
      initiateTypeChangeAndBannerShow();
    })
    .on("popupOpened", (...args) => {
      // initiateTypeChangeAndBannerShow();
      languageButtonToggle();
      // Init
      (async function () {
        i18next.on("languageChanged", (newLanguage) => {
          document.documentElement.lang = newLanguage;
          document.documentElement.dir = i18next.dir(newLanguage);
        });

        await initI18next();
        translatePageElements();
        bindLocaleSwitcher(i18next.resolvedLanguage);
      })();
    })
    .on("popupClosed", (...args) => {
      // acceptNecessaryCookies();
      // ccInstance.popup?.close();
    })
    .on("error", console.error);
});

const draw = function (countryCode) {
  // getCategories();
  ccInstance = new CookieConsent(optionsObj(countryCode, testType));
  ccInstance.autoOpen = true;
  ccInstance
    .on("initialized", function (popup) {
      // ccInstance.popup?.open();
    })
    .on("popupOpened", (...args) => {
      // acceptNecessaryCookies();
      initiateTypeChangeAndBannerShow();
      // Init
      (async function () {
        i18next.on("languageChanged", (newLanguage) => {
          document.documentElement.lang = newLanguage;
          document.documentElement.dir = i18next.dir(newLanguage);
        });

        await initI18next();
        translatePageElements();
        bindLocaleSwitcher(i18next.resolvedLanguage);
      })();
    })
    .on("popupClosed", (...args) => {
      // acceptNecessaryCookies();
      // ccInstance.popup?.close();
    })
    .on("error", console.error);
};

export function initiateTypeChangeAndBannerShow() {
  const checkType = document.querySelector(".cc-type-info");

  const bannerTypeChangeButtons = document.querySelectorAll(
    ".banner-type-change"
  );
  const acceptAllCookiesAtOnce = document.getElementById(
    "accept-all-cookies-at-once"
  );
  if (checkType !== null) {
    acceptAllCookiesAtOnce.addEventListener("click", () => {
      allowAllCookiesAtOnce();
    });
  }
  for (const typeChangeElement of bannerTypeChangeButtons) {
    typeChangeElement.addEventListener("click", (event) => {
      timeStamp();
      if (testType === "info") {
        testType = "categories";
        ccInstance.destroy();
        optionsObj(CountryCode, "categories");
        draw(CountryCode);
        setTimeout(() => {
          fillCategories();
          fillCookiesSettingItem();
          bannerAccordionToggle();
          acceptAllCookiesWithRadioToggle();
          // acceptNecessaryCookies();
        }, 300);
      }
    });
  }
}
