let nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "chrollolucilfer1402@gmail.com",
    pass: "rpxhfmzdqladpzsg",
  },
});

let mailOptions = {
  from: "chrollolucilfer1402@gmail.com",
  to: "Victor20030214@gmail.com",
  subject: "Email from node.js",
  text: "homosherei",
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.log(err);
  } else {
    console.log("email send to " + mailOptions.to);
  }
});
