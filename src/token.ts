import Cookie from './utils/cookie';
import { refreshTokenRequest } from './api';

export type TTokensList = {
  accessToken?: string;
  refreshToken?: string;
};

type TToken = {
  get: (value:string) => void;
  set: (value:string) => void;
  delete: () => void;
  getRefresh: () => string;
  getAccess: () => string;
  getHeaderToken: () => string;
  deleteTokens: () => void;
  refresh: () => Promise<void>;
  checkErrorOnMalformed: (err:Error) => boolean;
  checkErrorOnExpired: (err:Error) => boolean;
  updateTokens: (tokens:TTokensList) => void;
};

const Token:TToken = {
  get() {
    return Cookie.get('token') || '';
  },

  set(value) {
    Cookie.set('token', value);
  },

  delete() {
    Cookie.delete('token');
  },

  getRefresh() {
    return localStorage.getItem('refreshToken') || '';
  },

  getAccess():string {
    return Cookie.get('accessToken') || '';
  },

  getHeaderToken() {
    const accessToken = Token.getAccess();
    return accessToken ? 'Bearer ' + accessToken : '';
  },

  updateTokens(tokens:TTokensList) {
    let authToken = '';
    if (tokens.accessToken) {
      authToken = tokens.accessToken.split('Bearer ')[1];
    }

    if (authToken) {
      Cookie.delete('accessToken');
      Cookie.set('accessToken', authToken);
      if (tokens.refreshToken) {
        localStorage.removeItem('refreshToken');
        localStorage.setItem('refreshToken', tokens.refreshToken);
      }
    }
  },

  deleteTokens() {
    Cookie.delete('accessToken');
    localStorage.removeItem('refreshToken');
  },

  refresh: async ():Promise<void> => {
    const tokenData = await refreshTokenRequest(Token.getRefresh());
    Token.updateTokens(tokenData);
  },

  checkErrorOnMalformed(err) {
    return err.message === 'jwt malformed';
  },

  checkErrorOnExpired(err) {
    return err.message === 'jwt expired';
  }
};

export default Token;
