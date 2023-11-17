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
      .then((res) => {
        const url = res.data.url;
        if (url) {
          window.open(url, "_blank");
        } else {
          console.error("No site found in the response");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
}

export { publishWebsite };
