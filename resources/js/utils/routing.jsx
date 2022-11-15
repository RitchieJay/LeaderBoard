export const throwNotFound = (message) => {
    throw new Response("", {
        status: 404,
        statusText: message,
    });
};
