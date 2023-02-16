export const Config = {
  // basePath: 'http://spring.oxiracetam.yijiahe.com/',
  basePath: "http://47.100.32.125:5002",
  version: "1.0.0",
};
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // dev code
  Config.basePath = "http://localhost:5002";
} else {
  // production code
  Config.basePath = "http://47.100.32.125:5002";
}
