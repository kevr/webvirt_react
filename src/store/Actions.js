export const REMOVE_SESSION = "REMOVE_SESSION";
export const SET_SESSION = "SET_SESSION";

export const removeSession = () => ({
  type: REMOVE_SESSION,
});

export const setSession = (session) => ({
  type: SET_SESSION,
  session: session,
});

export const SET_VIRT_DOMAINS = "SET_VIRT_DOMAINS";

export const setVirtDomains = (domains) => ({
  type: SET_VIRT_DOMAINS,
  domains: domains,
});
