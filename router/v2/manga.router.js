import express from "express";
import {
  getAllManga,
  getDetailManga,
  getChapterDetail,
  getHotManga,
  getCategory,
  getBXH,
  searchManga,
} from "../../service/v2/manga.service.js";

const router = express.Router();

router.get("/danh-sach", getAllManga);
router.get("/truyen-hot", getHotManga);
router.get("/top-ngay", getBXH);
router.get("/:name", getDetailManga);
router.get("/tim-kiem/:manga", searchManga);
router.get("/:category", getCategory);
router.get("/:name/:chapter", getChapterDetail);

export default router;
