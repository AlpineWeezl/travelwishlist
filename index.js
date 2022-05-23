import express from "express";
import { countriesRouter } from "./router/countries.js";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
// app.use(express.urlencoded());
app.use('/api/countries', countriesRouter)


app.listen(port, () => console.log(`The server is listening on port ${port}`));