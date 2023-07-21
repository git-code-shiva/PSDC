const { default: mongoose } = require("mongoose");

const getConnection = async () => {
  await mongoose.connect(process.env.URI);
};

module.exports = getConnection;
