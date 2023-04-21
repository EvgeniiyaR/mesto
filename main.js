(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(e,n){for(var r=0;r<n.length;r++){var o=n[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(void 0,i=function(e,n){if("object"!==t(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,"string");if("object"!==t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o.key),"symbol"===t(i)?i:String(i)),o)}var i}var n=function(){function t(e,n,r){var o=r.handleCardClick,i=r.handleDeleteCardClick,u=r.handleLikeClick;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._title=e.name,this._imageUrl=e.link,this._id=e._id,this.owner=e.owner,this.likesList=e.likes,this.likesCount=e.likes.length,this._templateSelector=n,this._handleCardClick=o,this._handleLikeClick=u,this._handleDeleteCardClick=i,this.islike=!1,this.isBasket=!1}var n,r;return n=t,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._templateSelector).content.querySelector(".elements__element").cloneNode(!0)}},{key:"generateCard",value:function(){return this._element=this._getTemplate(),this._elementImage=this._element.querySelector(".elements__image"),this._elementBasket=this._element.querySelector(".elements__basket-button"),this._elementLike=this._element.querySelector(".elements__like-button"),this._elementLikesCount=this._element.querySelector(".elements__like-count"),this._element.querySelector(".elements__title").textContent=this._title,this._elementImage.src=this._imageUrl,this._elementImage.alt=this._title,this._elementLikesCount.textContent=this.likesCount,this.isLike&&this._elementLike.classList.add("elements__like-button_active"),this.isBasket||this._elementBasket.classList.add("elements__basket-button_hidden"),this._setEventListeners(),this._element}},{key:"_setEventListeners",value:function(){var t=this;this._elementLike.addEventListener("click",(function(e){t._elementLike.classList.contains("elements__like-button_active")?(t._deleteLike(e),t.likesCount-=1):(t._addLike(e),t.likesCount+=1),t._elementLikesCount.textContent=t.likesCount,t._handleLikeClick(t._id)})),this._elementBasket.addEventListener("click",(function(e){t._handleDeleteCardClick(t._id,t.owner),t._getCard(e)})),this._elementImage.addEventListener("click",(function(){return t._handleCardClick(t._title,t._imageUrl)}))}},{key:"_addLike",value:function(t){t.target.classList.add("elements__like-button_active")}},{key:"_deleteLike",value:function(t){t.target.classList.remove("elements__like-button_active")}},{key:"_getCard",value:function(t){this.getCard=t.target.closest(".elements__element")}},{key:"deleteCard",value:function(){this.getCard.remove()}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}function o(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,(void 0,i=function(t,e){if("object"!==r(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,"string");if("object"!==r(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(o.key),"symbol"===r(i)?i:String(i)),o)}var i}var i=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.inputSelector=e.inputSelector,this.submitButtonSelector=e.submitButtonSelector,this.inactiveButtonClass=e.inactiveButtonClass,this.inputErrorClass=e.inputErrorClass,this.errorClass=e.errorClass,this.formElement=n}var e,n;return e=t,(n=[{key:"enableValidation",value:function(){this._setEventListeners()}},{key:"_setEventListeners",value:function(){var t=this;this.inputListArray=Array.from(this.formElement.querySelectorAll(this.inputSelector)),this._buttonElement=this.formElement.querySelector(this.submitButtonSelector),this.toggleButtonState(),this.inputListArray.forEach((function(e){e.addEventListener("input",(function(){t._checkValid(e),t.toggleButtonState()}))}))}},{key:"toggleButtonState",value:function(){this._hasInvalidInput()?(this._buttonElement.classList.add(this.inactiveButtonClass),this._buttonElement.disabled=!0):(this._buttonElement.classList.remove(this.inactiveButtonClass),this._buttonElement.disabled=!1)}},{key:"_checkValid",value:function(t){t.validity.valid?this.hideInputError(t):this._showInputError(t,t.validationMessage)}},{key:"_showInputError",value:function(t,e){var n=this.formElement.querySelector(".".concat(t.id,"-error"));t.classList.add(this.inputErrorClass),n.classList.add(this.errorClass),n.textContent=e}},{key:"hideInputError",value:function(t){var e=this.formElement.querySelector(".".concat(t.id,"-error"));t.classList.remove(this.inputErrorClass),e.classList.remove(this.errorClass),e.textContent=""}},{key:"_hasInvalidInput",value:function(){return this.inputListArray.some((function(t){return!t.validity.valid}))}}])&&o(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function u(t){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u(t)}function c(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==u(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==u(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===u(o)?o:String(o)),r)}var o}var a=function(){function t(e,n){var r=e.renderer;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._selectorContainer=document.querySelector(n),this._renderer=r,this.isDefault=!0}var e,n;return e=t,(n=[{key:"renderItems",value:function(t){var e=this;this._items=t,this._items.forEach((function(t){return e._renderer(t,e.isDefault)}))}},{key:"addItem",value:function(t){this._selectorContainer.prepend(t)}},{key:"addItems",value:function(t){this._selectorContainer.append(t)}}])&&c(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function s(t){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s(t)}function l(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==s(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==s(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===s(o)?o:String(o)),r)}var o}var f=function(){function t(e,n,r){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._selectorName=e,this._selectorAbout=n,this._selectorAvatar=r,this._name=document.querySelector(this._selectorName),this._about=document.querySelector(this._selectorAbout),this._avatar=document.querySelector(this._selectorAvatar)}var e,n;return e=t,(n=[{key:"getUserInfo",value:function(){return{name:this._name.textContent,about:this._about.textContent}}},{key:"setUserInfo",value:function(t,e){this._name.textContent=t,this._about.textContent=e}},{key:"setUserAvatar",value:function(t,e){this._avatar.src=e,this._avatar.alt=t}},{key:"setUserId",value:function(t){this._id=t}},{key:"getUserId",value:function(){return this._id}}])&&l(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function p(t){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},p(t)}function y(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==p(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==p(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===p(o)?o:String(o)),r)}var o}var h=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._selectorPopup=document.querySelector(e),this._handleEscClose=this._handleEscClose.bind(this)}var e,n;return e=t,(n=[{key:"open",value:function(){this._selectorPopup.classList.add("popup_opened"),document.addEventListener("keyup",this._handleEscClose)}},{key:"close",value:function(){this._selectorPopup.classList.remove("popup_opened"),document.removeEventListener("keyup",this._handleEscClose)}},{key:"_handleEscClose",value:function(t){"Escape"===t.key&&this.close()}},{key:"setEventListeners",value:function(){var t=this;this._selectorPopup.addEventListener("mousedown",(function(e){(e.target.classList.contains("popup")||e.target.classList.contains("popup__exit-button"))&&t.close()}))}}])&&y(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function d(t){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},d(t)}function m(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==d(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==d(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===d(o)?o:String(o)),r)}var o}function v(){return v="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=_(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},v.apply(this,arguments)}function b(t,e){return b=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},b(t,e)}function _(t){return _=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},_(t)}var g=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&b(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=_(r);if(o){var n=_(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===d(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t,e){var n,r=e.submitForm;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,t))._submitForm=r,n}return e=u,(n=[{key:"renderLoading",value:function(t){this._button=this._selectorPopup.querySelector(".popup__button"),this._button.textContent=t}},{key:"_getInputValues",value:function(){var t=this;return this._inputDictValues={},this._inputs=this._selectorPopup.querySelectorAll(".popup__input"),this._inputs.forEach((function(e){return t._inputDictValues[e.name]=e.value})),this._inputDictValues}},{key:"setEventListeners",value:function(){var t=this;v(_(u.prototype),"setEventListeners",this).call(this),this.form=this._selectorPopup.querySelector(".popup__form"),this.form.addEventListener("submit",(function(e){e.preventDefault(),t._submitForm(t._getInputValues())}))}},{key:"close",value:function(){v(_(u.prototype),"close",this).call(this),this.form.reset()}}])&&m(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(h);function k(t){return k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},k(t)}function S(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==k(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==k(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===k(o)?o:String(o)),r)}var o}function w(){return w="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=C(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},w.apply(this,arguments)}function E(t,e){return E=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},E(t,e)}function C(t){return C=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},C(t)}var L=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&E(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=C(r);if(o){var n=C(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===k(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(e=i.call(this,t))._popupImage=e._selectorPopup.querySelector(".popup__image"),e._popupTitle=e._selectorPopup.querySelector(".popup__title"),e}return e=u,(n=[{key:"open",value:function(t,e){w(C(u.prototype),"open",this).call(this),this._popupImage.src=e,this._popupImage.alt=t,this._popupTitle.textContent=t}}])&&S(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(h);function P(t){return P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},P(t)}function O(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==P(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==P(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===P(o)?o:String(o)),r)}var o}function j(){return j="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=T(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},j.apply(this,arguments)}function I(t,e){return I=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},I(t,e)}function T(t){return T=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},T(t)}var R=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&I(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=T(r);if(o){var n=T(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===P(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),i.call(this,t)}return e=u,(n=[{key:"submitForm",value:function(t){var e=t.submitForm;this._submitForm=e}},{key:"setEventListeners",value:function(){var t=this;j(T(u.prototype),"setEventListeners",this).call(this),this.form=this._selectorPopup.querySelector(".popup__form"),this.form.addEventListener("submit",(function(e){e.preventDefault(),t._submitForm()}))}}])&&O(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(h);function q(t){return q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},q(t)}function B(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==q(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==q(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===q(o)?o:String(o)),r)}var o}var A=new(function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._url=e.url,this._headers=e.headers}var e,n;return e=t,(n=[{key:"_checkResponse",value:function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}},{key:"getUserInfo",value:function(){var t=this;return fetch("".concat(this._url,"/users/me"),{method:"GET",headers:this._headers}).then((function(e){return t._checkResponse(e)}))}},{key:"editUserInfo",value:function(t,e){var n=this;return fetch("".concat(this._url,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:t,about:e})}).then((function(t){return n._checkResponse(t)}))}},{key:"editUserAvatar",value:function(t){var e=this;return fetch("".concat(this._url,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:t})}).then((function(t){return e._checkResponse(t)}))}},{key:"getInitialCards",value:function(){var t=this;return fetch("".concat(this._url,"/cards"),{method:"GET",headers:this._headers}).then((function(e){return t._checkResponse(e)}))}},{key:"addNewCard",value:function(t,e){var n=this;return fetch("".concat(this._url,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:t,link:e})}).then((function(t){return n._checkResponse(t)}))}},{key:"deleteCard",value:function(t){var e=this;return fetch("".concat(this._url,"/cards/").concat(t),{method:"DELETE",headers:this._headers}).then((function(t){return e._checkResponse(t)}))}},{key:"addLikeCard",value:function(t){var e=this;return fetch("".concat(this._url,"/cards/").concat(t,"/likes"),{method:"PUT",headers:this._headers}).then((function(t){return e._checkResponse(t)}))}},{key:"deleteLikeCard",value:function(t){var e=this;return fetch("".concat(this._url,"/cards/").concat(t,"/likes"),{method:"DELETE",headers:this._headers}).then((function(t){return e._checkResponse(t)}))}}])&&B(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}())({url:"https://nomoreparties.co/v1/cohort-64",headers:{authorization:"2ac7f567-442d-413f-8934-d4f44e2290b8","Content-Type":"application/json"}}),U={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"},D=document.querySelector(".body"),x=D.querySelector(".profile__edit-button"),F=D.querySelector(".profile__add-button"),V=D.querySelector(".profile__avatar-container"),N=D.querySelector(".popup__input_type_name"),J=D.querySelector(".popup__input_type_about"),G=Array.from(D.querySelectorAll(U.formSelector)),H={};G.forEach((function(t){var e=new i(U,t);H[e.formElement.name]=e,e.enableValidation()}));var z=new f(".profile__name",".profile__about",".profile__avatar");A.getUserInfo().then((function(t){z.setUserInfo(t.name,t.about),z.setUserAvatar(t.name,t.avatar),z.setUserId(t._id)})).catch((function(t){return console.log("Возникла ошибка: ".concat(t))})),A.getInitialCards().then((function(t){return Q.renderItems(t)})).catch((function(t){return console.log("Возникла ошибка: ".concat(t))}));var M=new L(".popup_type_img"),K=new R(".popup_type_delete"),Q=new a({renderer:function(t,e){var r=new n(t,"#elements__element",{handleCardClick:function(t,e){M.open(t,e)},handleDeleteCardClick:function(t,e){K.open(),K.submitForm({submitForm:function(){z.getUserId()===e._id&&A.deleteCard(t).then((function(){r.deleteCard(),K.close()})).catch((function(t){return console.log("Возникла ошибка: ".concat(t))}))}})},handleLikeClick:function(t){r.isLike?A.deleteLikeCard(t).then((function(){return r.isLike=!1})).catch((function(t){return console.log("Возникла ошибка: ".concat(t))})):A.addLikeCard(t).then((function(){return r.isLike=!0})).catch((function(t){return console.log("Возникла ошибка: ".concat(t))}))}});r.likesCount>=1&&r.likesList.forEach((function(t){t._id===z.getUserId()&&(r.isLike=!0)})),z.getUserId()===r.owner._id&&(r.isBasket=!0);var o=r.generateCard();e?Q.addItems(o):Q.addItem(o)}},".elements__list"),W=new g(".popup_type_edit",{submitForm:function(t){z.setUserInfo(t.author,t.about),W.renderLoading("Сохранение..."),A.editUserInfo(t.author,t.about).catch((function(t){return console.log("Возникла ошибка: ".concat(t))})).finally((function(){return W.close()}))}}),X=new g(".popup_type_add",{submitForm:function(t){X.renderLoading("Загрузка..."),A.addNewCard(t.title,t.url).then((function(t){return Q.renderItems([t])})).catch((function(t){return console.log("Возникла ошибка: ".concat(t))})).finally((function(){return X.close()})),Q.isDefault=!1}}),Y=new g(".popup_type_edit-avatar",{submitForm:function(t){z.setUserAvatar(t.author,t.avatar),Y.renderLoading("Сохранение..."),A.editUserAvatar(t.avatar).catch((function(t){return console.log("Возникла ошибка: ".concat(t))})).finally((function(){return Y.close()}))}});M.setEventListeners(),K.setEventListeners(),W.setEventListeners(),X.setEventListeners(),Y.setEventListeners(),x.addEventListener("click",(function(){W.open();var t=z.getUserInfo();N.value=t.name,J.value=t.about,H.edit.inputListArray.forEach((function(t){H.edit.hideInputError(t)}))})),F.addEventListener("click",(function(){X.open(),H.add.toggleButtonState(),H.add.inputListArray.forEach((function(t){H.add.hideInputError(t)}))})),V.addEventListener("click",(function(){Y.open(),H.editAvatar.toggleButtonState(),H.editAvatar.inputListArray.forEach((function(t){H.editAvatar.hideInputError(t)}))}))})();