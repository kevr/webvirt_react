export const REMOVE_SESSION = "REMOVE_SESSION";
export const SET_SESSION = "SET_SESSION";

export const removeSession = () => ({
  type: REMOVE_SESSION,
});

export const setSession = (session) => ({
  type: SET_SESSION,
  session: session,
});

export const SET_VIRT_DOMAIN = "SET_VIRT_DOMAIN";
export const SET_VIRT_DOMAINS = "SET_VIRT_DOMAINS";

export const setVirtDomain = (domain) => ({
  type: SET_VIRT_DOMAIN,
  domain: domain,
});

export const setVirtDomains = (domains) => ({
  type: SET_VIRT_DOMAINS,
  domains: domains,
});

export const SET_APP_TITLE = "SET_APP_TITLE";
export const REMOVE_APP_TITLE = "REMOVE_APP_TITLE";

export const setAppTitle = (title) => ({
  type: SET_APP_TITLE,
  title: title,
});

export const removeAppTitle = () => ({
  type: REMOVE_APP_TITLE,
});
