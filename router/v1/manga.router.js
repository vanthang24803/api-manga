/**
 * @swagger
 * tags:
 *   name: Manga
 *   description: API Manga Manager Version 1
 * /:
 *   get:
 *     summary: Lists all the manga
 *     tags: [Manga]
 *     responses:
 *       200:
 *         description: Get All Manga
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 * /truyen-tranh/{id}:
 *   get:
 *     summary: Get manga by ID
 *     tags: [Manga]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The manga ID
 *     responses:
 *       200:
 *         description: The manga response by ID
 *         content:
 *           application/json:
 *             schema:
 *                type: array
 *       404:
 *         description: The manga was not found
 * /truyen-tranh/{manga}/{chapter}/{id}:
 *   get:
 *     summary: Get manga chapter by ID
 *     tags: [Manga]
 *     parameters:
 *       - in: path
 *         name: manga
 *         schema:
 *           type: string
 *         required: true
 *         description: The manga title
 *       - in: path
 *         name: chapter
 *         schema:
 *           type: string
 *         required: true
 *         description: The chapter number
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The chapter ID
 *     responses:
 *       200:
 *         description: The manga chapter response by ID
 *         content:
 *           application/json:
 *             schema:
 *
 *       404:
 *         description: The manga chapter was not found
 * /tim-truyen:
 *   get:
 *     summary: Search manga
 *     tags: [Manga]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The search query for manga
 *     responses:
 *       200:
 *         description: The search results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *
 * /tim-truyen/{category}:
 *   get:
 *     summary: Get manga by category
 *     tags: [Manga]
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: The manga category
 *     responses:
 *       200:
 *         description: The manga list by category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *
 *       404:
 *         description: The manga in the specified category was not found
 * /categories:
 *   get:
 *     summary: Get list of manga categories
 *     tags: [Manga]
 *     responses:
 *       200:
 *         description: The list of manga categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 * /bxh/{type}:
 *   get:
 *     summary: Get top tier manga
 *     tags: [Manga]
 *     parameters:
 *       - in: path
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: The type of top tier (e.g., 'weekly', 'monthly')
 *     responses:
 *       200:
 *         description: The top tier manga list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *
 */

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
