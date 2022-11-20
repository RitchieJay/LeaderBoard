export const throwNotFound = (message = "Page Not Found") => {
    throw new Response("", {
        status: 404,
        statusText: message,
    });
};
