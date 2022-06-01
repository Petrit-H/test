import {
  // DomainCategories,
  fetchDataFromJSONFile,
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
  cmpCookiePolicyLink,
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
  cmpPrivacyPolicyLink,
} from "../cookies";
fetchDataFromJSONFile().then((json) => json);

export const CMP_API_BASE_URL = "https://cmp.gjirafa.dev";
// export const CMP_IMAGE_BASE_URL = "https://tojnhu4mvp.gjirafa.net/CMP";

export const CLIENT_GEOLOCATION_API_URL = cmpIpAddressURL;
export const CONSENT_CLOSE_ICON = cmpCloseIcon;
export const CONSENT_CLOSE_ICON_WHITE = cmpCloseIconWhite;
export const CONSENT_WIDGET_ICON_CIRCLE = cmpWidgetImageCircle;
export const CONSENT_WIDGET_ICON_TRIANGLE = cmpWidgetImageTriangle;
export const CONSENT_CARET_DOWN_ICON = cmpCaretDownIcon;
export const CONSENT_HEADER_MESSAGE = cmpHeaderMessage;
export const CONSENT_BANNER_TITLE = cmpBannerTitle;
export const CONSENT_MESSAGE = cmpMessage;
export const CONSENT_DISMISS_BUTTON_CONSTENT = cmpDismissButtonContent;
export const CONSENT_ALLOW_BUTTON_CONTENT = cmpAllowButtonContent;
export const CONSENT_ALLOW_ALL_BUTTON_CONTENT = cmpAllowAllButtonContent;
export const CONSENT_DENY_BUTTON_CONTENT = cmpDenyButtonContent;
export const CONSENT_LEARN_MORE_CONTENT = cmpLearnMore;
export const CONSENT_COOKIE_PRIVACY_LINK_CONTENT = cmpCookiePolicyLink;
export const CONSENT_COOKIE_PRIVACY = cmpCookiePolicy;
export const CONSENT_PRIVACY_POLICY_LINK_CONTENT = cmpPrivacyPolicyLink;
export const CONSENT_PRIVACY_POLICY = cmpPrivacyPolicy;
export const CONSENT_COOKIE_PRIVACY_LINK_TARGET = cmpCookiePolicyLinkTarget;
export const CONSENT_COOKIE_SETTINGS = cmpCookieSettings;
export const CONSENT_BANNER_LOGO = cmpPortaCMPLogo;
export const CONSENT_BANNER_CHEVRON_DOWN = cmpChevronDownFilled;
export const CONSENT_BANNER_LANGUAGES_ICON = cmpLanguagesGlobe;
export const CONSENT_BANNER_INFO_ICON = cmpInfoIcon;
export const CONSENT_BANNER_RADIO_TICK = cmpNecessaryTickIcon;

export const COOKIES_STATUSES = ["DENY", "ALLOW", "DISMISS"];
export const STATUS_DENY = "DENY";
export const STATUS_ALLOW = "ALLOW";
export const STATUS_DISMISS = "DISMISS";
// export const COOKIES_CATEGORIES = DomainCategories
export const COOKIES_CATEGORIES = ["NECESSARY", "PREFERENCES", "ANALYTICAL", "MARKETING", "OTHER"];
export let NECESSARY = [];
export let PREFERENCES = [];
export let ANALYTICAL = [];
export let MARKETING = [];
export let OTHER = [];
