import { setCookie } from "./utils/cookie";
import { fetchClientIp } from "./options/location";
import jsonData from "./data5.json";
import { initiateTypeChangeAndBannerShow } from "./initFile";
import { saveAllCookies, saveSpecificCookies } from "./getDomainsWithCookies";
import { CMP_IS_LOCALHOST } from "./constants";
import { getEnvLocal } from "./utils/logic";

let locationData = "";

export let categories = [];
export let responseData = [];
export let cookiesPerCategory = [];
export let filteredCookiesPerDomain = [];
export let cmpIpAddressURL = {};
export let cmpDomainId = "";
export let cmpEncryptedDomainId = "";
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
export let cmpCookiePolicyURL = "";
export let cmpPrivacyPolicy = "";
export let cmpPrivacyPolicyURL = "";
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
export let cmpComplianceType = "";

const {
  ipAddressURL,
  domainId,
  encryptedId,
  domainName,
  domainWebsiteUrl,
  language,
  languagesList,
  domainCategoriesWithCookies,
  domainCategories,
  domainCookies,
  complianceType,
} = jsonData;

const {
  widgetImageCircle,
  widgetImageTriangle,
  consentModalMessage,
  consentBannerTitle,
  consentMessage,
  dismissButtonContent,
  allowButtonContent,
  allowAllButtonContent,
  denyButtonContent,
  cookiePolicyLinkTarget,
  cookieSettings,
  learnMore,
  cookiePolicyUrl,
  cookiePolicy,
  privacyPolicyUrl,
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
    cmpEncryptedDomainId = encryptedId;
    cmpDomainName = domainName;
    cmpDomainWebsiteUrl = domainWebsiteUrl;
    cmpLanguage = language;
    cmpLanguagesList = languagesList;
    cmpDomainCategoriesWithCookies = domainCategoriesWithCookies;
    cmpDomainCategories = domainCategories;
    cmpCookiesPerDomain = domainCookies;
    cmpWidgetImageCircle = widgetImageCircle;
    cmpWidgetImageTriangle = widgetImageTriangle;
    cmpHeaderMessage = consentModalMessage;
    cmpBannerTitle = consentBannerTitle;
    cmpMessage = consentMessage;
    cmpDismissButtonContent = dismissButtonContent;
    cmpAllowButtonContent = allowButtonContent;
    cmpAllowAllButtonContent = allowAllButtonContent;
    cmpDenyButtonContent = denyButtonContent;
    cmpLearnMore = learnMore;
    cmpCookieSettings = cookieSettings;
    cmpCookiePolicyURL = cookiePolicyUrl;
    cmpCookiePolicy = cookiePolicy;
    cmpPrivacyPolicyURL = privacyPolicyUrl;
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
    cmpComplianceType = complianceType;

    return {
      cmpDomainId,
      cmpDomainName,
      cmpEncryptedDomainId,
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
      cmpCookiePolicyURL,
      cmpCookiePolicy,
      cmpPrivacyPolicyURL,
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
      cmpComplianceType,
    };
  } catch (error) {
    console.log(error);
  }
  return {
    cmpDomainId,
    cmpDomainName,
    cmpEncryptedDomainId,
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
    cmpCookiePolicyURL,
    cmpCookiePolicy,
    cmpPrivacyPolicyURL,
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
    cmpComplianceType,
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

  initiateTypeChangeAndBannerShow();
  setTimeout(() => {
    fetchClientIp().then((location) => {
      locationData = location;
      return location;
    });
  }, 100);
});
