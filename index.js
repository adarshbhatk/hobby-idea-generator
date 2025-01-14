import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    // console.log(result);
    res.render("index.ejs", {data: result});
  } catch (error) {
    console.error("Failed to make request: ", error.message);
    res.render("index.ejs", {
      error: error.message
    });
  }
});

app.post("/", async (req, res) => {
  // console.log(req.body);
  try {
    var hobbyType = req.body.type;
    var hobbyParticipants = req.body.participants;
    const filteredResponse = await axios.get(`https://bored-api.appbrewery.com/filter?type=${hobbyType}&participants=${hobbyParticipants}`);
    const filteredResult = filteredResponse.data;
    // console.log(filteredResult);
    const randomFilteredResult = filteredResult[Math.floor(Math.random()*filteredResult.length)];
    // console.log(randomFilteredResult);
    res.render("index.ejs", {data: randomFilteredResult});
  } catch (error) {
    const errorMessage = "No activities that match your criteria.";
    console.error("Failed to make request: ", error.message);
    res.render("index.ejs", {
      error: errorMessage
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
