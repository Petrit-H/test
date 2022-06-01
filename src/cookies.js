import { setCookie } from "./utils/cookie";
import { fetchClientIp } from "./options/location";
import jsonData from "./data.json";

// console.log(createUUID());
let locationData = "";

export let categories = [];
export let responseData = [];
export let cookiesPerCategory = [];
export let filteredCookiesPerDomain = [];
export let cmpIpAddressURL = {};
export let cmpDomainId = "";
export let cmpDomainName = "";
export let cmpDomainWebsiteUrl = "";
export let cmpLanguage = {};
export let cmpLanguagesList = [];
export let cmpLomainCategoriesWithCookies = [];
export let cmpDomainCategories = [];
export let cmpCookiesPerDomain = [];
export let cmpDomainCategoriesWithCookies = [];

export let cmpWidgetImageCircle = "";
export let cmpWidgetImageTriangle = "";
export let cmpHeaderMessage = "";
export let cmpBannerTitle = "";
export let cmpMessage = "";
export let cmpDismissButtonContent = "";
export let cmpAllowButtonContent = "";
export let cmpAllowAllButtonContent = "";
export let cmpDenyButtonContent = "";
export let cmpLearnMore = "";
export let cmpCookiePolicy = "";
export let cmpCookiePolicyLink = "";
export let cmpPrivacyPolicy = "";
export let cmpPrivacyPolicyLink = "";
export let cmpCookieSettings = "";
export let cmpCookiePolicyLinkTarget = "";
export let cmpCloseIconWhite = "";
export let cmpCloseIcon = "";
export let cmpCaretDownIcon = "";
export let cmpChevronDownFilled = "";
export let cmpPortaCMPLogo = "";
export let cmpLanguagesGlobe = "";
export let cmpInfoIcon = "";
export let cmpNecessaryTickIcon = "";

const { ipAddressURL, domainId, domainName, domainWebsiteUrl, language, languagesList, domainCategoriesWithCookies, domainCategories, domainCookies } = jsonData;

const {
  widgetImageCircle,
  widgetImageTriangle,
  consentHeaderMessage,
  consentBannerTitle,
  consentMessage,
  dismissButtonContent,
  allowButtonContent,
  allowAllButtonContent,
  denyButtonContent,
  cookiePolicyLinkTarget,
  cookieSettings,
  learnMore,
  cookiePolicyLink,
  cookiePolicy,
  privacyPolicyLink,
  privacyPolicy,
  closeIcon,
  caretDownIcon,
  closeIconWhite,
  chevronDownFilled,
  portaCMPLogo,
  languagesGlobe,
  infoIcon,
  necessaryTick,
} = jsonData.consentData;

/**
 * fetch all the data from the local file and export them
 * @returns the data from the local JSON
 */
export const fetchDataFromJSONFile = async () => {
  try {
    cmpDomainId = domainId;
    cmpIpAddressURL = ipAddressURL;
    cmpDomainName = domainName;
    cmpDomainWebsiteUrl = domainWebsiteUrl;
    cmpLanguage = language;
    cmpLanguagesList = languagesList;
    cmpDomainCategoriesWithCookies = domainCategoriesWithCookies;
    cmpDomainCategories = domainCategories;
    cmpCookiesPerDomain = domainCookies;
    cmpWidgetImageCircle = widgetImageCircle;
    cmpWidgetImageTriangle = widgetImageTriangle;
    cmpHeaderMessage = consentHeaderMessage;
    cmpBannerTitle = consentBannerTitle;
    cmpMessage = consentMessage;
    cmpDismissButtonContent = dismissButtonContent;
    cmpAllowButtonContent = allowButtonContent;
    cmpAllowAllButtonContent = allowAllButtonContent;
    cmpDenyButtonContent = denyButtonContent;
    cmpLearnMore = learnMore;
    cmpCookieSettings = cookieSettings;
    cmpCookiePolicyLink = cookiePolicyLink;
    cmpCookiePolicy = cookiePolicy;
    cmpPrivacyPolicyLink = privacyPolicyLink;
    cmpPrivacyPolicy = privacyPolicy;
    cmpCookiePolicyLinkTarget = cookiePolicyLinkTarget;
    cmpCloseIconWhite = closeIconWhite;
    cmpCloseIcon = closeIcon;
    cmpCaretDownIcon = caretDownIcon;
    cmpChevronDownFilled = chevronDownFilled;
    cmpPortaCMPLogo = portaCMPLogo;
    cmpLanguagesGlobe = languagesGlobe;
    cmpInfoIcon = infoIcon;
    cmpNecessaryTickIcon = necessaryTick;

    return {
      cmpDomainId,
      cmpDomainName,
      cmpDomainWebsiteUrl,
      cmpLanguage,
      cmpLanguagesList,
      cmpDomainCategoriesWithCookies,
      cmpDomainCategories,
      cmpCookiesPerDomain,
      cmpWidgetImageCircle,
      cmpWidgetImageTriangle,
      cmpHeaderMessage,
      cmpBannerTitle,
      cmpMessage,
      cmpDismissButtonContent,
      cmpAllowButtonContent,
      cmpDenyButtonContent,
      cmpAllowAllButtonContent,
      cmpLearnMore,
      cmpCookiePolicyLink,
      cmpCookiePolicy,
      cmpPrivacyPolicyLink,
      cmpPrivacyPolicy,
      cmpCookiePolicyLinkTarget,
      cmpCloseIconWhite,
      cmpCloseIcon,
      cmpCaretDownIcon,
      cmpCookieSettings,
      cmpChevronDownFilled,
      cmpPortaCMPLogo,
      cmpLanguagesGlobe,
      cmpInfoIcon,
      cmpNecessaryTickIcon,
    };
  } catch (error) {
    console.log(error);
  }
  return {
    cmpDomainId,
    cmpDomainName,
    cmpDomainWebsiteUrl,
    cmpLanguage,
    cmpLanguagesList,
    cmpDomainCategoriesWithCookies,
    cmpDomainCategories,
    cmpCookiesPerDomain,
    cmpWidgetImageCircle,
    cmpWidgetImageTriangle,
    cmpHeaderMessage,
    cmpBannerTitle,
    cmpMessage,
    cmpDismissButtonContent,
    cmpAllowButtonContent,
    cmpDenyButtonContent,
    cmpAllowAllButtonContent,
    cmpLearnMore,
    cmpCookiePolicyLinkTarget,
    cmpCookiePolicyLink,
    cmpCookiePolicy,
    cmpPrivacyPolicyLink,
    cmpPrivacyPolicy,
    cmpCloseIconWhite,
    cmpCloseIcon,
    cmpCaretDownIcon,
    cmpCookieSettings,
    cmpChevronDownFilled,
    cmpPortaCMPLogo,
    cmpLanguagesGlobe,
    cmpInfoIcon,
    cmpNecessaryTickIcon,
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
