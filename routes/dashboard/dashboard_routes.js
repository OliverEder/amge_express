import {} from "dotenv/config";
import express from "express";

const router_dashboard = express.Router();


router_dashboard.get("/", (req, res, next) => {
    res.render("dashboard/dashboard", {
        base_url: process.env.BASE_URL
    })
});


export default router_dashboard;