export const sortByName = (a, b) => {
  if (a.name < b.name) return -1;
  else if (a.name > b.name) return 1;
  return 0;
};

export const navigateLogin = (location, navigate) => {
  const uri = encodeURIComponent(location.pathname);
  return navigate(`/login?next=${uri}`);
};
