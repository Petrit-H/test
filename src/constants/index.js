import axios from "axios";
import {
  // DomainCategories,
  exportGlobalJSON,
  cmpWidgetImageCircle,
  cmpWidgetImageTriangle,
  cmpIpAddressURL,
  cmpHeaderMessage,
  cmpBannerTitle,
  cmpMessage,
  cmpDismissButtonContent,
  cmpAllowButtonContent,
  cmpAllowAllButtonContent,
  cmpDenyButtonContent,
  cmpLearnMore,
  cmpCookiePolicyURL,
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
  cmpCookiePolicy,
  cmpPrivacyPolicy,
  cmpPrivacyPolicyURL,
  cmpComplianceType,
  cmpDomainWebsiteUrl,
  cmpDomainGUID,
} from "../cookies";
exportGlobalJSON().then((json) => json);

export const CMP_API_BASE_URL = "https://cmp.gjirafa.dev";
// export const CONSENT_IMAGE_BASE_URL = "https://tojnhu4mvp.gjirafa.net/CMP";
let consentStyleData = [];

let config = {
  method: "get",
  url: `https://lt3sm91cte.gjirafa.net/GetCSS?guidId=${cmpDomainGUID}`,
};
axios(config)
  .then(function (response) {
    for (const item of response.data) {
      if (item.ActiveTheme === true) {
        // consentStyle = response.data;
        consentStyleData = [...consentStyleData, item];
        Position = item?.BannerPosition?.Position;
        console.log(consentStyleData);
        // return consentStyle;}
      }
    }
  })
  .catch((err) => console.log(err.message));

export let CMP_IS_LOCALHOST = false;

export const CLIENT_GEOLOCATION_API_URL = cmpIpAddressURL;
export const CMP_COMPLIANCE_TYPE = cmpComplianceType;
export const CMP_CLOSE_ICON = cmpCloseIcon;
export const CMP_CLOSE_ICON_WHITE = cmpCloseIconWhite;
export const CMP_WIDGET_ICON_CIRCLE = cmpWidgetImageCircle;
export const CMP_WIDGET_ICON_TRIANGLE = cmpWidgetImageTriangle;
export const CMP_CARET_DOWN_ICON = cmpCaretDownIcon;
export const CMP_HEADER_MESSAGE = cmpHeaderMessage;
export const CMP_BANNER_TITLE = cmpBannerTitle;
export const CMP_MESSAGE = cmpMessage;
export const CMP_DOMAIN_URL = cmpDomainWebsiteUrl;
export const CMP_DISMISS_BUTTON_CONSTENT = cmpDismissButtonContent;
export const CMP_ALLOW_BUTTON_CONTENT = cmpAllowButtonContent;
export const CMP_ALLOW_ALL_BUTTON_CONTENT = cmpAllowAllButtonContent;
export const CMP_DENY_BUTTON_CONTENT = cmpDenyButtonContent;
export const CMP_LEARN_MORE_CONTENT = cmpLearnMore;
export const CMP_COOKIE_POLICY_URL = cmpCookiePolicyURL;
export const CMP_COOKIE_POLICY = cmpCookiePolicy;
// export const CMP_PRIVACY_POLICY_URL = consentStyleData?.BrandLogoURL;
export const CMP_PRIVACY_POLICY_URL = cmpPrivacyPolicyURL;
export const CMP_PRIVACY_POLICY = cmpPrivacyPolicy;
export const CMP_COOKIE_POLICY_LINK_TARGET = cmpCookiePolicyLinkTarget;
export const CMP_COOKIE_SETTINGS = cmpCookieSettings;
export const CMP_BANNER_LOGO = cmpPortaCMPLogo;
export const CMP_BANNER_CHEVRON_DOWN = cmpChevronDownFilled;
export const CMP_BANNER_LANGUAGES_ICON = cmpLanguagesGlobe;
export const CMP_BANNER_INFO_ICON = cmpInfoIcon;
export const CMP_BANNER_RADIO_TICK = cmpNecessaryTickIcon;

export const CMP_SHOW_DNSMD = consentStyleData?.ShowDNSMD;
export const CMP_SHOW_CLOSE_BUTTON = consentStyleData?.ShowCloseButton;
export const CMP_SHOW_LANGUAGES = consentStyleData?.ShowLanguagesIcon;
// export const
// export const

// export const

export const COOKIES_STATUSES = ["DENY", "ALLOW", "DISMISS"];
export const STATUS_DENY = "DENY";
export const STATUS_ALLOW = "ALLOW";
export const STATUS_DISMISS = "DISMISS";
// export const COOKIES_CATEGORIES = DomainCategories
export const COOKIES_CATEGORIES = [
  "NECESSARY",
  "PREFERENCES",
  "ANALYTICAL",
  "MARKETING",
  "OTHER",
];
export let NECESSARY = [];
export let PREFERENCES = [];
export let ANALYTICAL = [];
export let MARKETING = [];
export let OTHER = [];

// console.log("CONSTANTS",consentStyleData)
