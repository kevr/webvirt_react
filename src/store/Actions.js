export const REMOVE_SESSION = "REMOVE_SESSION";
export const SET_SESSION = "SET_SESSION";

export const removeSession = () => ({
  type: REMOVE_SESSION,
});

export const setSession = (session) => ({
  type: SET_SESSION,
  session: session,
});
