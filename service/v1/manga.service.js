import axios from "axios";
import { config } from "dotenv";
import cheerio from "cheerio";

config();

export const getAllManga = async (req, res) => {
  try {
    const data = [];
    let page = req.query.page;
    let limit = req.query.limit;
    if (!page) {
      page = 1;
    }

    axios.get(`${process.env.URL}?page=${page}`).then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      let count = 0; // Initialize count of items
      $(".row > .item ", html).each(function () {
        if (!limit || count < limit) {
          // Only process items within the limit
          const name = $(this).find("figcaption > h3 > a").text();
          const href = $(this).find("figcaption > h3 > a").attr("href");
          const thumbnail = $(this).find("a > img").attr("src");
          const temp = $(this).find(".image > .clearfix > span").text().trim();

          const [views, comments, followers] = temp
            .split("\n")
            .map((item) => item.trim() || "0");

          data.push({
            name,
            href: `${process.env.BASE_URL}/v1/` + href?.split(`${process.env.URL}`)[1],
            thumbnail,
            views,
            comments,
            followers,
          });
          count++; // Increment count
        }
      });
      return res.status(200).json(data);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Invalid Server");
  }
};

export const getDetailManga = async (req, res) => {
  try {
    let chapterUrl = ` ${process.env.URL}/truyen-tranh/${req.params.id}`;

    const data = [];
    const chapters = [];
    const categories = [];

    axios.get(chapterUrl).then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      $("#item-detail", html).each(function () {
        const name = $(this).find("h1").text();
        const time = $(this).find("time").text();
        const thumbnail = $(this)
          .find(".detail-info > .row > .col-image > img")
          .attr("src");

        const otherName = $(this).find(".title-detail").text();

        const author = $(this)
          .find(
            ".detail-info > .row > .col-info > .list-info > .author > .col-xs-8"
          )
          .text();

        const status = $(this)
          .find(
            ".detail-info > .row > .col-info > .list-info > .status  > .col-xs-8"
          )
          .text();

        $(this)
          .find(
            ".detail-info > .row > .col-info > .list-info > .kind  > .col-xs-8 > a"
          )
          .each(function () {
            const name = $(this).text();
            const href = $(this).attr("href");
            categories.push({
              name,
              href:
                `${process.env.BASE_URL}/v1/` +
                href.split(`${process.env.URL}`)[1],
            });
          });

        const views = $(this)
          .find(".detail-info > .row > .col-info > .list-info > .row > p")
          .last()
          .text();

        const star = $(this).find("[itemprop='aggregateRating']").text();

        const followers = $(this).find(".follow > span > b").text();

        const content = $(this).find(".detail-content > p").text();

        $(this)
          .find(".list-chapter > nav > ul > li")
          .each(function () {
            const name = $(this).find(".col-xs-5 > a").text();
            const href = $(this).find(".col-xs-5 > a").attr("href");
            const time = $(this).find(".col-xs-4").text();
            const views = $(this).find(".col-xs-3").text();

            chapters.push({
              name,
              href:
                `${process.env.BASE_URL}/v1/` +
                href.split(`${process.env.URL}`)[1],
              time,
              views,
            });
          });

        data.push({
          name,
          thumbnail,
          time: time.replace(/\s+/g, " ").trim(),
          otherName,
          author: author.replace(/\s+/g, " ").trim(),
          status,
          views,
          star,
          followers,
          content: content.replace(/\s+/g, " ").trim(),
          categories,
          chapters,
        });
      });
      return res.status(200).json(data[0]);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Invalid Server");
  }
};

export const getDetailChapter = async (req, res) => {
  try {
    const data = [];
    const images = [];

    let chapterUrl = `${process.env.URL}/truyen-tranh/${req.params.manga}/${req.params.chapter}/${req.params.id}`;

    let response = await axios.get(chapterUrl);
    const html = response.data;
    const $ = cheerio.load(html);
    $("#ctl00_divCenter", html).each(function () {
      const name = $(this)
        .find(".reading > .container > .top > .txt-primary > a")
        .text();
      const chapter = $(this)
        .find(".reading > .container > .top > .txt-primary > span")
        .text();
      const time = $(this).find(".reading > .container > .top > i").text();

      $(this)
        .find(".reading > .reading-detail > .page-chapter")
        .each(function () {
          const index = $(this).find("img").attr("alt");
          const url = $(this).find("img").attr("src");
          images.push({ index, url });
        });

      const prevChapter = $(this).find("#chapterNav > a.prev").attr("href");
      const nextChapter = $(this).find("#chapterNav > a.next").attr("href");
      data.push({
        name: name.replace(/\s+/g, " ").trim(),
        chapter,
        prevChapter:
          `${process.env.BASE_URL}/v1/` +
          prevChapter.split(`${process.env.URL}`)[1],
        nextChapter:
          `${process.env.BASE_URL}/v1/` +
          nextChapter.split(`${process.env.URL}`)[1],
        time: time.replace(/\s+/g, " ").trim(),
        images,
      });
    });
    return res.status(200).json(data[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Invalid Server", error: error.message });
  }
};

export const searchManga = async (req, res) => {
  try {
    const data = [];
    let searchUrl = `${process.env.URL}/tim-truyen?q=${req.query.name}&btn_search=`;
    let response = await axios.get(searchUrl);
    const html = response.data;
    const $ = cheerio.load(html);
    $(".items > .row > .item", html).each(function () {
      const name = $(this).find(".clearfix > .image > a").attr("title");
      const href = $(this).find(".clearfix > .image > a").attr("href");
      const thumbnail = $(this)
        .find(".clearfix > .image > a > img")
        .attr("src");
      const temp = $(this).find(".image > .clearfix > span").text().trim();

      const [views, comments, followers] = temp
        .split("\n")
        .map((item) => item.trim() || "0");

      data.push({
        name,
        href:
          `${process.env.BASE_URL}/v1/` + href.split(`${process.env.URL}`)[1],
        thumbnail,
        views,
        comments,
        followers,
      });
    });

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Invalid Server", error: error.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const data = [];
    let searchUrl = `${process.env.URL}/tim-truyen/${req.params.category}?page=${req.query.page}`;
    let response = await axios.get(searchUrl);
    const html = response.data;
    const $ = cheerio.load(html);
    $(
      "#ctl00_divCenter > .Module-170 > .ModuleContent > .items > .row > .item ",
      html
    ).each(function () {
      const name = $(this).find(".clearfix > .image > a").attr("title");
      const href = $(this).find(".clearfix > .image > a").attr("href");
      const temp = $(this).find(".image > .clearfix > span").text().trim();
      const thumbnail = $(this)
        .find(".clearfix > .image > a > img")
        .attr("src");
      const [views, comments, followers] = temp
        .split("\n")
        .map((item) => item.trim() || "0");

      data.push({
        name,
        thumbnail,
        href:
          `${process.env.BASE_URL}/v1/` + href.split(`${process.env.URL}`)[1],
        views,
        comments,
        followers,
      });
    });

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Invalid Server", error: error.message });
  }
};

export const getListCategory = async (req, res) => {
  try {
    const data = [];
    let searchUrl = `${process.env.URL}/tim-truyen`;
    let response = await axios.get(searchUrl);
    const html = response.data;
    const $ = cheerio.load(html);
    $(
      "#ctl00_divRight > .Module-179 > .ModuleContent > .nav > li  ",
      html
    ).each(function () {
      const name = $(this).find("a").text();
      const href = $(this).find("a").attr("href");
      data.push({
        name,
        href:
          `${process.env.BASE_URL}/v1/` + href.split(`${process.env.URL}`)[1],
      });
    });

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Invalid Server", error: error.message });
  }
};

export const getTopTier = async (req, res) => {
  try {
    const data = [];
    let topUrl;
    switch (req.params.type) {
      case "new":
        topUrl = `${process.env.URL}/tim-truyen?sort=8`;
        break;
      case "update":
        topUrl = `${process.env.URL}/tim-truyen?sort=9`;
        break;
      case "all":
        topUrl = `${process.env.URL}/tim-truyen?sort=10`;
        break;
      case "month":
        topUrl = `${process.env.URL}/tim-truyen?sort=11`;
        break;
      case "week":
        topUrl = `${process.env.URL}/tim-truyen?sort=12`;
        break;
      case "day":
        topUrl = `${process.env.URL}/tim-truyen?sort=13`;
        break;
      case "follower":
        topUrl = `${process.env.URL}/tim-truyen?sort=14`;
        break;
      default:
        topUrl = `${process.env.URL}/tim-truyen?sort=10`;
        break;
    }

    let response = await axios.get(topUrl);
    const html = response.data;
    const $ = cheerio.load(html);

    const limit = req.query.item ? parseInt(req.query.item) : Infinity;

    let count = 0;
    $(
      "#ctl00_divCenter > .Module-170 > .ModuleContent > .items > .row > .item ",
      html
    ).each(function () {
      if (count >= limit) {
        return false; // Dừng vòng lặp khi đạt đến giới hạn
      }
      const name = $(this).find(".clearfix > .image > a").attr("title");
      const href = $(this).find(".clearfix > .image > a").attr("href");
      const temp = $(this).find(".image > .clearfix > span").text().trim();
      const thumbnail = $(this)
        .find(".clearfix > .image > a > img")
        .attr("src");
      const [views, comments, followers] = temp
        .split("\n")
        .map((item) => item.trim() || "0");

      data.push({
        name,
        thumbnail,
        href:
          `${process.env.BASE_URL}/v1/` + href.split(`${process.env.URL}`)[1],
        views,
        comments,
        followers,
      });

      count++;
    });

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Invalid Server", error: error.message });
  }
};
