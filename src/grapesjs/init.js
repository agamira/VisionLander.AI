import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import preset from "grapesjs-preset-webpage";
import cssParser from "grapesjs-parser-postcss";
import basicBlocks from "grapesjs-blocks-basic";
import { fetchTemplate, publishWebsite } from ".";
import { auth } from "../api";

function redactorInitializer() {
  localStorage.clear();
  const editor = grapesjs.init({
    container: "#gjs",
    // fromElement: true,
    allowScripts: 1,
    jsInHtml: true,
    width: "auto",
    storageManager: false,
    panels: { defaults: ["basic-actions", "panel-top"] },
    plugins: [basicBlocks, preset, cssParser],
  });
  window.editor = editor;

  fetchTemplate(editor);

  editor.Panels.addButton("options", {
    id: "btn-deploy",
    className: "btn-deploy",
    label: "Save and publish",
    context: "deploy-now",
    command(editor) {
      // auth()
      //   .then((res) => {
      //     console.log(res);
      //     if (res.status === 200) {
      //       if (!res.email) {
      //         return;
      //       }
      //       if (!res.premium) {
      //         if (!res.count > 0) {
      //           return;
      //         }
      //         return;
      //       }
      publishWebsite(editor);
      //     }
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //   });
    },
  });

  editor.Panels.removeButton("options", "export-template");
  editor.on("asset:upload:response", (response) => {
    console.log(response);
  });
}

export { redactorInitializer };
