/*#################################################
Developed by: Exire.ai
#################################################*/

module.exports = async function (req, res) {
  if(!req.params.userID) {
    return res.status(400).send('Missing userID');
  }
  res.json({ message: "Hello World" });
}