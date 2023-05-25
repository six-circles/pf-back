const multer = require("multer");
const path = require("path");

// module.exports = multer({
//   storage: multer.diskStorage({}),
//   fileFilter: (req, file, cb) => {
//     let ext = path.extname(file.originalname);
//     if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
//       cb(new Error("File type  is not supported", false));
//       return;
//     }
//     cb(null, true);
//   },
// });
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });
var uploadMultiple = upload.fields([
  { name: "image1", maxCount: 10 },
  { name: "image2", maxCount: 10 },
  { name: "image3", maxCount: 10 },
]);
module.exports = uploadMultiple;
