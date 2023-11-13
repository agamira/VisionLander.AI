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
    // storageManager: {
    //   type: "local", // Storage type. Available: local | remote
    //   autosave: true, // Store data automatically
    //   autoload: true, // Autoload stored data on init
    //   stepsBeforeSave: 1, // If autosave is enabled, indicates how many changes are necessary before the store method is triggered
    // },
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
            publishWebsite(editor, siteId);
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
    auth()
      .then((res) => {
        if (action(res)) {
          publishWebsite(editor, siteId);
          responseSent = false;
        }
      })
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
