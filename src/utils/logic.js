// const { getCookiesData } = require("../getDomainsWithCookies");
// import { getCookiesData } from "../getDomainsWithCookies";

import { COOKIES_CATEGORIES } from "../constants";
import {
  categories,
  fetchCategoriesFromAPI,
  getCookiesData,
  responseData,
} from "../getDomainsWithCookies";
import { setCookie } from "./cookie";
// let categories = fetchCategoriesFromAPI();
const COOKIE_SETTINGS = document.getElementById("COOKIE_SETTINGS");
const COOKIE_DISPLAY = document.getElementById("COOKIE_DISPLAY");

// const CMP_Section = {
const bannerAccordionToggle = function (index) {
  console.log("🚀 ~ IDDDDD", index);
  const accordionHeader = document.querySelectorAll(
    ".cc-category .accordionHeader"
  );
  const accordionContent = document.querySelectorAll(
    ".cc-category .accordionContent"
  );
  ["h-0", "hidden"].map((i) => {
    console.log(i);
    document.getElementById(`CATEGORY_CONTENT_${index}`)?.classList?.toggle(i);
  });
  const children = accordionContent[index]?.children;
  console.log("🚀 ~ CHILDREN", accordionContent[index]);
  console.log("BANNER CLICK ACCORDION ", index, " TOGGLE");
};
const showModal = function (event, index) {
  let id;
  const toggle = document.querySelectorAll(".cookieDetails");
  console.log("CATEGORY ID CLIKED: ", index);
  COOKIE_SETTINGS.classList.remove("hidden");
  COOKIE_DISPLAY.classList.add("hidden");
  filterCookiesByCategory(
    responseData,
    index,
    cookiesPerCategory,
    "CLICKED ON"
  );
  // settingsAccordionToggle();
  fillCookieSettingItem();
};
const goBackFunc = function () {
  console.log("GO BACK");
  COOKIE_DISPLAY.classList.remove("hidden");
  COOKIE_SETTINGS.classList.add("hidden");
  cookiesPerCategory = [];
  // });
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
      ".cookieCategoriesInject"
    );
    console.log("🚀 ~  FILL COOKIES w/INJECT PETRIT", cookieCategoriesInject);

    console.log(
      "🚀 ~ file: scripts.js ~ line 416 ~ fillCookies ~ cookieCategoriesInject",
      cookieCategoriesInject
    );
    cookieCategoriesInject.innerHTML = categories
      ?.slice(0)
      ?.reverse()
      ?.map((item) => {
        console.log("ID", item.id);
        return `<li class="cc-category flex-col border border-gray-200 my-0.5 xl:my-2 rounded-md  cursor-pointer"  >
           <div class="accordionHeader w-full cursor-pointer flex justify-between p-4" onclick="bannerAccordionToggle(${
             item.id
           })">
             <p class=" category-title font-medium">${item.name}</p>
             <label for=${item.name.toLowerCase()} class="switch-toggle relative dotWrapper inline-flex cursor-pointer" tabindex=${
          item.id
        }>
             <button class="cc-btn  group relative" onclick="stopParent(event)">
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
         <div onclick="showModal(event,${item.id})">
           <p value=${item.id}
             class="cookieDetails text-blue-500  transition duration-300 ease-in-out transform cursor-pointer max-w-max">
             Cookies Details</p>
         </div>
           </div>

           </div>
         </li>`;
      })
      .join("");
  }, 400);
};
const allowAllCookies = function (event) {
  setTimeout(() => {
    console.log("🚀 ~ ALLOW ALL", event);
    const radioButtons = document.querySelectorAll(".radioButtonCookie");
    const cookieRadioButton = document.querySelectorAll(".cc-btn");
    console.log("click allow all");
    for (let index = 0; index < radioButtons.length; index++) {
      const element = radioButtons[index];
      element.checked = true;
      console.log(element.checked);
      element.addEventListener("change", console.log("change"));
      const event = new Event("change");
      element.dispatchEvent(event);
    }
    for (let i = 0; i < COOKIES_CATEGORIES.length; i++) {
      getCookiesData(i + 1).then((data) => {
        console.log("ALL COOKIES ", data);
        for (const cookie of data) {
          setCookie(
            cookie.name, // name
            "", // value
            cookie.expiryDays, // expiration day
            "", // domain
            cookie.path, // path
            // "/",
            cookie.is_secure // is secure
          );
        }
      });
    }
    // saveAllCookies();
  }, 500);
  document.removeEventListener("click", event.target);
};
const acceptNecessary = function () {
  // const ALL_DATA = [];
  getCookiesData(5).then((data) => {
    console.log("NECESSARY COOKIES ONLY", data);
    for (const cookie of data) {
      setCookie(
        cookie.name, // name
        "", // value
        cookie.expiryDays, // expiration day
        "", // domain
        cookie.path, // path
        // "/",
        cookie.is_secure // is secure
      );
    }
  });
};
const stopParent = function (event) {
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
  allowAllCookies,
  acceptNecessary,
  stopParent,
  testClick,
};
