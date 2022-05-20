import { setCookie } from "./utils/cookie";
import { fetchClientIp } from "./options/location";
import jsonData from "./data.json";

// console.log(createUUID());
let locationData = "";

export let categories = [];
export let responseData = [];
export let cookiesPerCategory = [];
export let filteredCookiesPerDomain = [];
export let IpAddressURL = {};
export let DomainId = "";
export let DomainName = "";
export let DomainWebsiteUrl = "";
export let Language = {};
export let LanguagesList = [];
export let LomainCategoriesWithCookies = [];
export let DomainCategories = [];
export let CookiesPerDomain = [];
export let DomainCategoriesWithCookies = [];

export let WidgetImageCircle = "";
export let WidgetImageTriangle = "";
export let ConsentHeaderMessage = "";
export let ConsentBannerTitle = "";
export let ConsentMessage = "";
export let DismissButtonContent = "";
export let AllowButtonContent = "";
export let AllowAllButtonContent = "";
export let DenyButtonContent = "";
export let LearnMore = "";
export let CookiePolicyLink = "";
export let CookieSettings = "";
export let CookiePolicyLinkTarget = "";
export let CloseIconWhite = "";
export let CloseIcon = "";
export let CaretDownIcon = "";
export let ChevronDownFilled = "";
export let PortaCMPLogo = "";
export let LanguagesGlobe = "";
export let InfoIcon = "";
export let NecessaryTickIcon = "";

const {
  ipAddressURL,
  domainId,
  domainName,
  domainWebsiteUrl,
  language,
  languagesList,
  domainCategoriesWithCookies,
  domainCategories,
  cookiesPerDomain,
} = jsonData;

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
    DomainId = domainId;
    IpAddressURL = ipAddressURL;
    DomainName = domainName;
    DomainWebsiteUrl = domainWebsiteUrl;
    Language = language;
    LanguagesList = languagesList;
    DomainCategoriesWithCookies = domainCategoriesWithCookies;
    DomainCategories = domainCategories;
    CookiesPerDomain = cookiesPerDomain;
    WidgetImageCircle = widgetImageCircle;
    WidgetImageTriangle = widgetImageTriangle;
    ConsentHeaderMessage = consentHeaderMessage;
    ConsentBannerTitle = consentBannerTitle;
    ConsentMessage = consentMessage;
    DismissButtonContent = dismissButtonContent;
    AllowButtonContent = allowButtonContent;
    AllowAllButtonContent = allowAllButtonContent;
    DenyButtonContent = denyButtonContent;
    LearnMore = learnMore;
    CookiePolicyLink = cookiePolicyLink;
    CookieSettings = cookieSettings;
    CookiePolicyLinkTarget = cookiePolicyLinkTarget;
    CloseIconWhite = closeIconWhite;
    CloseIcon = closeIcon;
    CaretDownIcon = caretDownIcon;
    ChevronDownFilled = chevronDownFilled;
    PortaCMPLogo = portaCMPLogo;
    LanguagesGlobe = languagesGlobe;
    InfoIcon = infoIcon;
    NecessaryTickIcon = necessaryTick;

    return {
      DomainId,
      DomainName,
      DomainWebsiteUrl,
      Language,
      LanguagesList,
      DomainCategoriesWithCookies,
      DomainCategories,
      CookiesPerDomain,
      WidgetImageCircle,
      WidgetImageTriangle,
      ConsentHeaderMessage,
      ConsentBannerTitle,
      ConsentMessage,
      DismissButtonContent,
      AllowButtonContent,
      DenyButtonContent,
      AllowAllButtonContent,
      LearnMore,
      CookiePolicyLink,
      CookiePolicyLinkTarget,
      CloseIconWhite,
      CloseIcon,
      CaretDownIcon,
      CookieSettings,
      ChevronDownFilled,
      PortaCMPLogo,
      LanguagesGlobe,
      InfoIcon,
      NecessaryTickIcon,
    };
  } catch (error) {
    console.log(error);
  }
  return {
    DomainId,
    DomainName,
    DomainWebsiteUrl,
    Language,
    LanguagesList,
    DomainCategoriesWithCookies,
    DomainCategories,
    CookiesPerDomain,
    WidgetImageCircle,
    WidgetImageTriangle,
    ConsentHeaderMessage,
    ConsentBannerTitle,
    ConsentMessage,
    DismissButtonContent,
    AllowButtonContent,
    DenyButtonContent,
    AllowAllButtonContent,
    LearnMore,
    CookiePolicyLinkTarget,
    CloseIconWhite,
    CloseIcon,
    CaretDownIcon,
    CookieSettings,
    ChevronDownFilled,
    PortaCMPLogo,
    LanguagesGlobe,
    InfoIcon,
    NecessaryTickIcon,
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
