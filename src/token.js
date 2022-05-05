import Cookie from './utils/cookie';
import { refreshTokenRequest } from './api';

const Token = {
	get() {
		return Cookie.get('token');
	},

	set(value) {
		Cookie.set('token', value);
	},

	delete() {
		Cookie.delete('token');
	},

	getRefresh() {
		return localStorage.getItem('refreshToken');
	},

	getAccess() {
		return Cookie.get('accessToken');
	},

	getHeaderToken() {
		const accessToken = this.getAccess();
		return accessToken ? 'Bearer ' + accessToken : '';
	},

	updateTokens(tokenData) {
		let authToken = '';
		if (tokenData.accessToken) {
			authToken = tokenData.accessToken.split('Bearer ')[1];
		}

		if (authToken) {
			Cookie.delete('accessToken');
			Cookie.set('accessToken', authToken);
			if (tokenData.refreshToken) {
				localStorage.removeItem('refreshToken');
				localStorage.setItem('refreshToken', tokenData.refreshToken);
			}
		}
	},

	deleteTokens() {
		Cookie.delete('accessToken');
		localStorage.removeItem('refreshToken');
	},

	refresh: async function () {
		const tokenData = await refreshTokenRequest(this.getRefresh());
		console.log(tokenData);
		this.updateTokens(tokenData);
	},

	checkErrorOnMalformed(err) {
		return err.message === 'jwt malformed';
	},

	checkErrorOnExpired(err) {
		return err.message === 'jwt expired';
	},
};

export default Token;
