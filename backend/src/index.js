require("dotenv/config")
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5173
const cors = require('cors');
const connectDB = require("./utils/db");
const onUserSignup = require("../inngest/functions/on-signup")
const onTicketCreated = require("../inngest/functions/on-signup")
const pipelineRouter = require("../src/routes/ai_pipeline")
app.use(express.json())
const { serve } = require("inngest/express")
// db connection here
const authRouter = require("../src/routes/user.routes");

const { inngest } = require("../inngest/client");

connectDB()


app.use("/api/auth", authRouter)
app.use("/api/tickets", pipelineRouter)
//app.use("/api/inngest", serve)
app.use("/api/inngest", serve({
  client: inngest,
  functions: [onUserSignup, onTicketCreated]
}))
app.get('/', (req, res) => {
  res.send('API is running...');
});



// later make a connecvt async connect method 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
