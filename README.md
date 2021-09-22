# @vincenzoaiello/vintedapi

## _A Node.js wrapper for the Vinted's API_

Reverse engineering of Vinted's API for Andorid. The content of this repository is born for a peronal research, there isn't any collaboration with Vinted.

## Features

- Sign In
- Search users by username
- Get user's items on sale by userId
- Get user's feedbacks by userId

## Installation

```sh
npm i @vincenzoaiello/vintedapi
```

## Example of use

```javascript
const VintedApi = require("@vincenzoaiello/vintedapi");

(async () => {
	//initialize
	let vinted = new VintedApi.VintedApi();

	//get token for the next requests
	await vinted.getToken();

	//sign in
	await vinted.signIn("username", "email@gmail.com", "password");

	//Search users by username
	let user = await vinted.getUserByName("username");

	//Get user's items on sale by userId
	console.log(await vinted.getUserItems(user.user.id));

	//Get user's feedbacks by userId
	console.log(await vinted.getUserFeedbacks(user.user.id));

	//revoke token
	await vinted.revokeToken();
})();
```

## Future implementations

I'm working on login, read notification, read meassages, sell items and other features but at the moment i have problem with the login authentication. If you can help me, contact me via email: <vincenzoaiello300@gmail.com>
