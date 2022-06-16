import i18next from "i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import CookieConsent from "../src/models/CookieConsent";
import { fetchClientIp } from "./options/location";
import {
  acceptNecessaryCookies,
  acceptAllCookiesWithRadioToggle,
  bannerAccordionToggle,
  fillCategories,
  fillCookiesSettingItem,
  languageButtonToggle,
  allowAllCookiesAtOnce,
  // translatePageElements,
  // bindLocaleSwitcher,
  // initI18next,
} from "./utils/logic";
import "./lang/en.json";
import "./lang/cs.json";
// import { cmpDomainCategories } from "./getDomainsWithCookies";
import "./styles/main.scss";
import { cmpDomainCategories, cmpCookiesPerDomain, fetchDataFromJSONFile } from "./cookies";
import { saveAllCookies } from "./getDomainsWithCookies";

let ccInstance;
let testType = "info";
let CountryCode = "";
let acceptedCategories = [];

export let responseJSON = {
  userId: createUUID(),
  categories: acceptedCategories,
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
  } else {
    for (let index = 0; index < cmpDomainCategories.length; index++) {
      const element = cmpDomainCategories[index];
      if (element.checked) {
        acceptedCategories.push(element.name);
      }
    }
  }

  acceptedCategories = [];
};

function createUUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
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

function timeStamp() {
  const now = new Date();
  const time = [now.getHours(), now.getMinutes(), now.getSeconds()];
  for (let i = 1; i < 3; i++) {
    if (time[i] < 10) {
      time[i] = "0" + time[i];
    }
  }
  return "[" + time.join(":") + "] ";
}

export async function initI18next() {
  await i18next
    .use(HttpApi)
    .use(LanguageDetector)
    .init({
      debug: true,
      supportedLngs: ["en", "cs"],
      fallbackLng: "en",
      nonExplicitSupportedLngs: true,
      backend: {
        loadPath: "./lang/{{lng}}.json",
      },
    });
}

/**
 * Translate the content page/elements
 */
export function translatePageElements() {
  const translatableElements = document.querySelectorAll("[data-i18n-key]");
  translatableElements.forEach((el) => {
    const key = el.getAttribute("data-i18n-key");
    const interpolations = el.getAttribute("data-i18n-opt");
    const parsedInterpolations = interpolations ? JSON.parse(interpolations) : {};

    el.innerHTML = i18next.t(key, parsedInterpolations);
  });
}

/**
 * Bind the switcher options to the languages available
 * @param {string} initialValue the value for the given element
 */
export function bindLocaleSwitcher(initialValue) {
  const switcher = document.querySelector("[data-i18n-switcher]");
  console.log("🚀 ~~ switcher", switcher.children.length);
  for (let index = 0; index < switcher.children.length; index++) {
    const element = switcher.children[index];
    // element.value = initialValue;
    console.log("🧲element.value", element.value, `index= ${index}`, `initialValue= ${initialValue}`);
    element.addEventListener("click", (e) => {
      console.log("e.target.value", e.target.value);
      i18next.changeLanguage(e.target.value).then(translatePageElements);
    });
  }
  // ((element) => {
  // element.value = initialValue;
  // console.log("element.value", element.value);
  // element.onchange = (e) => {
  //   i18next.changeLanguage(e.target.value).then(translatePageElements);
  // };
  // });
}

fetchClientIp().then((country) => {
  CountryCode = country;
  ccInstance = new CookieConsent(optionsObj(country, testType));
  ccInstance.autoOpen = true;
  ccInstance
    .on("initialized", function (popup) {
      // ccInstance.popup?.open()
      initiateTypeChangeAndBannerShow();
    })
    .on("popupOpened", (...args) => {
      initiateTypeChangeAndBannerShow();
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
      acceptNecessaryCookies();
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
      acceptNecessaryCookies();
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
      acceptNecessaryCookies();
      // ccInstance.popup?.close();
    })
    .on("error", console.error);
};

export function initiateTypeChangeAndBannerShow() {
  const bannerTypeChangeButtons = document.querySelectorAll(".banner-type-change");
  const acceptAllCookiesAtOnce = document.getElementById("accept-all-cookies-at-once");
  acceptAllCookiesAtOnce.addEventListener("click", () => {
    setTimeout(() => {
      allowAllCookiesAtOnce();
    }, 200);
  });
  for (const typeChangeElement of bannerTypeChangeButtons) {
    typeChangeElement.addEventListener("click", (event) => {
      timeStamp();
      // toggleType.addEventListener("click", (e) => {
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
          acceptNecessaryCookies();
        }, 300);
      }
      //  else if (testType === "categories") {
      //   testType = "info ";
      //   ccInstance.destroy();
      //   optionsObj(CountryCode, "info");
      //   draw(CountryCode);
      // }
    });
  }
  // }, 400);
}
