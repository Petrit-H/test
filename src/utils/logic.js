import {
  ANALYTICAL,
  CONSENT_CARET_DOWN_ICON,
  MARKETING,
  NECESSARY,
  OTHER,
  PREFERENCES,
} from "../constants";
import {
  saveAllCookies,
  saveNecessaryCookies,
  saveSpecificCookies,
} from "../getDomainsWithCookies";
import {
  fetchDataFromJSONFile,
  DomainId,
  DomainName,
  DomainWebsiteUrl,
  Language,
  LanguagesList,
  DomainCategoriesWithCookies,
  DomainCategories,
  CookiesPerDomain,
  // } from "../getDomainsWithCookies";
} from "../cookies";
import { fillJSONWithCheckedCategory, responseJSON } from "../initFile";

let data = [];
let COOKIES = [];
let cookiesPerCateroryArr = [];
let response = [];

/**
 * Filter the cookies for a category
 * @param {Array[]} arr the array to map through and filter the data
 * @param {Integer} id the id used as a fiter condition
 * @param {String} category used to print the category being filtered
 * @returns the array with cookies for a specific category
 */
const filterCookiesByCategory = (arr, id, category) => {
  response = arr.filter((item) => item.categoryId === +id);
  // console.log(`🚀 ~ ${category} id:`, +id, `=> `, response);
  return response;
};

/**
 * FILL THE COOKIE SETTINGS SECTION
 * @param {Integer} categoryId
 * @param {Integer} domainId
 */
const fillCookiesSettingItem = (categoryId, domainId) => {
  COOKIES = filterCookiesByCategory(
    CookiesPerDomain,
    categoryId,
    cookiesPerCateroryArr,
    "COOKIES"
  );
  const noData = document.getElementById("noData");
  if (COOKIES.length === 0) {
    noData.classList.remove("hidden");
  } else {
    noData.classList.add("hidden");
  }

  setTimeout(() => {
    const customCategoriesBanner = document.querySelector(
      ".custom-categories-banner"
    );

    customCategoriesBanner.innerHTML = COOKIES?.map((item) => {
      return `
 <div class="settingAccordion border border-gray-200 my-0.5 xl:my-2 rounded-md">
   <div class="accordionHeader cursor-pointer flex justify-between p-4" data-cookie-settings-id=${categoryId}>
      <p class="category-title font-medium">${item.name}</p>
      <div class="controlButtons flex">
         <button id="closeIcon" class="carret closeIcon cursor-pointer my-auto">
            <img src="${CONSENT_CARET_DOWN_ICON}" class="toggleAccordion transition transform duration-500 ease-in-out "
               alt="caret up/down" />
         </button>
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
            <span class="flex-1" id="cookieDuration">${item.expiration}</span>
         </li>
         <li class="flex justify-between my-4 p-2">
            <span class="flex-1 text-primary-light">Category</span>
            <span class="flex-1" id="cookieCategory">${item.category.name}</span>
         </li>
         <li class="flex justify-between my-4 p-2">
            <span class="flex-1 text-primary-light">Description</span>
            <span class="flex-1" id="cookieDescription">${item.description}</span>
         </li>
      </ul>
   </div>
</div>
              `;
    }).join("");
    settingsAccordionToggle();
  }, 200);
};

/**
 * Toggle the category accordion
 */
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
      const domainID = accordionHeaders[i].dataset.did;
      injectedLabel[i].addEventListener("click", (event) => {
        event.stopPropagation();
      });
      accordionHeaders[i].addEventListener("click", () => {
        const contentData = document.getElementById(
          `CATEGORY_CONTENT_${categoryID}`
        );
        ["h-0", "hidden"].map((cssClass) => {
          contentData?.classList?.toggle(cssClass);
        });
        const children = accordionContents[i].childNodes;
      });
      categoryDescription[i].addEventListener("click", () => {
        showModal(categoryID, domainID);
      });
    }
  }, 300);
};

/**
 * Send the user one step back
 */
const goBackFunc = function () {
  console.log("go back");
  document.getElementById("COOKIE_SETTINGS").classList.add("hidden");
  document.getElementById("COOKIE_DISPLAY").classList.remove("hidden");
  data = [];
  COOKIES = [];
};

/**
 * Show the "Cookies Settings" modal
 * @param {Integer} categoryId the id of the category id
 * @param {Integer} domainId  the id of the domain
 */
const showModal = function (categoryId, domainId) {
  document.getElementById("COOKIE_SETTINGS").classList.remove("hidden");
  document.getElementById("COOKIE_DISPLAY").classList.add("hidden");
  const goBack = document.getElementById("goBack");
  goBack.addEventListener("click", () => {
    goBackFunc();
  });
  fillCookiesSettingItem(categoryId, domainId);
};

/**
 * toggle multiple CSS classess at once
 * @param {HTMLElement} el the target element
 * @param  {...any} cls the array of the classess
 */
const toggleCSSclasses = (el, ...cls) => {
  cls.map((cl) => el.classList.toggle(cl));
};

/**
 * toggle the "Cookie Settings modal" accordion section
 */
const settingsAccordionToggle = function () {
  setTimeout(() => {
    const accordionHeader = document.querySelectorAll(
      ".settingAccordion .accordionHeader"
    );
    const accordionContent = document.querySelectorAll(
      ".settingAccordion .accordionContent"
    );
    const carretToggle = document.querySelectorAll(".toggleAccordion");
    for (let i = 0; i < accordionHeader.length; i++) {
      accordionHeader[i].addEventListener("click", function () {
        toggleCSSclasses(accordionContent[i], "hidden", "h-0");
        carretToggle[i].classList.toggle("rotate-180");
      });
    }
  }, 200);
};

/**
 * fill the "Cookies Settings Modal" with the categories for all the accordion elements
 */
const fillCategories = function () {
  fetchDataFromJSONFile().then((json) => json);
  setTimeout(() => {
    const basicCategoriesBanner = document.querySelector(
      ".basic-categories-banner"
    );

    // console.log("🚀 ~ ~ ~ basicCategoriesBanner", basicCategoriesBanner);
    basicCategoriesBanner.innerHTML = DomainCategories?.slice(0)
      ?.reverse()
      ?.map((item) => {
        return `
        <li id=test-${
          item.id
        } class="cc-category flex-col border border-gray-200 my-0.5 xl:my-2 rounded-md  cursor-pointer">
          <div class="accordionHeader w-full cursor-pointer flex justify-between p-4" data-category-id=${
            item.id
          }
              data-did=${DomainId}>
              <p class=" category-title font-medium">${item.name}</p>
              <label for="${item.name.toLowerCase()}" class="switch-toggle relative dot-wrapper inline-flex cursor-pointer"
                tabindex=${item.id}>
                <button class="cc-btn w-auto group relative consentButton ">
                    <input type="checkbox" id=${item.id} ${
          item.checked && "checked"
        } data-radio-parent-category-name="${
          item.name
        }" class="radioButtonCookie"
                      name="${item.name}" value="${item.name.toLowerCase()}" ${
          item.name.toLowerCase() === "necessary" ? "disabled checked" : ""
        } />
                    <div class="switch-holder block border border-primary-stroke  w-9 h-6 rounded-full transition"></div>
                    <div class="${
                      item.name.toLowerCase() === "necessary" &&
                      "translate-x-3 transform cursor-not-allowed"
                    } dot absolute left-1 top-1 my-0 w-4 h-4 rounded-full transition ${
          item.name.toLowerCase() === "necessary" ? "bg-red-700" : "bg-gray-400"
        }"></div>
                </button>
              </label>
          </div>
          <div class="accordionContent border-t h-0 hidden transition-all duration-500 ease-in-out " id="CATEGORY_CONTENT_${
            item.id
          }">
              <div class="mx-4 py-4 px-2">
                <p class="category-description mb-4 transition duration-300 ease-in-out transform">
                    ${item.description}
                </p>
                <p value=${item.id} data-settings-details-id=${
          item.id
        } class="cookieDetails text-blue-500  transition duration-300 ease-in-out transform cursor-pointer max-w-max">
                    Cookies Details</p>
              </div>
          </div>
        </li>
        `;
      })
      .join("");

      // console.log(responseJSON)
  }, 150);


};

/**
 * allow all the cookies
 */
const allowAllCookies = function () {
  setTimeout(() => {
    const allowAllCookiesButton = document.querySelector(".allow-all");
    const radioButtons = document.querySelectorAll(".radioButtonCookie");
    const cookieRadioButton = document.querySelectorAll(".cc-btn");
    allowAllCookiesButton.addEventListener("click", () => {
      for (let i = 0; i < radioButtons.length; i++) {
        const element = radioButtons[i];
        element.checked = true;
        // saveSpecificCookies(element.id);
        saveAllCookies();
      }
      fillJSONWithCheckedCategory();
    });
  }, 300);
};

/**
 * allow necessary cookies
 */
const acceptNecessary = function () {
  setTimeout(() => {
    const gotItButton = document.querySelector(".got-it-button");
    gotItButton.addEventListener("click", () => {
      saveNecessaryCookies();
      fillJSONWithCheckedCategory();
    });
  }, 300);
};

/**
 * stops the event from propagating and causing side efects
 * @param {*} event the target clicked
 */
const stopParentClick = function (event) {
  event.stopPropagation();
};

export {
  bannerAccordionToggle,
  showModal,
  goBackFunc,
  filterCookiesByCategory,
  settingsAccordionToggle,
  fillCategories,
  fillCookiesSettingItem,
  allowAllCookies,
  acceptNecessary,
  stopParentClick,
};
