export const AppConfig: () => any = (): any => ({
  port: process.env.APP_PORT || 3000,
  routePrefix: process.env.APP_ROUTE_PREFIX || 'api',
});
