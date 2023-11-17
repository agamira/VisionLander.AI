import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import preset from "grapesjs-preset-webpage";
import cssParser from "grapesjs-parser-postcss";
import basicBlocks from "grapesjs-blocks-basic";
import { fetchTemplate, publishWebsite } from ".";
import { auth } from "../api";

function redactorInitializer(action, siteId) {
  localStorage.clear();
  const editor = grapesjs.init({
    container: "#gjs",
    // fromElement: true,
    allowScripts: 1,
    jsInHtml: true,
    height: "calc(100vh - 79px)",
    width: "auto",
    storageManager: false,
    panels: { defaults: ["basic-actions", "panel-top"] },
    plugins: [basicBlocks, preset, cssParser],
  });
  window.editor = editor;

  fetchTemplate(editor, siteId);

  editor.Panels.addButton("options", {
    id: "btn-deploy",
    className: "btn-deploy",
    label: "Save and publish",
    context: "deploy-now",
    command(editor) {
      auth()
        .then((res) => {
          if (action(res)) {
            publishWebsite(editor, siteId).then((res) => {
              const url = res.data.url;
              if (url) {
                window.open(url, "_blank");
              } else {
                console.error("No site found in the response");
              }
            });
          }
        })
        .catch((err) => {
          alert(err.message);
          console.error(err);
        });
    },
  });

  editor.Panels.removeButton("options", "export-template");
  editor.on("asset:upload:response", (response) => {
    console.log(response);
  });

  let responseSent = false;

  function handleChanges() {
    if (!responseSent) {
      postChanges();
      responseSent = true;
    }
  }

  function postChanges() {
    publishWebsite(editor, siteId)
      .then(() => (responseSent = false))
      .catch((err) => {
        alert(err.message);
        console.error(err);
      });
  }

  editor.on("component:add", handleChanges);
  editor.on("component:update", handleChanges);
  editor.on("component:remove", handleChanges);
  editor.on("component:change", handleChanges);
}

export { redactorInitializer };
