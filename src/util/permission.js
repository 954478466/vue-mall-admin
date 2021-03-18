const roleToRoute = {
  coustomer: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  },
  ],
  admin: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }, {
    name: 'Category',
  },
  ],
};

function getMenuRoutes(roule, routes) {
  const names = roleToRoute[roule].map((route) => route.name);
  const menuRoutes = routes.filter((route) => {
    if (names.includes(route.name)) {
      const c = route;
      c.children = route.children.filter((children) => names.includes(children.name));
      return true;
    }
    return false;
  });
  return menuRoutes;
}

export default {
  getMenuRoutes,
};
