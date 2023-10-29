const createError = (status,message) => {
    let error = new Error();
    error.status = status || 500;
    error.message = message || "Something unexpected happened. Try after sometime.";
    return error;
}

export default createError;