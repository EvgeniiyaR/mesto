export default class Api {
	constructor(config) {
		this._url = config.url; 
		this._headers = config.headers;
	}

	getUserInfo() {
		return fetch(`${this._url}/users/me`, {
			method: "GET",
			headers: this._headers
		}).then((res) => {
			if (res.ok) {
				return res.json();
				}
			return Promise.reject(`Ошибка: ${res.status}`);
		});
	}

	editUserInfo(name, about) {
		return fetch(`${this._url}/users/me`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({ name, about })
		}).then((res) => {
			if (res.ok) {
				return res.json();
				}
			return Promise.reject(`Ошибка: ${res.status}`);
		});
	}

	editUserAvatar(avatar) {
		return fetch(`${this._url}/users/me/avatar`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({ avatar })
		}).then((res) => {
			if (res.ok) {
				return res.json();
				}
			return Promise.reject(`Ошибка: ${res.status}`);
		});
	}

	getInitialCards() {
		return fetch(`${this._url}/cards`, {
			method: "GET",
			headers: this._headers
		}).then((res) => {
			if (res.ok) {
				return res.json();
				}
			return Promise.reject(`Ошибка: ${res.status}`);
		});
	}

	addNewCard(name, link) {
		return fetch(`${this._url}/cards`, {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify({ name, link })
		}).then((res) => {
			if (res.ok) {
				return res.json();
				}
			return Promise.reject(`Ошибка: ${res.status}`);
		});
	}

	deleteCard(id) {
		return fetch(`${this._url}/cards/${id}`, {
			method: "DELETE",
			headers: this._headers
		}).then((res) => {
			if (res.ok) {
				return res.json();
				}
			return Promise.reject(`Ошибка: ${res.status}`);
		});
	}

}