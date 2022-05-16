import {
  // DomainCategories,
  fetchDataFromJSONFile,
  WidgetImageCircle,
  WidgetImageTriangle,
  IpAddressURL,
  ConsentHeaderMessage,
  ConsentBannerTitle,
  ConsentMessage,
  DismissButtonContent,
  AllowButtonContent,
  AllowAllButtonContent,
  DenyButtonContent,
  LearnMore,
  CookiePolicyLink,
  CookiePolicyLinkTarget,
  CloseIconWhite,
  CloseIcon,
  CaretDownIcon,
  CookieSettings,
} from "../cookies";
fetchDataFromJSONFile().then((json) => json);

export const CMP_API_BASE_URL = "https://cmp.gjirafa.dev";
// export const CMP_IMAGE_BASE_URL = "https://tojnhu4mvp.gjirafa.net/CMP";

export const CLIENT_GEOLOCATION_API_URL = IpAddressURL;
export const CONSENT_CLOSE_ICON = CloseIcon;
export const CONSENT_CLOSE_ICON_WHITE = CloseIconWhite;
export const CONSENT_WIDGET_ICON_CIRCLE = WidgetImageCircle;
export const CONSENT_WIDGET_ICON_TRIANGLE = WidgetImageTriangle;
export const CONSENT_CARET_DOWN_ICON = CaretDownIcon;
export const CONSENT_HEADER_MESSAGE = ConsentHeaderMessage;
export const CONSENT_BANNER_TITLE = ConsentBannerTitle;
export const CONSENT_MESSAGE = ConsentMessage;
export const CONSENT_DISMISS_BUTTON_CONSTENT = DismissButtonContent;
export const CONSENT_ALLOW_BUTTON_CONTENT = AllowButtonContent;
export const CONSENT_ALLOW_ALL_BUTTON_CONTENT = AllowAllButtonContent;
export const CONSENT_DENY_BUTTON_CONTENT = DenyButtonContent;
export const CONSENT_LEARN_MORE_CONTENT = LearnMore;
export const CONSENT_COOKIE_PRIVACY_LINK_CONTENT = CookiePolicyLink;
export const CONSENT_COOKIE_PRIVACY_LINK_TARGET = CookiePolicyLinkTarget;
export const CONSENT_COOKIE_SETTINGS = CookieSettings;

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
