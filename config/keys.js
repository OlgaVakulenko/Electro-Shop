// if (process.env.NODE_ENV === "production") {
//   module.exports = require("./keys_prod");
// } else {
//   module.exports = require("./keys_dev");
// }

module.exports = {
  mongoURI:
    "mongodb+srv://step-notes:Test-connection1234@cluster0-catm5.mongodb.net/FE_Final_Project_BE?retryWrites=true&w=majority",
  secretOrKey: "secret",
  nodemailerUser: "electroshop.mailserver@gmail.com",
  nodemailerPassword: "Electro123!",
  nodemailerService: "gmail"
};
