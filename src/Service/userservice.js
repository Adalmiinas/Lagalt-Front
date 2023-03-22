import Keycloak from "keycloak-js";

const _kc = new Keycloak("/keycloak.json");

const initKeycloak = onAuthenticatedCallback => {
  _kc
    .init({
      onLoad: "check-sso",
      silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
      pkceMethod: "S256"
    })
    .then(onAuthenticatedCallback);
};

const doLogin = _kc.login;
const doRegister = _kc.register;
const clearToken = _kc.clearToken;
const doLogout = _kc.logout;
const fullClear = () => doLogout().then(clearToken);

const getToken = () => _kc.token;
const kc = () => _kc.tokenParsed;

const isLoggedIn = () => !!_kc.token;

const updateToken = successCallback => _kc.updateToken(5).then(successCallback).catch(doLogin);

const getUsername = () => _kc.tokenParsed?.preferred_username;
const getId = () => _kc.tokenParsed?.sub;
const email = () => _kc.tokenParsed?.email;
const givenName = () => _kc.tokenParsed?.given_name;
const familyName = () => _kc.tokenParsed?.family_name;
const name = () => _kc.tokenParsed?.name;

const hasRole = roles => roles.some(role => _kc.hasRealmRole(role));

const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
  hasRole,
  kc,
  getId,
  name,
  familyName,
  givenName,
  email,
  doRegister,
  clearToken,
  fullClear
};

export default UserService;
