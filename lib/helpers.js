module.exports = {
  parseJson,
};

function parseJson(str) {
  if(!str) {
    // No point in trying to parse an empty string
    return {};
  }

  try {
    const parsed = JSON.parse(str);
    return parsed;
  } catch(err) {
    console.error(`helpers.parseJson() :: Failed to parse string ${str}. Sending back an empty object.`);
    return {};
  }
};
