const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");

const getRandowId = require("./utils/getRandomId");

const minioClient = require("./lib/minio");

const PORT = process.env.NODE_SERVER_PORT || 3002;
const app = express();
app.use(cors());
app.use(fileupload());

app.get("/", (req, res) => {
   res.json({
      greeting: "hello from uploading server",
   });
});

app.post("/", async (req, res) => {
   const requestFile = req?.files;
   if (!requestFile)
      return res.status("400").json({
         message: "no file received",
      });

   const uploadedFileName = [];

   await Promise.all(
      Object.values(requestFile).map(async (file) => {
         const fileName = `${file.name.replace(/[^a-zA-Z0-9$$!%&#^-_.+]/g, "")}-${getRandowId(10)}`;
         const metadata = { "Content-Type": file.mimetype };
         console.log(fileName);
         const putObject = () =>
            new Promise((res) => {
               minioClient.putObject(
                  "juzcare-media",
                  fileName,
                  file.data,
                  metadata,
                  function (err, objInfo) {
                     if (err) {
                        return res.status(400).json({
                           message: err instanceof Error ? err : "something went wrong",
                        });
                     }
                     uploadedFileName.push(
                        `https://minio-juzcare.celab.network/juzcare-media/${fileName}`
                     );
                     console.log("res");
                     res();
                  }
               );
            });
         await putObject();
      })
   );

   res.json({
      name: uploadedFileName,
   });
});

app.listen(PORT, () => {
   console.log("app listening to port ", PORT);
});
