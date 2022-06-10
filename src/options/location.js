import axios from "axios";
import { CLIENT_GEOLOCATION_API_URL } from "../constants";
import { changeBannerTypeOnLocation } from "../initFile";
let countryCode = "";

const toError = (obj) => {
  setTimeout(() => {
    let errorMessage = new Error("Error [" + (obj.code || "UNKNOWN") + "]: " + obj.error);
    return errorMessage;
  }, 200);
};

export const fetchClientIp = async () => {
  let url = "";
  let data = "";
  let config = {
    method: "get",
    // url: CLIENT_GEOLOCATION_API_URL,
    headers: {},
  };
  try {
    // const response = await axios(config);
    const response = await fetch(CLIENT_GEOLOCATION_API_URL, config);
    // url = response.data;
    data = await response.json();
    countryCode = url.CountryCode;
    return countryCode;
  } catch (error) {
    console.error(error.message);
  }
};

export default {
  // The default timeout is 5 seconds. This is mainly needed to catch JSONP requests that error.
  // Otherwise there is no easy way to catch JSONP errors. That means that if a JSONP fails, the
  // app will take `timeout` milliseconds to react to a JSONP network error.

  timeout: 0,

  // the order that services will be attempted in
  serviceDefinitions: {
    ipinfo: function (options) {
      fetchClientIp().then((location) => location);
      // fetchClientIp()
      return {
        url: CLIENT_GEOLOCATION_API_URL,
        callback: function (done, response) {
          try {
            var json = JSON.parse(response);
            if (json.CountryCode) {
              return { code: json.CountryCode };
            }
          } catch (error) {
            return toError({
              code: json.CountryCode,
              error: "Invalid response (" + error + ")",
            });
          }
        },
      };
    },
  },
  services: [
    // 'ipinfo' ,
    {
      name: "ipinfo",
      // interpolateUrl: {
      //   // obviously, this is a fake key
      //   api_key:
      //     "vOgI3748dnIytIrsJcxS7qsDf6kbJkE9lN4yEDrXAqXcKUNvjjZPox3ekXqmMMld",
      // },
    },

    function () {
      return { name: "ipinfo" };
    },
  ],
};
