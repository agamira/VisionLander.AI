import { api } from "../api";

async function publishWebsite(editor, siteId) {
  try {
    const res = await api.post(`/publish/upload-json/${siteId}`, {
      data: {
        html: editor.getHtml(),
        css: editor.getCss(),
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export { publishWebsite };
