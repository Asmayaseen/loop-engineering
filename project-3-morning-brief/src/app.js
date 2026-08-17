function startApp(config) {
  // TODO: validate input
  console.log("Starting app with config:", config);

  try {
    run(config);
  } catch (err) {
    // TODO: add error handling
    console.log("Something went wrong");
  }
}

function run(config) {
  return config;
}

module.exports = { startApp };
