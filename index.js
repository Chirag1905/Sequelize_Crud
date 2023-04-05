const express = require("express");
const {sequelize,Tables} = require("./models");
const app = express();
const cors = require("cors"); 

app.use(cors());
app.use(express.json());

// for categories
app.post("", async (req, resp) => {
  try {
    const table = await Tables.create(req.body);
    resp.json(table);
  } catch (err) {
    resp.json(err);
  }
});

app.get("", async (req, resp) => {
  try {
    const table = await Tables.findAll();
    resp.send(table);
  } catch (err) {
    resp.json(err);
  }
});

app.put("/update/:uid", async (req, resp) => {
  const uuid = req.params.uid;
  try {
    const tableData = await Tables.findOne({
      where: {
        uuid: uuid,
      },
    });
    tableData.name = req.body.name;
    await tableData.save();

    resp.json(tableData);
  } catch (err) {
    resp.json(err);
  }
});

app.delete("/delete/:uid", async (req, resp) => {
  try {
    const table = await Tables.findOne({
      where: {
        uuid: req.params.uid,
      },
    });
    await table.destroy();
    resp.json({ msg: `Id ${req.params.uid} deleted` });
  } catch (err) {
    resp.json(err);
  }
});


app.listen(3000, async () => {
  console.log(`server running on port 3000`);
  await sequelize.authenticate();
  console.log("Database Connected!");
});
