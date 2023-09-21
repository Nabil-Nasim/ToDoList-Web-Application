
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");
const app = express();

const items = ["Buy Grocery", "Make Food"];
const workitems = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  const day = date.getdate();
  res.render("list", { ListTitle: day, newlistitems: items });
});

app.post("/", function (req, res) {
  const item = req.body.newitem.trim();

  if (item) {
    if (req.body.List === "Work List") {
      workitems.push(item);
      res.redirect("/work");
    } else {
      items.push(item);
      res.redirect("/");
    }
  } else {
    const day = date.getdate();
    res.render("list", { ListTitle: day, newlistitems: items, errorMessage: "Cannot Add Empty Task" });
  }
});

app.get("/work", function (req, res) {
  res.render("list", { ListTitle: "Work List", newlistitems: workitems });
});

app.post("/work", function (req, res) {
  let item = req.body.newitem;
  workitems.push(item);
  res.redirect("/work");
});

app.post("/delete", function (req, res) {
  const itemIndex = req.body.itemIndex;

  if (itemIndex >= 0 && itemIndex < items.length) {
    items.splice(itemIndex, 1);
  }

  res.redirect("/");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
