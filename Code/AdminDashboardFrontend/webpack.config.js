const path = require('./src/Redux/store');

module.exports = {
  resolve: {
    fallback: {
      "util": require.resolve("util/")
    }
  },
  
};
