import Keycloak from "keycloak-js";

const keycloak = new Keycloak();
keycloak.init({
  onLoad: "check-sso",
  silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
  pkceMethod: "S256"
});

export const userId = () => keycloak.tokenParsed.sub;
export const username = () => keycloak.tokenParsed.preferred_username;
export const firstName = () => keycloak.tokenParsed.given_name;
export const lastName = () => keycloak.tokenParsed.family_name;
export const fullName = () => keycloak.tokenParsed.name;
export const email = () => keycloak.tokenParsed.email;

export default keycloak;
