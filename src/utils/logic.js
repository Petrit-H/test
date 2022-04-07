// const { getCookiesData } = require("../getDomainsWithCookies");
// import { getCookiesData } from "../getDomainsWithCookies";

import moment from "moment";
import { CARET_DOWN_ICON, COOKIES_CATEGORIES } from "../constants";
import {
  categories,
  cookiesPerCategory,
  fetchCategoriesFromAPI,
  getCookiesData,
  responseData,
} from "../getDomainsWithCookies";
import { setCookie } from "./cookie";
// let categories = fetchCategoriesFromAPI();
const COOKIE_SETTINGS = document.getElementById("COOKIE_SETTINGS");
const COOKIE_DISPLAY = document.getElementById("COOKIE_DISPLAY");
// let cookiesPerCategory = [];
// const CMP_Section = {
const bannerAccordionToggle = function () {
  setTimeout(() => {
    // console.log("🚀 ~ IDDDDD", index);
    const accordionHeaders = document.querySelectorAll(
      ".cc-category .accordionHeader"
    );
    const accordionContents = document.querySelectorAll(
      ".cc-category .accordionContent"
    );
    const categoryDescription =
      document.getElementsByClassName("cookieDetails");
    console.log("🚀 ~~~~~~~~~~ categoryDescription", categoryDescription);
    console.log(
      "🚀 ~ file: logic.js ~ line 22 ~ bannerAccordionToggle ~ accordionHeaders",
      accordionHeaders
    );
    console.log(
      "🚀 ~ file: logic.js ~ line 26 ~ bannerAccordionToggle ~ accordionContent",
      accordionContents
    );
    for (let i = 0; i < accordionHeaders.length; i++) {
      const categoryID = accordionHeaders[i].dataset.id;
      accordionHeaders[i].addEventListener("click", () => {
        const contentData = document.getElementById(
          `CATEGORY_CONTENT_${categoryID}`
        );
        console.log("🚀 ~ categoryID", categoryID);
        ["h-0", "hidden"].map((cssClass) => {
          console.log("🚀 ~ cssClass", cssClass);
          contentData?.classList?.toggle(cssClass);
        });
        const children = accordionContents[i].childNodes;
        console.log("🚀 ~ CHILDREN", children);
        console.log("BANNER CLICK ACCORDION ", categoryID, " TOGGLE");
      });
      categoryDescription[i].addEventListener("click", () => {
        console.log(categoryDescription[i].dataset);
        showModal(categoryID);
      });
    }
  }, 300);
};
// //! fetch all the domains, their cookies and filter cookies for categories
// const fetchDomainsFromAPI = () => {
//   let config = {
//     method: "get",
//     url: "https://cmp.gjirafa.dev/DomainListViewTestHalabaku",
//     headers: {},
//   };

//   axios(config)
//     .then(function (response) {
//       responseData = response.data;
//       console.log("==========︾==========");
//       console.log("🚀 ~ categories", categories);
//       console.log("🚀 ~ responseData", responseData);
//       // console.log("🚀 ~ dataForBala", dataForBala);
//       // console.log("==========xxx==========");
//       filterCookiesByCategory(
//         response.data,
//         5,
//         NECESSARY,
//         "NECESSARY"
//       );
//       filterCookiesByCategory(
//         response.data,
//         4,
//         PREFERENCES,
//         "PREFERENCES"
//       );
//       filterCookiesByCategory(
//         response.data,
//         3,
//         ANALYTICAL,
//         "ANALYTICAL"
//       );
//       filterCookiesByCategory(
//         response.data,
//         2,
//         MARKETING,
//         "MARKETING"
//       );
//       filterCookiesByCategory(response.data, 1, OTHER, "OTHER");
//       console.log("==========︽==========");
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

// //! Fetch data from the CATEGORIES endpoint
// const fetchCategoriesFromAPI = () => {
//   let config = {
//     method: "get",
//     url: "https://cmp.gjirafa.dev/CategoryListView",
//     headers: {},
//   };
//   axios(config)
//     .then(function (response) {
//       // console.log(response.data);
//       categories = response.data;
//       // createCategoriesContent();
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

//!  FILL THE COOKIE SETTINGS SECTION
const fillCookieSettingItem = () => {
  console.log("fillCookieSettingItem()");
  // console.log(COOKIE_SETTINGS);
  // console.log(COOKIE_DISPLAY);

  const cookieSettingsInject = document.getElementsByClassName("cookieSettingsInject");
  console.log("🚀 ~  FILL COOKIES w/INJECT", cookieSettingsInject);
  // debugger
  cookieSettingsInject.innerHTML = cookiesPerCategory
    .map((item, index) => {
      let expirationDate = moment(item.expiration).endOf("day").fromNow();
      // console.log(item);
      return `<div class="settingAccordion border border-gray-200 my-0.5 xl:my-2 rounded-md">
      <div class="accordionHeader cursor-pointer flex justify-between p-4" data-modal-settings-id=${index} onclick="settingsAccordionToggle(${index})">
        <p class="category-title font-medium">${item.name}</p>
        <div class="controlButtons flex">
        <div id="closeIcon" class="carret closeIcon cursor-pointer my-auto"><img src="${CARET_DOWN_ICON}"
            class="toggleAccordion transition transform duration-500 ease-in-out " alt="caret up/down"/></div>
        </div>
      </div>
      <div class="accordionContent border-t mx-4 h-0 hidden transition-all duration-500 ease-in-out">
        <ul class="w-full h-auto bg-gray-100 opacity-0 mb-4 transition duration-300 ease-in-out transform ">
            <li class="flex justify-between my-4 p-2">
              <span class="flex-1 text-primary-light">Name</span>
              <span class="flex-1" id="cookieName">${item.name}</span>
            </li>
            <li class="flex justify-between my-4 p-2">
              <span class="flex-1 text-primary-light">Host</span>
              <span class="flex-1" id="cookieHost">${item.cookieDomain}</span>
            </li>
            <li class="flex justify-between my-4 p-2">
              <span class="flex-1 text-primary-light">Duration</span>
              <span class="flex-1" id="cookieDuration">${expirationDate}</span>
            </li>
            <li class="flex justify-between my-4 p-2">
              <span class="flex-1 text-primary-light">Category</span>
              <span class="flex-1" id="cookieCategory">${item.category}</span>
             </li>
            <li class="flex justify-between my-4 p-2">
              <span class="flex-1 text-primary-light">Description</span>
              <span class="flex-1" id="cookieDescription">${item.description}</span>
            </li>
        </ul>
      </div>
    </div>
    </div>
    `;
    })
    .join("");
};

const filterCookiesByCategory = function (arr, id, storeVariable, category) {
  arr.filter((el) => {
    el.cookies.filter((item) => {
      if (item.categoryId === id) {
        storeVariable.push(item);
      }
    });
  });
  return storeVariable;
};
const goBackFunc = function () {
  console.log("GO BACK");
  document.getElementById("COOKIE_SETTINGS").classList.add("hidden");
  // COOKIE_SETTINGS.classList.remove("hidden");
  document.getElementById("COOKIE_DISPLAY").classList.remove("hidden");
  // COOKIE_DISPLAY.classList.add("hidden");
  // cookiesPerCategory = [];
  // });
};
const showModal = function (index) {
  document.getElementById("COOKIE_SETTINGS").classList.remove("hidden");
  // COOKIE_SETTINGS.classList.remove("hidden");
  document.getElementById("COOKIE_DISPLAY").classList.add("hidden");
  // COOKIE_DISPLAY.classList.add("hidden");
  // filterCookiesByCategory(
  //   responseData,
  //   index,
  //   cookiesPerCategory,
  //   "CLICKED ON"
  // );
  // settingsAccordionToggle();
  fillCookieSettingItem();
  const goBack = document.getElementById("goBack");
  goBack.addEventListener("click", () => {
    goBackFunc();
  });
};

const settingsAccordionToggle = function (index) {
  const accordionHeader = document.querySelectorAll(
    ".settingAccordion .accordionHeader"
  );
  console.warn("🚀 ~ Settings Accordion Elements", accordionHeader.length);
  const accordionContent = document.querySelectorAll(
    ".settingAccordion .accordionContent"
  );
  const carretToggle = document.querySelectorAll(".toggleAccordion");
  ["h-0", "hidden"].map((i) => accordionContent[index]?.classList?.toggle(i));
  carretToggle[index]?.classList?.toggle("rotate-180");
  const { children } = accordionContent[index];
  for (element in children) {
    children[element]?.classList?.toggle("opacity-0");
  }
  console.log("click");
};

const fillCookies = function () {
  setTimeout(() => {
    console.log("fillCookie()");
    const cookieCategoriesInject = document.querySelector(
      ".cookie-categories-inject"
    );
    console.log("🚀 ~  FILL COOKIES w/INJECT PETRIT", cookieCategoriesInject);
    console.log("🚀 ~ cookie-categories-inject", cookieCategoriesInject);
    cookieCategoriesInject.innerHTML = categories
      ?.slice(0)
      ?.reverse()
      ?.map((item) => {
        console.log("ID", item.id);
        return `<li class="cc-category flex-col border border-gray-200 my-0.5 xl:my-2 rounded-md  cursor-pointer"  >
           <div class="accordionHeader w-full cursor-pointer flex justify-between p-4" data-id=${
             item.id
           }
           >
             <p class=" category-title font-medium">${item.name}</p>
             <label for=${item.name.toLowerCase()} class="switch-toggle relative dotWrapper inline-flex cursor-pointer" tabindex=${
          item.id
        }>
             <button class="cc-btn w-auto group relative consentButton " >
               <input type="checkbox" id="${
                 item.id
               }" class="radioButtonCookie" name="${item.name}"
                 value="${item.name.toLowerCase()}" ${
          item.name.toLowerCase() === "necessary" && "disabled checked"
        } />
               <div class="switch-holder block border border-primary-stroke  w-9 h-6 rounded-full transition"></div>
               <div class="${
                 item.name.toLowerCase() === "necessary" &&
                 "translate-x-3 transform cursor-not-allowed"
               } dot absolute left-1 top-1 my-0 w-4 h-4 rounded-full transition
                 ${
                   item.name.toLowerCase() === "necessary"
                     ? "bg-red-700"
                     : "bg-gray-400"
                 }"></div>
             </button>
             </label>
           </div>
           <div class="accordionContent border-t h-0 hidden transition-all duration-500 ease-in-out " id="CATEGORY_CONTENT_${
             item.id
           }">
           <div class="mx-4 py-4 px-2">
           <p class="category-description mb-4 transition duration-300 ease-in-out transform">
           ${item.name}
         </p>
           <p value=${item.id} data-modal-settings-show-id=${item.id}
             class="cookieDetails text-blue-500  transition duration-300 ease-in-out transform cursor-pointer max-w-max">
             Cookies Details</p>
           </div>

           </div>
         </li>`;
      })
      .join("");
  }, 300);
};
const allowAllCookies = function () {
  setTimeout(() => {
    const allowAllCookiesButton = document.querySelector(".allowAll");
    const radioButtons = document.querySelectorAll(".radioButtonCookie");
    const cookieRadioButton = document.querySelectorAll(".cc-btn");
    console.log("click allow all");
    console.log(allowAllCookiesButton);
    allowAllCookiesButton.addEventListener("click", () => {
      for (let i = 0; i < radioButtons.length; i++) {
        const element = radioButtons[i];
        element.checked = true;
        console.log(element.checked);
        element.addEventListener("change", console.log("change"));
        const event = new Event("change");
        element.dispatchEvent(event);
        // }
        // for (let i = 0; i < COOKIES_CATEGORIES.length; i++) {
        getCookiesData(i + 1).then((data) => {
          console.log("ALL COOKIES ", data);
          for (const cookie of data) {
            setCookie(
              cookie.name, // name
              // cookie.value, // value
              "", // value
              cookie.expiryDays, // expiration day
              cookie.domain, // domain
              "", // domain
              cookie.path, // path
              // "/",
              cookie.is_secure // is secure
            );
          }
        });
      }
    });
    // saveAllCookies();
  }, 500);
  // document.removeEventListener("click", allowAllCookiesButton);
};
const acceptNecessary = function () {
  // const ALL_DATA = [];
  setTimeout(() => {
    const gotItButton = document.querySelector(".gotItButton");
    gotItButton.addEventListener("click", () => {
      console.log("================acceptNecessary=================");
      getCookiesData(5).then((data) => {
        console.log("NECESSARY COOKIES ONLY", data);
        for (const cookie of data) {
          setCookie(
            cookie.name, // name
            // cookie.value, // value
            "", // value
            cookie.expiryDays, // expiration day
            cookie.domain, // domain
            "", // domain
            cookie.path, // path
            // "/",
            cookie.is_secure // is secure
          );
        }
      });
    });
  }, 300);
};
const stopParentClick = function (event) {
  event.stopPropagation();
};
const testClick = function (event) {
  console.log("TEST SETTINGS CLICK", event.target);
};
// };

export {
  bannerAccordionToggle,
  showModal,
  goBackFunc,
  filterCookiesByCategory,
  settingsAccordionToggle,
  fillCookies,
  fillCookieSettingItem,
  allowAllCookies,
  acceptNecessary,
  stopParentClick,
  testClick,
};
