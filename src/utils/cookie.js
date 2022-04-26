

export const getCookie = name => {
  const value = ' ' + document.cookie
  const parts = value.split(' ' + name + '=')
  return parts.length < 2
    ? undefined
    : parts
        .pop()
        .split(';')
        .shift()
}

export const setCookie = function ( name, value, expiryDays, domain, path, secure ) {
  const exdate = new Date()
  exdate.setHours(exdate.getHours() + ((typeof expiryDays !== "number"  ? 365 : expiryDays ) * 24))
  document.cookie = name + '=' +
                    value +
                    // ';max-age=' + expiryDays +
                    // ';expires=' + expiryDays +
                    ';expires=' + exdate.toUTCString() +
                    ( domain ? ';domain=' + domain : '' ) +
                    ';path=' + (path || '/') +
                    ( secure ? ';secure' : '' )


}