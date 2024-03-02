if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}
const express = require("express");
const route = require("./routes");
const app = express();


app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(route);

module.exports = app

// module.exports = {
//     apps : [{
//       name   : "lodging_gc01",
//       script : "./bin/www",
//       env: {
//         NODE_ENV: "production",
//         PORT: 80,
//         API_SECRET:"BZB9nInwLxwNQ0tAPP8O4WR9aII",
//         PORT:6969,
//         SECRET_TOKEN:"kzhayin",
//         API_KEY:737864581877772,
//         CLOUD_NAME:"dqzvi1mpt",
//         DATABASE_URL:"postgres://postgres.jhtqhmlzkfslepenwjfy:IzlwjxUBISlXPy6Y@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
//       }
//     }]
//   }