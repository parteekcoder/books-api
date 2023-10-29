const sendResponse = (res,success, status, data) => {
    return res.status(status).send({success,data});
}

export default sendResponse;