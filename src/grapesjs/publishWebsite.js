import { api } from "../api";

async function publishWebsite(editor, siteId) {
  try {
    api
      .post(`/publish/upload-json/${siteId}`, {
        data: {
          html: editor.getHtml(),
          css: editor.getCss(),
        },
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
}

export { publishWebsite };
