import moment from "moment";
import { CARET_DOWN_ICON, COOKIES_CATEGORIES } from "../constants";
import {
  acceptAllTheCookies,
  categories,
  cookiesPerCategory,
  fetchCategoriesFromAPI,
  getCookiesData,
  responseData,
} from "../getDomainsWithCookies";

import { setCookie } from "./cookie";
const COOKIE_SETTINGS = document.getElementById("COOKIE_SETTINGS");
const COOKIE_DISPLAY = document.getElementById("COOKIE_DISPLAY");
let data = [];
// //!  FILL THE COOKIE SETTINGS SECTION
const fillCookieSettingItem = (index) => {
  // getCookiesData( function (res) {
  //   console.log("firstfirstfirst", res);
  //   data=res;
  //   // data.concat(res)
  // });
  setTimeout(() => {
    data = getCookiesData();
    // console.warn("🔆", data);
    console.warn("🔆", getCookiesData());

    const cookieSettingsInject = document.querySelector(
      ".cookieSettingsInject"
    );

    console.log("🚀 ~  FILL COOKIES w/INJECT", cookieSettingsInject);
    // debugger
    cookieSettingsInject.innerHTML = data
      ?.map((item, index) => {
        settingsAccordionToggle(index);
        let expirationDate = moment(item.expiration).endOf("day").fromNow();
        console.log("✅ item", item);
        return `<div class="settingAccordion border border-gray-200 my-0.5 xl:my-2 rounded-md">
      <div class="accordionHeader cursor-pointer flex justify-between p-4" data-cookie-settings-id=${index}>
        <p class="category-title font-medium">${item.name}</p>
        <div class="controlButtons flex">
        <div id="closeIcon" class="carret closeIcon cursor-pointer my-auto"><img src="${CARET_DOWN_ICON}"
            class="toggleAccordion transition transform duration-500 ease-in-out " alt="caret up/down"/></div>
        </div>
      </div>
      <div class="accordionContent border-t mx-4 h-0 hidden transition-all duration-500 ease-in-out">
        <ul class="w-full h-auto bg-gray-100  mb-4 transition duration-300 ease-in-out transform ">
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
  }, 200);
};
const filterCookiesByCategory = function (arr, id, storeVariable, category) {
  arr.filter((el) => {
    el.cookies.filter((item) => {
      if (item.categoryId === id) {
        storeVariable.push(item);
      }
    });
  });
  console.log(`🚀 ~ ${category} id:`, id, `=> `, storeVariable);
  return storeVariable;
};
const bannerAccordionToggle = function () {
  setTimeout(() => {
    const accordionHeaders = document.querySelectorAll(
      ".cc-category .accordionHeader"
    );
    const accordionContents = document.querySelectorAll(
      ".cc-category .accordionContent"
    );
    const categoryDescription =
      document.getElementsByClassName("cookieDetails");
    const injectedLabel = document.querySelectorAll(".dot-wrapper");

    for (let i = 0; i < accordionHeaders.length; i++) {
      const categoryID = accordionHeaders[i].dataset.categoryId;
      injectedLabel[i].addEventListener("click", (event) => {
        event.stopPropagation();
      });
      accordionHeaders[i].addEventListener("click", () => {
        acceptAllTheCookies(categoryID);
        const contentData = document.getElementById(
          `CATEGORY_CONTENT_${categoryID}`
        );
        ["h-0", "hidden"].map((cssClass) => {
          contentData?.classList?.toggle(cssClass);
        });
        const children = accordionContents[i].childNodes;
        console.log("BANNER CLICK ACCORDION ", categoryID, " TOGGLE");
      });
      categoryDescription[i].addEventListener("click", () => {
        console.log("dataset", categoryDescription[i].dataset);
        showModal(categoryID);
      });
    }
  }, 300);
};
const goBackFunc = function () {
  console.log("GO BACK");
  document.getElementById("COOKIE_SETTINGS").classList.add("hidden");
  // COOKIE_SETTINGS.classList.remove("hidden");
  document.getElementById("COOKIE_DISPLAY").classList.remove("hidden");
  // COOKIE_DISPLAY.classList.add("hidden");
  // cookiesPerCategory = [];
  data = [];
  // });
};

const showModal = function (index) {
  document.getElementById("COOKIE_SETTINGS").classList.remove("hidden");
  document.getElementById("COOKIE_DISPLAY").classList.add("hidden");
  const goBack = document.getElementById("goBack");
  goBack.addEventListener("click", () => {
    goBackFunc();
  });
  fillCookieSettingItem(index);

  // console.log("PETRIT", getCookiesData(3));
};
const settingsAccordionToggle = function (index) {
  setTimeout(() => {
    console.dir("🚀 ~ settingsAccordionToggle ~ index", index);
    const accordionHeader = document.querySelectorAll(
      ".settingAccordion .accordionHeader"
    );
    console.warn("🚀 ~ Settings Accordion Elements", accordionHeader.length);
    const accordionContent = document.querySelectorAll(
      ".settingAccordion .accordionContent"
    );
    const carretToggle = document.querySelectorAll(".toggleAccordion");
    // for (const item of accordionHeader) {
    for (let i = 0; i < accordionHeader.length; i++) {
      accordionHeader[i].addEventListener("click", () => {
        ["h-0", "hidden"].map((cssClass) =>
          accordionContent[i]?.classList?.toggle(cssClass)
        );
        carretToggle[i]?.classList?.toggle("rotate-180");
        const { children } = accordionContent[index];
        console.log("✅ children", children);
        // for (element in children) {
        //   children[element]?.classList?.toggle("opacity-0");
        // }
        console.log("click");
      });
    }
  }, 200);
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
           <div class="accordionHeader w-full cursor-pointer flex justify-between p-4" data-category-id=${
             item.id
           }
           >
             <p class=" category-title font-medium">${item.name}</p>
             <label for=${item.name.toLowerCase()} class="switch-toggle relative dot-wrapper inline-flex cursor-pointer" tabindex=${
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
           <p value=${item.id} data-settings-details-id=${item.id}
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
