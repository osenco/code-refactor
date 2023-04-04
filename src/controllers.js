module.exports = {
  status,
  notFound,
};

function status(data, callback) {
  callback(200, { status:'ok', message:'app running.' });
}

function notFound(data, callback) {
  callback(404);
}
