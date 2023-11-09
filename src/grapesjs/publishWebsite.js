import { api } from "../api";

function publishWebsite(editor, siteId) {
  try {
    api
      .post(`/publish/upload-json/${siteId}`, {
        html: editor.getHtml(),
        css: editor.getCss(),
      })
      .then((res) => {
        const user = res.data.user;
        if (user) {
          window.location.href = `https://${user}.visionlander.ai`;
        } else {
          console.error("No user found in the response");
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
