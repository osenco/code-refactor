module.exports = {
	status,
	notFound,
};

function status(data, callback = null) {
	return { status: "ok", message: "app running." };
}

function notFound(data, callback) {
	return 404;
}
