import express from "express";
import client from "prom-client";
import log from "./logger";

const app = express();

export function startMetricsServer() {
  const collectDefaultMetrics = client.collectDefaultMetrics;

  collectDefaultMetrics(); // Collect the default metrics

  app.get("/metrics", async (req, res) => {
    // Add a new route to the Express application
    res.set("Content-Type", client.register.contentType); // Set the Content-Type header to the Prometheus content type

    return res.send(await client.register.metrics()); // Return the metrics from the Prometheus client
  });

  app.listen(9100, () => {
    console.log("Metrics server started at http://localhost:9100/metrics");
    //log.info("Metrics server started at http://localhost:9100/metrics");
  });
}
