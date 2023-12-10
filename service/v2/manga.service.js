import axios from "axios";
import { config } from "dotenv";
import cheerio from "cheerio";

config();

export const getAllManga = async (req, res) => {
  try {
    const data = [];
    const response = await axios.get(
      `${process.env.URL_V2}/danh-sach?p=${req.query.page}`
    );
    const html = response.data;

    const $ = cheerio.load(html);
    let count = 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : Infinity;

    $(".container > section > .grid > .relative", html).each(function () {
      if (count >= limit) {
        return false; // break the loop
      }
      const name = $(this).find("h3 > a").text();
      const href = $(this).find("h3 > a").attr("href");
      const thumbnail = $(this)
        .find("a > .overflow-hidden > img")
        .attr("data-src");
      const views = $(this).find("a > .overflow-hidden > span").text();
      data.push({
        name,
        thumbnail,
        href: `${process.env.BASE_URL}/v2` + href,
        views,
      });
      count++;
    });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json("Invalid Server");
  }
};

export const getDetailManga = async (req, res) => {
  try {
    const data = [];
    const newChapter = [];
    const url = `${process.env.URL_V2}/${req.params.name}`;

    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    $("#container > section > .grow", html).each(function () {
      const thumbnail = $(this)
        .find(".shrink-0 > .w-full > img")
        .attr("data-src");

      const name = $(this).find(".shrink-0 > .w-full > img").attr("alt");
      const otherName = $(this).find("h3").text();
      const author = $(this).find(".mb-2").first().find("span").text();
      const status = $(this).find(".mb-2").eq(1).find("span").text();
      const views = $(this).find(".mb-4").find("span").text();
      const likes = $(this).find(".manga-like  > span").text();
      const followers = $(this).find(".manga-follow  > span").text();
      const description = $(this).find(".text-orange-600").eq(1).next().text();
      $(this)
        .find(".manga-chapter  > .chapter-list > .w-full")
        .each(function () {
          const chapter = $(this).find(".chapter-name > a").text();
          const update = $(this).find(".chapter-update").text();
          const views = $(this).find(".chapter-views").text();
          newChapter.push({
            chapter: chapter.replace(/\s+/g, " ").trim(),
            update: update.replace(/\s+/g, " ").trim(),
            views: views.replace(/\s+/g, " ").trim(),
          });
        });

      data.push({
        name,
        otherName,
        thumbnail,
        author,
        status,
        views,
        likes,
        followers,
        description: description.replace(/\s+/g, " ").trim(),
        newChapter,
      });
    });

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json("Invalid Server");
  }
};

export const getChapterDetail = async (req, res) => {
  try {
    const data = [];
    const images = [];
    const url = `${process.env.URL_V2}/${req.params.name}/${req.params.chapter}`;

    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    $("#container").each(function () {
      const thumbnail = $(this).find(".shrink-0 > img").attr("data-src");
      const name = $(this).find("h1").text();
      const otherName = $(this).find("h1").next().text();
      const author = $(this).find("h1").next().next().find("span").text();
      const status = $(this)
        .find("h1")
        .next()
        .next()
        .next()
        .find("span")
        .text();
      const views = $(this)
        .find("h1")
        .next()
        .next()
        .next()
        .next()
        .find("span")
        .text();

      const likes = $(this).find(".manga-like  > span").text();
      const followers = $(this).find(".manga-follow  > span").text();

      $(".manga-content img").each(function () {
        const index = $(this).attr("alt");
        const img = $(this).attr("data-src");

        images.push({
          index,
          img,
        });
      });

      data.push({
        name: name.replace(/\s+/g, " ").trim(),
        thumbnail,
        otherName: otherName.replace(/\s+/g, " ").trim(),
        author: author.replace(/\s+/g, " ").trim(),
        status: status.replace(/\s+/g, " ").trim(),
        views,
        likes,
        followers,
        images,
      });
    });

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json("Invalid Server");
  }
};

export const getHotManga = async (req, res) => {
  try {
    const items = [];
    const response = await axios.get(
      `${process.env.URL_V2}/truyen-hot?p=${req.query.page}`
    );
    const html = response.data;

    const $ = cheerio.load(html);
    $(".container > section > .grid > .relative", html).each(function () {
      const name = $(this).find("h3 > a").text();
      const href = $(this).find("h3 > a").attr("href");
      const thumbnail = $(this)
        .find("a > .overflow-hidden > img")
        .attr("data-src");
      const views = $(this).find("a > .overflow-hidden > span").text();
      items.push({
        name,
        thumbnail,
        href: `${process.env.BASE_URL}/v2` + href,
        views,
      });
    });
    return res.status(200).json(items);
  } catch (error) {
    console.log(error);
    res.status(500).json("Invalid Server");
  }
};

export const getCategory = async (req, res) => {
  try {
    const items = [];
    const url = `${process.env.URL_V2}/${req.params.category}?p=${req.query.page}`;
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    $(".container > section > .grid > .relative", html).each(function () {
      const name = $(this).find("h3 > a").text();
      const href = $(this).find("h3 > a").attr("href");
      const thumbnail = $(this)
        .find("a > .overflow-hidden > img")
        .attr("data-src");
      const views = $(this).find("a > .overflow-hidden > span").text();
      items.push({
        name,
        thumbnail,
        href: `${process.env.BASE_URL}/v2` + href,
        views,
      });
    });
    return res.status(200).json(items);
  } catch (error) {
    console.log(error);
    res.status(500).json("Invalid Server");
  }
};

export const getBXH = async (req, res) => {
  try {
    const items = [];
    const url = `${process.env.URL_V2}/top-ngay?p=${req.query.page}`;
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    $(".container > section > .grid > .relative", html).each(function () {
      const name = $(this).find("h3 > a").text();
      const href = $(this).find("h3 > a").attr("href");
      const thumbnail = $(this)
        .find("a > .overflow-hidden > img")
        .attr("data-src");
      const views = $(this).find("a > .overflow-hidden > span").text();
      items.push({
        name,
        thumbnail,
        href: `${process.env.BASE_URL}/v2` + href,
        views,
      });
    });
    return res.status(200).json(items);
  } catch (error) {
    console.log(error);
    res.status(500).json("Invalid Server");
  }
};


export const searchManga = async (req , res) => {
  try {
    const items = [];
    const url = `${process.env.URL_V2}/tim-kiem/${req.params.manga}`;
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    $(".container > section > .grid > .relative", html).each(function () {
      const name = $(this).find("h3 > a").text();
      const href = $(this).find("h3 > a").attr("href");
      const thumbnail = $(this)
        .find("a > .overflow-hidden > img")
        .attr("data-src");
      const views = $(this).find("a > .overflow-hidden > span").text();
      items.push({
        name,
        thumbnail,
        href: `${process.env.BASE_URL}/v2` + href,
        views,
      });
    });
    return res.status(200).json(items);
  } catch (error) {
    console.log(error);
    res.status(500).json("Invalid Server");
  }
}