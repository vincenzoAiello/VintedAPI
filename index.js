const fetch = require("node-fetch");

class VintedApi {
	constructor() {
		this.token = "";
		this.privateToken = "";
		this.currentUserId = "";
	}

	/**
	 * @summary Get public token
	 * @returns {Promise<String>} Json response
	 */
	async getToken() {
		let data = await fetch("https://www.vinted.fr/oauth/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
			},
			body: "scope=public&client_id=android&grant_type=password",
		});

		let json = await data.json();
		this.token = json.access_token;
		return json;
	}

	/**
	 * @summary Revoke public token
	 * @returns {Promise<String>} Json response
	 */
	async revokeToken() {
		let data = await fetch(
			"https://www.vinted.fr/oauth/revoke?token=" + this.token,
			{
				method: "POST",
			}
		);

		let json = await data.json();
		return json;
	}

	/**
	 * @summary Set private token
	 * @param {String}	privateToken private token
	 * @returns {Promise<void>}
	 */
	async setPrivateToken(privateToken) {
		this.privateToken = privateToken;
		await this.getCurrenUser();
	}

	/**
	 * @summary Sign In with email and password
	 * @param {String}	name Username
	 * @param {String}	email Email
	 * @param {String}	password Password
	 * @returns {Promise<String>} Json response
	 */
	async signIn(name, email, password) {
		let data = await fetch(
			"https://www.vinted.fr/api/v2/users?adjust_campaign=Organic",
			{
				method: "POST",
				headers: {
					authorization: "Bearer " + this.token,
					"Content-Type": "application/json",
				},
				body:
					'{"user":{"agree_rules":true,"email":' +
					'"' +
					email +
					'"' +
					',"login":' +
					'"' +
					name +
					'"' +
					',"password":' +
					'"' +
					password +
					'"' +
					',"user_setting":{"is_newsletter_subscriber":false}}}',
			}
		);

		let json = await data.json();
		return json;
	}

	/*//LogIn
	async logIn(email, password) {
		let data = await fetch("https://www.vinted.fr/api/v2/captchas", {
			method: "POST",
			headers: {
				authorization: "Bearer " + this.token,
				"Content-Type": "application/json",
			},
			body:
				'{"entity_type":"login","payload":{"password":' +
				'"' +
				password +
				'","username":"' +
				email +
				'"}}',
		});
		let json = await data.json();
		let uuid = json.uuid;
		console.log(json);

		let data2 = await fetch("https://www.vinted.fr/oauth/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
			},
			body: new URLSearchParams({
				password: "Federernadal5",
				scope: "user",
				client_id: "android",
				username: "accountprova",
				grant_type: "password",
				uuid: uuid,
			}),
		});
		let json2 = await data2.json();
		console.log(json2);
		this.token = json2.access_token;
	}*/

	/**
	 * @summary Search users by username
	 * @param {String}	name Username
	 * @returns {Promise<String>} Json response (Users' information)
	 */
	async getUserByName(name) {
		let data = await fetch("https://www.vinted.it/api/v2/users/" + name, {
			method: "GET",
			headers: {
				authorization: "Bearer " + this.token,
			},
		});
		let json = await data.json();
		return json;
	}

	/**
	 * @summary Get user's items on sale by userId
	 * @param {String}	name User ID
	 * @returns {Promise<String>} Json response (User's items on sale)
	 */
	async getUserItems(userId) {
		let data = await fetch(
			"https://www.vinted.fr/api/v2/users/" +
				userId +
				"/items?order=relevance&page=1&per_page=20",
			{
				method: "GET",
				headers: {
					authorization: "Bearer " + this.token,
				},
			}
		);
		let json = await data.json();
		return json;
	}

	/**
	 * @summary Get user's feedbacks by userId
	 * @param {String}	name User ID
	 * @returns {Promise<String>} Json response (User's feedbacks)
	 */
	async getUserFeedbacks(userId) {
		let data = await fetch(
			"https://www.vinted.fr/api/v2/feedbacks?page=1&per_page=10&user_id=" +
				userId +
				"&time=0",
			{
				method: "GET",
				headers: {
					authorization: "Bearer " + this.token,
				},
			}
		);
		let json = await data.json();
		return json;
	}

	/**
	 * @summary Get info of the account associated to the private Token
	 * @returns {Promise<String>} Json response (Current user's info)
	 */
	async getCurrenUser() {
		let data = await fetch("https://www.vinted.it/api/v2/users/current", {
			method: "GET",
			headers: {
				authorization: "Bearer " + this.privateToken,
			},
		});
		let json = await data.json();
		this.currentUserId = json.user.id;
		return json;
	}

	/**
	 * @summary Get Current user's favourite items
	 * @returns {Promise<String>} Json response (Current user's favourite items)
	 */
	async getCurrentUserFav() {
		let data = await fetch(
			"https://www.vinted.fr/api/v2/users/" +
				this.currentUserId +
				"/items/favourites?page=1&per_page=20",
			{
				method: "GET",
				headers: {
					authorization: "Bearer " + this.privateToken,
				},
			}
		);
		let json = await data.json();
		return json;
	}

	/**
	 * @summary Get Current user's wallet info
	 * @returns {Promise<String>} Json response (Current user's wallet info)
	 */
	async getCurrentUserWallet() {
		let data = await fetch(
			"https://www.vinted.fr/api/v2/wallet/invoices/current",
			{
				method: "GET",
				headers: {
					authorization: "Bearer " + this.privateToken,
				},
			}
		);
		let json = await data.json();
		return json;
	}

	/**
	 * @summary Get Current user's order
	 * @returns {Promise<String>} Json response (Current user's order)
	 */
	async getCurrentUserOrders() {
		let data = await fetch(
			"https://www.vinted.fr/api/v2/transaction_messages?folder=message&page=1&per_page=20",
			{
				method: "GET",
				headers: {
					authorization: "Bearer " + this.privateToken,
				},
			}
		);
		let json = await data.json();
		return json;
	}
}

exports.VintedApi = VintedApi;
