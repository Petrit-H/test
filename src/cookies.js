import {
  settingsAccordionToggle,
  filterCookiesByCategory,
} from "./utils/logic";
import { CARET_DOWN_ICON, COOKIES_CATEGORIES } from "./constants";
import {
  // categories,
  fetchCategoriesFromAPI,
  fetchDomainsFromAPI,
  getCookiesData,
  // responseData,
} from "./getDomainsWithCookies";
import { setCookie } from "./utils/cookie";
import axios from "axios";
import moment from "moment";

console.log(createUUID());
const OTHER = [];
const MARKETING = [];
const ANALYTICAL = [];
const PREFERENCES = [];
const NECESSARY = [];
// let responseData = [];
// let categories = [];
// let filteredCookies = [];
let responseForCookies = []; //?{ cookie_name: "", cookie_status: "" }
let cookiesPerCategory = [];
// let dataForBala = [];
let dataForBala = {};



window.addEventListener("load", function (event) {
  console.log(
    "welcome to🔐 \n",
    `
      CCCCCCCCCCCCC MMMMMMMM              MMMMMMMMM PPPPPPPPPPPPPPP
    CCC:::::::::::C M:::::::M             M:::::::M P:::::::::::::::P
  CC::::::::::::::C M::::::::M           M::::::::M P:::::PPPPPP:::::P
 C:::::CCCCCCCC:::C M:::::::::M         M:::::::::M P:::::P     P:::::P
C:::::C       CCCCC M::::::::::M       M::::::::::M P:::::P     P:::::P
C:::::C              M::::::::::M     M::::::::::M   P::::P     P:::::P
C:::::C              M::::::M::::M   M::::M::::::M   P::::PPPPPP:::::P
C:::::C              M:::::M M::::M M::::M M:::::M   P:::::::::::::PP
C:::::C              M:::::M  M::::M::::M  M:::::M   P::::PPPPPPPPP
C:::::C              M:::::M   M:::::::M   M:::::M   P::::P
C:::::C              M:::::M    M:::::M    M:::::M   P::::P
C:::::C       CCCCC M::::::M     MMMMM     M::::::M P::::::P
 C:::::CCCCCCCC:::C M::::::M               M::::::M P::::::P
  CC::::::::::::::C M::::::M               M::::::M P::::::P
    CCC:::::::::::C M::::::M               M::::::M P::::::P
       CCCCCCCCCCCC MMMMMMMM               MMMMMMMM PPPPPPPP
    `
  );
  const COOKIE_SETTINGS = document.getElementById("COOKIE_SETTINGS");
  const COOKIE_DISPLAY = document.getElementById("COOKIE_DISPLAY");
  const spinner = document.getElementById("spinner");
  const noData = document.getElementById("noData");
  const goBack = document.getElementById("goBack");

  // const cookieSectionInject = document.querySelector(".cookieSectionInject");
  const cookieSectionInject = document.getElementById("cookieSectionInject");

  // bannerAccordionToggle()

  setTimeout(() => {
    let categories = fetchCategoriesFromAPI();
    let responseData = fetchDomainsFromAPI();
    toggleInjectedRadioButtons();

    // bannerAccordionToggle()
    // showModal();

    dataForBala = {
      id: createUUID(),
      domains: responseData,
      NECESSARY: NECESSARY,
      PREFERENCES: PREFERENCES,
      ANALYTICAL: ANALYTICAL,
      MARKETING: MARKETING,
      OTHER: OTHER,
    };
    console.log("==================🧲🧲🧲🧲====================");
    console.log("🚀 ~ categories", categories);
    console.log("🚀 ~ responseData", responseData);
    console.log("🚀 ~ DATA-4-BALA", dataForBala);
    console.log("==================🧲🧲🧲🧲=====================");

    // if (responseData.length === 0) {
    //   noData.classList.remove("hidden");
    // }
  }, 400);
});

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
  return uuid;
}



//! fetch category cookies
function categoryCookieFetch(id, storeVariable) {
  responseData.filter((el) => {
    el.cookies.filter((item) => {
      if (item.categoryId === id) {
        storeVariable.push(item);
      }
    });
  });
  console.log(
    "🚀 ~ file: cookies.js ~ line 377 ~ categoryCookieFetch ~ id",
    id
  );
  console.log("🚀 ~ cookiesPerCategory", storeVariable);
}

//! toggle injected radio button ON/OFF to accept and/or decline cookies
function toggleInjectedRadioButtons() {
  const injectedLabel = document.querySelectorAll(".dotWrapper");
  for (let i = 0; i < injectedLabel.length; i++) {
    console.log("🚀 ~ toggleInjectedRadioButtons ~ item", i);
    const injectedInput = injectedLabel[i].getElementsByTagName("input");
    const injectedInputButton =
      injectedLabel[i].getElementsByClassName("consentButton");
    responseForCookies.push({
      cookie_name: injectedInput[0].value,
      cookie_status: injectedInput[0].checked,
    });
    injectedInputButton.addEventListener("click", (event) => {
      event.stopPropagation();
    });
    setTimeout(() => {
      for (const iterator of inputCheckout) {
        console.log(iterator.value, "-->", iterator.checked);
      }
    }, 500);
  }
  console.log("responseForCookies", responseForCookies);
}
