import fs from "fs";
import path from "path";

// Define the old and new paths you want to replace
const oldPath = "/assets/";
const newPath = "/static/dist/assets/";

// Specify the directory where your built files are located
const buildDirectory = "../back/static/dist/";

// Function to recursively update file contents
function updateFileContents(filePath) {
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const updatedContents = fileContents.replace(
    new RegExp(oldPath, "g"),
    newPath
  );
  fs.writeFileSync(filePath, updatedContents);
}

// Function to traverse the directory and update files
function updateFilesInDirectory(directory) {
  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    if (fs.statSync(filePath).isDirectory()) {
      updateFilesInDirectory(filePath);
    } else {
      if (
        filePath.endsWith(".js") ||
        filePath.endsWith(".css") ||
        filePath.endsWith(".html")
      ) {
        updateFileContents(filePath);
      }
    }
  });
}

// Start updating files in the build directory
updateFilesInDirectory(buildDirectory);

console.log("File paths updated successfully.");
