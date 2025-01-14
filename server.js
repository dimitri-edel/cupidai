const express = require("express");
const cors = require("cors"); // Import cors package

const app = express();
const apiKey = "AIzaSyAQD37gEBZUU9QFrndU9QxukjhQ3t8qRWU"; // Replace with your actual API key

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors()); // Use cors middleware

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post("/", async (req, res) => {
  const { lat, lng } = req.body;

  radius = 500;

  if (!lat || !lng || !radius) {
    return res
      .status(400)
      .json({ error: "Latitude, longitude, and radius are required." });
  }

  try {
    // const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&key=${apiKey}`;

    const response = await fetch(
      "https://places.googleapis.com/v1/places:searchText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": `${apiKey}`,
          "X-Goog-FieldMask": "*",
        },
        body: JSON.stringify({
          textQuery: "Hot Yoga Studio",
          maxResultCount: 10,
          languageCode: "en",
          locationBias: {
            circle: {
              center: { latitude: lat, longitude: lng },
              radius,
            },
          },
        }),
      }
    );

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
