const { StringDecoder } = require('string_decoder');
const url = require('url');

const helpers = require('./helpers');

module.exports = (req, res) => {
  // Get the URL and parse it
  const parsedUrl = url.parse(req.url, true);

  // Get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the query string as an object
  const queryStringObject = parsedUrl.query;

  // Get the HTTP method
  const method = req.method.toUpperCase();

  // Get the headers as an object
  const headers = req.headers;

  // Get the payload, if any
  const decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', data => {
    buffer += decoder.write(data);
  });

  req.on('end', () => {
    try {
      buffer += decoder.end();

      // Choose the handler this request should go to. If none is found use notFound handler
      const requestHandler = typeof router[trimmedPath] !== 'undefined' ? router[trimmedPath] : router.notFound;

      // Construct the data object to send to the handler
      const data = {
        path: trimmedPath,
        query: queryStringObject,
        payload: helpers.parseJson(buffer),
        method,
        headers,
      };

      // Route the request to the handler specified in the router
      requestHandler(data, (statusCode, payload) => {
        // Use the status sent back by the handler or default to 200
        statusCode = typeof statusCode === 'number' ? statusCode : 200;

        // Use the payload called back by the handler or default to any empty object
        payload = typeof payload === 'object' ? payload : {};

        // convert the payload into a string
        const payloadString = JSON.stringify(payload);

        // Return response
        res.setHeader('Content-type', 'application/json');
        res.writeHead(statusCode)
        res.end(payloadString);

        // Log the request path
        console.log(headers, '\n', method, `/${trimmedPath}`);
        console.log('Responding with status:', statusCode);
        console.log('payload:', payload);
      });
    } catch(err) {
      console.error('ERROR:', err);
      res.writeHead(500);
      res.end('Internal Server Error');
    }
  });
};
