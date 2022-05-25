interface CookieAttributes {
  path?: string
  domain?: string
  expires?: number | Date | string
  sameSite?: 'strict' | 'Strict' | 'lax' | 'Lax' | 'none' | 'None'
  secure?: boolean
  [property: string]: any
}

type TCookie = {
  get: (name: string) => string | undefined;
  set: (name: string, value: string | null, props?: CookieAttributes) => void;
  delete: (name: string) => void;
};




const Cookie: TCookie = {
  get(name) {
    const matches = document.cookie.match(
      new RegExp(
        '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  },

  set(name, value, props) {
    props = props || {};
    let exp = props.expires;
    console.log(exp);
    if (typeof exp == 'number' && exp) {
      const d = new Date();
      d.setTime(d.getTime() + exp * 1000);
      exp = props.expires = d;

    }
    if (exp && exp instanceof Date) {
      props.expires = exp.toUTCString();
    }
    if (typeof value === 'string') {
      value = encodeURIComponent(value);
    }
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
      updatedCookie += '; ' + propName;
      const propValue = props[propName];
      if (propValue !== true) {
        updatedCookie += '=' + propValue;
      }
    }
    console.log(updatedCookie);
    document.cookie = updatedCookie;
  },

  delete(name) {
    this.set(name, null, { expires: -1 });
  }
};

export default Cookie;
