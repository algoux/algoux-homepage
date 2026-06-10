const { defineConfig, loadEnv } = require('vite');

module.exports = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const googleAnalyticsId = (
    env.GOOGLE_ANALYTICS_ID ||
    env.VITE_GOOGLE_ANALYTICS_ID ||
    ''
  ).trim();

  return {
    define: {
      __GOOGLE_ANALYTICS_ID__: JSON.stringify(googleAnalyticsId),
    },
  };
});
