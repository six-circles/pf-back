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
  filename: function (req, file, cb) {
    const name = file.originalname.split(".")[0];
    cb(null, name + "-" + Date.now() + path.extname(file.originalname));
  },
});

var upload = multer({ storage: storage });
var uploadMultiple = upload.fields([{ name: "image1", maxCount: 3 }]);
module.exports = uploadMultiple;
