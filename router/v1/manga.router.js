import express from "express";
import {
  getAllManga,
  getCategory,
  getDetailChapter,
  getDetailManga,
  getListCategory,
  getTopTier,
  searchManga,
} from "../../service/v1/manga.service.js";

const router = express.Router();

router.get("/", getAllManga);
router.get("/truyen-tranh/:id", getDetailManga);
router.get("/truyen-tranh/:manga/:chapter/:id", getDetailChapter);
router.get("/tim-truyen", searchManga);
router.get("/tim-truyen/:category", getCategory);
router.get("/categories", getListCategory);
router.get("/bxh/:type", getTopTier);

export default router;
