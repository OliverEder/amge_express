import express from "express";
import { api_register_new, api_edit_new } from "../../controllers/news_controller.js";
import upload  from "../../middlewares/multer_news.js"

const router_api_new = express.Router();

// Nuevo registro
router_api_new.post("/", upload.single("new_thumbnail") , api_register_new);
router_api_new.put("/:new_id", upload.single("new_thumbnail") , api_edit_new);
//router_api_new.post("/upload_files", register_new);

export default router_api_new;