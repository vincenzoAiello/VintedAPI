const fetch = require("node-fetch");

class VintedApi {
	constructor() {
		this.token = "";
	}

	/**
	 * @summary Get token for the authorization
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
	 * @summary Revoke token
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

	//LogIn
	/*async logIn(email, password) {
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

		let data2 = await fetch("https://www.vinted.fr/oauth/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
			},
			body: new URLSearchParams({
				password: "Federernadal5",
				scope: "user",
				client_id: "android",
				username: "accountprova@gmail.com",
				grant_type: "password",
				uuid: "9f8ed5c4-ac5d-411b-8c77-0ef2012bbb85",
			}),
		});
		let json2 = await data2.json();
		console.log(json2);
		this.token = json2.access_token;
	}*/

	/*//return LogIn account's information
	async getCurrenUser() {
		let data = await fetch("https://www.vinted.it/api/v2/users/current", {
			method: "GET",
			headers: {
				authorization: "Bearer " + this.token,
			},
		});
		let json = await data.json();
		return json;
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
}

exports.VintedApi = VintedApi;
