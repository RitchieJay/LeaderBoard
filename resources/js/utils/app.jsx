export const setDocumentTitle = (title) => {
    let newTitle = import.meta.env.VITE_APP_NAME;
    if (title) {
        newTitle = `${title} | ${newTitle}`;
    }
    document.title = newTitle;
};
