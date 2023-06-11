export const routing = (pathname) => {
  console.log(pathname);
  const paths = {
    "/": "index.html",
    "/404page": "404page.html",
    "/about": "about.html",
  };
  if (paths[pathname]) {
    return paths[pathname];
  }
  return "404page.html";
};
