export const JwtConfig: () => any = (): any => ({
  secret: process.env.APP_SECRET,
});
