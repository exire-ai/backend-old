/*#################################################
Developed by: Exire.ai
#################################################*/

module.exports = async function (req, res) {
  if(!req.params.placeID) {
    return res.status(400).send('Missing placeID');
  }
  res.json({ message: "Hello World" });
}