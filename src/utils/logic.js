import {
  CMP_BANNER_CHEVRON_DOWN,
  CMP_CARET_DOWN_ICON,
  CMP_IS_LOCALHOST,
} from "../constants";
import { saveAllCookies } from "../getDomainsWithCookies";
import {
  exportGlobalJSON,
  cmpDomainId,
  cmpDomainCategories,
  cmpCookiesPerDomain,
  // } from "../getDomainsWithCookies";
} from "../cookies";
import {
  bindLocaleSwitcher,
  consentStyleData,
  fillJSONWithAllCategories,
  fillJSONWithCheckedCategory,
  initI18next,
  responseJSON,
  translatePageElements,
} from "../initFile";
import i18next from "i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { setCookie } from "./cookie";

let data = [];
let cookies = [];
let filteredCookies = [];
let cookiesPerCategoryArr = [];
let response = [];

/**
 * Filter the cookies for a category
 * @param {Array[]} arr the array to map through and filter the data
 * @param {Integer} id the id used as a fiter condition
 * @param {String} category used to print the category being filtered
 * @returns the array with cookies for a specific category
 */
const filterCookiesByCategory = (arr, id, storeArray, category) => {
  response = arr.filter((item) => item.categoryId === +id);
  return response.flat();
};

const switchBannerTabs = () => {
  const tabs = document.querySelectorAll("[data-tab-target]");
  const tabContents = document.querySelectorAll("[data-tab-content]");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = document.querySelector(tab.dataset.tabTarget);
      tabContents.forEach((tabContent) => {
        tabContent.classList.remove("active");
      });
      tabs.forEach((tab) => {
        tab.classList.remove("active");
      });
      tab.classList.add("active");
      target.classList.add("active");
    });
  });
};

const languageButtonToggle = () => {
  const checkInfoType = document.querySelector(".cc-type-info");
  const checkCategoriesType = document.querySelector(".cc-type-categories");
  setTimeout(() => {
    const languageButton = document.getElementById("language-icon-button");
    const languageOptionsMenu = document.getElementById("language-options");
    const languageItems = document.querySelectorAll(".language");
    const rootModal = document.querySelector(".cmp-categories");

    for (let i = 0; i < languageItems.length; i++) {
      const element = languageItems[i];
      const prevElement = languageItems[i - 1];
      element.addEventListener("click", () => {
        languageItems.forEach((item) => {
          item.classList.remove("text-blue");
        });
        element.classList.add("text-blue");
      });
    }

    // languageButton.addEventListener("mouseleave",()=>{
    //   languageOptionsMenu.classList.add("hidden")
    // })
    if ((checkInfoType !== null) | (checkCategoriesType !== null)) {
      languageButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        languageOptionsMenu.classList.toggle("hidden");
      });
      rootModal.addEventListener("click", () => {
        !languageOptionsMenu.classList.contains("hidden") &&
          languageOptionsMenu.classList.toggle("hidden");
      });
    }
  }, 0);
};

/**
 * FILL THE COOKIE SETTINGS SECTION
 * @param {Integer} categoryId
 * @param {Integer} domainId
 */
const fillCookiesSettingItem = () => {
  cookies = cmpCookiesPerDomain;
  // const noData = document.getElementById("noData");
  // if (cookies.length === 0) {
  //   noData.classList.remove("hidden");
  // } else {
  //   noData.classList.add("hidden");
  // }

  setTimeout(() => {
    const customCategoriesBanner = document.getElementById(
      "custom-categories-banner"
    );

    customCategoriesBanner.innerHTML = cookies
      ?.map((item) => {
        return `
 <div class="setting-accordion border-b border-l border-r first-of-type:border-t first-of-type:rounded-tr-md first-of-type:rounded-tl-md last-of-type:rounded-br-md last-of-type:rounded-bl-md border-gray-cmpLight my-0 rounded-none">
   <div id="cookie-${item.id}" class="accordion-header cursor-pointer flex justify-between p-4" data-cookie-settings-id=${item.id}>
      <p class="category-title text-cmpDefault text-blue-cmp500 font-cmpNormal">${item.name}</p>
      <div class="control-buttons flex">
         <button id="closeIcon" class="carret closeIcon cursor-pointer my-auto">
            <img src="${CMP_CARET_DOWN_ICON}" class="cookie-toggle-accordion transition transform duration-200 ease-in-out "
               alt="caret up/down" />
         </button>
      </div>
   </div>
      <ul class="mb-4 transform accordion-content mx-4 h-0 hidden transition-all duration-500 ease-in-out">
        <li class="flex flex-col justify-between mb-4">
          <span class="flex-1 text-blue-cmp300 text-cmp-small font-cmpMedium " data-i18n-key="BannerCookiesTab.BcCategory">Category</span>
          <span class="flex-1 text-cmp-small text-blue-cmp500 font-cmpMedium" id="cookieCategory" >${item.categoryName}</span>
        </li>
        <li class="flex flex-col justify-between my-4">
           <span class="flex-1 text-blue-cmp300 text-cmp-small font-cmpMedium " data-i18n-key="BannerCookiesTab.BcDescription">Description</span>
           <span class="flex-1 text-cmp-small text-blue-cmp500 font-cmpMedium" id="cookieDescription" >${item.description}</span>
        </li>
         <li class="flex flex-col justify-between my-4">
            <span class="flex-1 text-blue-cmp300 text-cmp-small font-cmpMedium " data-i18n-key="BannerCookiesTab.BcName">Name</span>
            <span class="flex-1 text-cmp-small text-blue-cmp500 font-cmpMedium" id="cookieName" >${item.name}</span>
         </li>
         <li class="flex flex-col justify-between my-4">
            <span class="flex-1 text-blue-cmp300 text-cmp-small font-cmpMedium" data-i18n-key="BannerCookiesTab.BcHost">Host</span>
            <span class="flex-1 text-cmp-small text-blue-cmp500 font-cmpMedium" id="cookieHost">${item.cookieDomain}</span>
         </li>
         <li class="flex flex-col justify-between my-4">
            <span class="flex-1 text-blue-cmp300 text-cmp-small font-cmpMedium " data-i18n-key="BannerCookiesTab.BcDuration">Duration</span>
            <span class="flex-1 text-cmp-small text-blue-cmp500 font-cmpMedium" id="cookieDuration">${item.expiration}</span>
         </li>
      </ul>
</div>
              `;
      })
      .join("");
    settingsAccordionToggle();
  }, 50);
};

/**
 *
 * @param {Array} item the cookie passed to be mapped through
 * @returns
 */
const filteredCookiesPerCategory = (item) => {
  return `
  <div class="tab-item setting-accordion border-b border-l border-r first-of-type:border-t first-of-type:rounded-tr-md first-of-type:rounded-tl-md last-of-type:rounded-br-md last-of-type:rounded-bl-md border-gray-cmpLight my-0 rounded-none">
    <div class="accordion-header  cursor-pointer flex justify-between p-4" data-cookie-settings-id=${item.id}>
       <p class="category-title text-cmpDefault text-blue-cmp500 font-cmpNormal">${item.name}</p>
       <div class="control-buttons flex">
          <button id="closeIcon" class="carret closeIcon cursor-pointer my-auto">
             <img src="${CMP_CARET_DOWN_ICON}" class="toggle-accordion transition transform duration-200 -rotate-90 ease-in-out "
                alt="caret up/down" />
          </button>
       </div>
    </div>
       <ul class="mb-4 transform accordion-content mx-4 h-0 hidden transition-all duration-500 ease-in-out">
         <li class="flex flex-col justify-between mb-4">
           <span class="flex-1 text-blue-cmp300 text-cmp-small font-cmpMedium ">Category</span>
           <span class="flex-1 text-cmp-small text-blue-cmp500 font-cmpMedium" id="cookieCategory">${item.categoryName}</span>
         </li>
         <li class="flex flex-col justify-between my-4">
            <span class="flex-1 text-blue-cmp300 text-cmp-small font-cmpMedium ">Description</span>
            <span class="flex-1 text-cmp-small text-blue-cmp500 font-cmpMedium" id="cookieDescription">${item.description}</span>
         </li>
          <li class="flex flex-col justify-between my-4">
             <span class="flex-1 text-blue-cmp300 text-cmp-small font-cmpMedium ">Name</span>
             <span class="flex-1 text-cmp-small text-blue-cmp500 font-cmpMedium" id="cookieName">${item.name}</span>
          </li>
          <li class="flex flex-col justify-between my-4">
             <span class="flex-1 text-blue-cmp300 text-cmp-small font-cmpMedium ">Host</span>
             <span class="flex-1 text-cmp-small text-blue-cmp500 font-cmpMedium" id="cookieHost">${item.cookieDomain}</span>
          </li>
          <li class="flex flex-col justify-between my-4">
             <span class="flex-1 text-blue-cmp300 text-cmp-small font-cmpMedium ">Duration</span>
             <span class="flex-1 text-cmp-small text-blue-cmp500 font-cmpMedium" id="cookieDuration">${item.expiration}</span>
          </li>
       </ul>
 </div>
               `;
};

const changeTabOnClick = () => {
  const tabs = document.querySelectorAll(".tab-item");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      let cookieId = tab.children[0].dataset.cookieSettingsId;
      const targetCookie = document.getElementById(`cookie-${cookieId}`);
      document.getElementById("cookies-tab").click();
      targetCookie.scrollIntoView(true, {
        behavior: "smooth",
        block: "start",
        inline: "center",
      });
      targetCookie.click();
    });
  });
};

/**
 * Toggle the category accordion
 */
const bannerAccordionToggle = function () {
  setTimeout(() => {
    const accordionHeaders = document.querySelectorAll(".cookie-details");
    const accordionContents = document.querySelectorAll(
      ".cc-category .accordion-content"
    );
    // const categoryDescription = document.getElementsByClassName("cookie-details");
    const radioButtonWrapper = document.querySelectorAll(".dot-wrapper");
    const carretToggle = document.querySelectorAll(".toggle-accordion");

    for (let i = 0; i < accordionHeaders.length; i++) {
      const categoryID = +accordionHeaders[i].dataset.settingsDetailsId;
      // const categoryID = +accordionHeaders[i].dataset.categoryId;
      const domainID = accordionHeaders[i].dataset.did;
      const contentData = document.getElementById(
        `CATEGORY_CONTENT_${categoryID}`
      );
      const closeAllAccContent = () => {
        for (let i = 0; i < accordionContents.length; i++) {
          const element = accordionContents[i];
          element.classList.add("h-0");
          element.classList.add("hidden");
          carretToggle[i].classList.remove("rotate-180");
        }
      };
      radioButtonWrapper[i].addEventListener("click", (event) => {
        event.stopPropagation();
        // console.log("toggle", event.target.checked);
      });
      accordionHeaders[i].addEventListener("click", () => {
        if (
          contentData.classList.contains("hidden") ||
          contentData.classList.contains("h-0")
        ) {
          filteredCookies = filterCookiesByCategory(
            cmpCookiesPerDomain,
            categoryID,
            cookiesPerCategoryArr,
            "filteredCookies"
          );
          contentData.innerHTML = filteredCookies
            ?.map((item) => filteredCookiesPerCategory(item))
            .join("");
          changeTabOnClick();
          closeAllAccContent();
          toggleCSSclasses(contentData, "hidden", "h-0");
          carretToggle[i].classList.add("rotate-180");
        } else {
          filteredCookies = filterCookiesByCategory(
            cmpCookiesPerDomain,
            categoryID,
            cookiesPerCategoryArr,
            "filteredCookies"
          );
          contentData.innerHTML = filteredCookies
            ?.map((item) => filteredCookiesPerCategory(item))
            .join("");
          toggleCSSclasses(contentData, "hidden", "h-0");
          carretToggle[i].classList.remove("rotate-180");
          changeTabOnClick();
        }
        if (filteredCookies.length === 0) {
          contentData.innerHTML = "No cookies to show";
          contentData.classList.add(
            "text-blue-cmp200",
            "font-base",
            "border-cmp-1",
            "border-gray-cmpLight",
            "rounded-tl-4",
            "rounded-tr-4",
            "px-3",
            "py-4"
          );
        }
      });
    }
  }, 200);
};

/**
 * Show the "Cookies Settings" modal
 * @param {Integer} categoryId the id of the category id
 * @param {Integer} domainId  the id of the domain
 */
const showModal = function (categoryId, domainId) {
  document.getElementById("cookie-settings").classList.remove("hidden");
  document.getElementById("cookie-display").classList.add("hidden");

  // fillCookiesSettingItem();
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
      ".setting-accordion .accordion-header"
    );
    const accordionContent = document.querySelectorAll(
      ".setting-accordion .accordion-content"
    );
    const carretToggle = document.querySelectorAll(".cookie-toggle-accordion");

    const closeAllAccContent = () => {
      for (let i = 0; i < accordionContent.length; i++) {
        const element = accordionContent[i];
        element.classList.add("h-0");
        element.classList.add("hidden");
        carretToggle[i].classList.remove("rotate-180");
      }
    };
    for (let i = 0; i < accordionHeader.length; i++) {
      accordionHeader[i].addEventListener("click", function () {
        if (
          accordionContent[i].classList.contains("hidden") ||
          accordionHeader[i].nextElementSibling.classList.contains("h-0")
        ) {
          closeAllAccContent();
          toggleCSSclasses(accordionContent[i], "hidden", "h-0");
          carretToggle[i].classList.add("rotate-180");
        } else {
          toggleCSSclasses(accordionContent[i], "hidden", "h-0");
          carretToggle[i].classList.remove("rotate-180");
        }
      });
    }
  }, 200);
};

/**
 * fill the "Cookies Settings Modal" with the categories for all the accordion elements
 */
const fillCategories = function () {
console.log("LOGIC",consentStyleData)
  exportGlobalJSON().then((json) => json);
  setTimeout(() => {
    const basicCategoriesBanner = document.getElementById(
      "basic-categories-banner"
    );
    basicCategoriesBanner.innerHTML = cmpDomainCategories
      ?.slice(0)
      // ?.reverse()
      ?.map((item, index) => {
        return `<li id=test-${item.id
          } class="cc-category flex-col  my-0.5 xl:my-2 rounded-md">
        <div class="accordion-header text-cmp-small leading w-full flex flex-col justify-between py-3" data-did=${cmpDomainId}>
           <div class="flex items-end justify-between">
              <p class=" category-title font-cmpBold text-black-faded" data-i18n-key=${item.id > 5
            ? item.name
            : `Categories.${item.name}.Categories.BctCategoryName`
          }></p>
              <button class="dot-wrapper inline-flex cursor-pointer  relative cc-btn w-auto group  consentButton ${item.name.toLowerCase() === " necessary"
            ? " cursor-not-allowed"
            : ""
          }">
                 <input type="checkbox" id=${item.id} ${item.checked ? "checked" : ""
          } data-radio-parent-category-name="${item.name}"
                    class="category-radio-button ${item.name.toLowerCase() === " necessary"
            ? "cursor-not-allowed"
            : ""
          }" name="${item.name}" value="${item.name.toLowerCase()}" ${item.name.toLowerCase() === "necessary" ? "disabled checked" : ""
          } />
                 <div class="switch-holder relative block border-cmp-1 border-gray-cmpLight w-9 h-6 rounded-full transition ">
                    <div class="${item.name.toLowerCase() === " necessary"
            ? "translate-x-3 transform cursor-not-allowed necessary-category "
            : "bg-gray-cmpDark"
          }
                       bg-gray-cmpDark dot absolute left-1 top-1/2 -translate-y-1/2 my-0 w-4 h-4 rounded-full transition "></div>
                </div>

              </button>

          </div>
          <p class=" category-description max-w-cmp80 text-black-faded transition duration-200 ease-in-out transform" data-i18n-key=${item.id > 5
            ? item.description
              ? item.description
              : item.name
            : `Categories.${item.name}.Categories.BctCategoryDescription`
          }>${item.description ? item.description : item.name}</p>
                       <button value=${item.id} data-settings-details-id=${item.id
          }
                          class="cookie-details max-w-max flex items-center text-blue-cmpDefaultfont-medium leading" data-category-id=${item.id
          }>
                          <span data-i18n-key="BannerGlobals.ShowCookiesBtn">Show Cookies</span> <img src=${CMP_BANNER_CHEVRON_DOWN}
                             class="toggle-accordion  transition duration-300 ease-in-out transform" alt="show cookies chevron" />
                       </button>
                    </div>
                    <div class="accordion-content h-0 hidden transition-all duration-500 ease-in-out " id="CATEGORY_CONTENT_${item.id
          }">
                       <p>No cookies to show</p>
                    </div>
     </li>`;
      })
      .join("");
    switchBannerTabs();
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
  }, 0);
};

/**
 * allow all the cookies
 */
const acceptAllCookiesWithRadioToggle = function () {
  setTimeout(() => {
    const allowAllCookiesButton = document.querySelector(".allow-all-button");
    const confirmMyChoicesButton = document.querySelector(
      ".confirm-my-choices-btn"
    );
    const radioButtons = document.querySelectorAll(".category-radio-button");
    const cookieRadioButton = document.querySelectorAll(".cc-btn");
    allowAllCookiesButton.addEventListener("click", () => {
      for (let i = 0; i < radioButtons.length; i++) {
        const element = radioButtons[i];
        element.checked = true;
        saveAllCookies();
      }
      fillJSONWithAllCategories();
    });
    confirmMyChoicesButton.addEventListener("click", () => {
      fillJSONWithCheckedCategory();
    });
  }, 200);
};

/**
 * save all the cookies WITHOUT checking all the radio buttons and repopulate the main JSON
 */
const allowAllCookiesAtOnce = () => {
  saveAllCookies();
  fillJSONWithAllCategories();
};

/**
 * stops the event from propagating and causing side efects
 * @param {*} event the target clicked
 */
const stopParentClick = function (event) {
  event.stopPropagation();
};

const getEnvLocal = () => {
  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    return true;
  } else {
    return false;
  }
};
const setEnvLocal = (data) => {
  return (CMP_IS_LOCALHOST = data);
};

export {
  bannerAccordionToggle,
  showModal,
  filterCookiesByCategory,
  settingsAccordionToggle,
  fillCategories,
  fillCookiesSettingItem,
  acceptAllCookiesWithRadioToggle,
  // acceptNecessaryCookies,
  allowAllCookiesAtOnce,
  stopParentClick,
  languageButtonToggle,
  getEnvLocal,
};
