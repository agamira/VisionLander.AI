import { api } from "../api";

function fetchTemplate(editor, siteId) {
  api(`publish/get-json/${siteId}`)
    .then((response) => response.data)
    .then((htmlContent) => {
      const defaultTemplate = `
          <style>
           ${htmlContent.css}
          </style>
          ${htmlContent.html}
        `;
      // Call a function to set the HTML content in the GrapesJS editor
      editor.setComponents(defaultTemplate);
    })
    .catch((error) => {
      console.error("Error fetching HTML:", error);
    });
}
export { fetchTemplate };
