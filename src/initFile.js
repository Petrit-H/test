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

// import { cmpDomainCategories } from "./getDomainsWithCookies";
import "./styles/main.scss";
import {
  cmpDomainCategories,
  cmpCookiesPerDomain,
  exportGlobalJSON,
  cmpEncryptedDomainId,
  cmpDomainId,
  cmpDomainWebsiteUrl,
  cmpComplianceType,
} from "./cookies";
import {
  getCzech,
  getEnglish,
  sendAcceptedDataToDb,
} from "./getDomainsWithCookies";
// import { CMP_IS_LOCALHOST } from "./constants";
import cs from "./lang/cs.json";
import en from "./lang/en.json";

let ccInstance;
let testType = "info";
let CountryCode = "";
let acceptedCategories = [];
let acceptedCookies = [];
let hasAcceptedAll = false;
let clientIpAddress = "";
let clientCountry = "";
let clientDevice = "";
let clientBrowserAgent = "";
let consentName = "";
let consentDescription = "";
let consentAccept = "";

let consentData = {
  name: consentName,
  description: consentDescription,
  consent: consentAccept,
};

function timeStamp() {
  const now = new Date();
  const time = [now.getHours(), now.getMinutes(), now.getSeconds()];
  const date = [now.getFullYear(), now.getUTCMonth() + 1, now.getDate()];
  for (let i = 1; i < 3; i++) {
    if (time[i] < 10) {
      time[i] = "0" + time[i];
    }
  }
  return new Date().toISOString();
  // return "[" + time.join(":") + "]";
  // return "" + date.join("-");
  // return date.join("-") + "/" + time.join(":");
}

export let responseJSON = {
  userId: createUUID(),
  domainId: cmpDomainId,
  ipAddress: clientIpAddress,
  browserAgent: clientBrowserAgent,
  country: clientCountry,
  device: clientDevice,
  url: cmpDomainWebsiteUrl,
  complianceType: cmpComplianceType,
  date: timeStamp(),
  acceptedAll: false,
  // payload: consentData,
  payload: [],
};

export const fillJSONWithCheckedCategory = () => {
  // setTimeout(() => {
  const radioButtons = document.querySelectorAll(".category-radio-button");

  let {
    userId,
    domainId,
    ipAddress,
    country,
    device,
    url,
    complianceType,
    browserAgent,
    date,
    acceptedAll,
    payload,
  } = responseJSON;
  let cookieConsentCheck = 0;
  if (radioButtons.length !== 0 && radioButtons !== null) {
    responseJSON = { ...responseJSON, payload: [] };
    radioButtons.forEach((element) => {
      consentData = {
        ...consentData,
        name: element.name,
        description: element.description,
        consent: element.checked ? "yes" : "no",
      };
      responseJSON.payload.push(consentData);
    });
    for (let index = 0; index < radioButtons.length; index++) {
      const element = radioButtons[index];
      if (element.checked) {
        cookieConsentCheck++;
        acceptedCategories.push(element.name);
        console.log("cat. #", cookieConsentCheck);
      }
    }

    // check the number of checked categories
    if (cookieConsentCheck === radioButtons.length) {
      hasAcceptedAll = true;

      cmpDomainCategories.forEach((element) => {
        consentData = {
          ...consentData,
          name: element.name,
          description: element.description,
          consent: "yes",
        };
        payload.push(consentData);
      });
      responseJSON = { ...responseJSON, acceptedAll: true, payload: [] };
      // console.log(responseJSON);

      sendAcceptedDataToDb(
        userId,
        domainId,
        ipAddress,
        country,
        device,
        url,
        complianceType,
        browserAgent,
        date,
        (acceptedAll = true),
        JSON.stringify(payload)
      );
    } else {
      sendAcceptedDataToDb(
        userId,
        domainId,
        ipAddress,
        country,
        device,
        url,
        complianceType,
        browserAgent,
        date,
        (acceptedAll = false),
        JSON.stringify(payload)
      );
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
    responseJSON = { ...responseJSON, acceptedAll: true, payload: [] };

    for (let index = 0; index < cmpDomainCategories.length; index++) {
      const element = cmpDomainCategories[index];
      consentData = {
        ...consentData,
        name: element.name,
        description: element.description,
        consent: element.checked ? "yes" : "no",
      };
      payload.push(consentData);
      if (element.checked) {
        acceptedCategories.push(element.name);
        acceptedCookies.push(element);
      }
    }
    sendAcceptedDataToDb(
      userId,
      domainId,
      ipAddress,
      country,
      device,
      url,
      complianceType,
      browserAgent,
      date,
      acceptedAll,
      JSON.stringify(payload)
    );
  }

  console.log(payload);
  console.log(responseJSON);
  // payload.splice(0, payload.length);
  payload = [];
  acceptedCategories = [];
  acceptedCookies = [];
  // }, 100);
};

export const fillJSONWithAllCategories = () => {
  responseJSON = { ...responseJSON, acceptedAll: true, payload: [] };
  hasAcceptedAll = true;
  let {
    userId,
    domainId,
    ipAddress,
    country,
    device,
    url,
    complianceType,
    browserAgent,
    date,
    acceptedAll,
    payload,
  } = responseJSON;

  for (const element of cmpDomainCategories) {
    acceptedCategories.push(element.name);
    (consentData = {
      ...consentData,
      name: element.name,
      description: element.description,
      consent: "yes",
    }),
      payload.push(consentData);
  }

  for (const cookie of cmpCookiesPerDomain) {
    acceptedCookies.push(cookie);
  }
  sendAcceptedDataToDb(
    userId,
    domainId,
    ipAddress,
    country,
    device,
    url,
    complianceType,
    browserAgent,
    date,
    acceptedAll,
    JSON.stringify(payload)
  );

  // console.log(payload);
  // console.log(responseJSON);
  // payload.splice(0, payload.length);
  payload = [];
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
  exportGlobalJSON().then((json) => json);
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
      // path = "https://api.jsonbin.io/v3/b/62cb5ce14bccf21c2edad6f7";
      path = `/dist/lang/${lng}.json`;
      break;
    case "cz":
      path = `https://cmp.gjirafa.dev/GetTranslations?code=${lng}`;
      path = `/dist/lang/${lng}.json`;
      break;
    default:
      break;
  }
  return path;
}

const loadResources = async (locale) => {
  // let path = loadPath(locale);
  let path = `https://cmp.gjirafa.dev/GetTranslations?code=${locale}`;
  if (locale !== "dev")
    return await fetch(path)
      .then((data) => {
        // console.log(data)
        return data.json();
      })
      .catch((error) => {
        console.log(error.message);
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
      supportedLngs: ["en", "cz"],
      fallbackLng: "en",
      nonExplicitSupportedLngs: true,
      backend: backendOptions,
    });
  // .loadLanguages(["en", "cs"])
}
//TODO USE IF NECESSARY FOR API CALL
/*
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
*/

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

fetchClientIp().then(
  ({ countryCode, ipToString, browser, country, mobile }) => {
    CountryCode = countryCode;
    responseJSON = {
      ...responseJSON,
      ipAddress: ipToString,
      country: country,
      device: mobile,
      browserAgent: browser,
    };
    // ccInstance = new CookieConsent(options);
    ccInstance = new CookieConsent(optionsObj(countryCode, testType));
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
  }
);

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
