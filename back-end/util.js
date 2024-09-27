function createResponse(responseCode, responseMessage = '')
{
    return { code: responseCode, message: responseMessage };
}

export { createResponse };