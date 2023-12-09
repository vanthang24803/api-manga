import cors from "cors";
import axios from "axios";
import express from "express";
import { config } from "dotenv";
import cheerio from "cheerio";

config();

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listing in ${port}`);
});

// GET ALL

app.get("/", (req, res) => {
  try {
    const thumbnail = [];
    let page = req.query.page;
    if (!page) {
      page = 1;
    }

    axios.get(`${process.env.URL}?page=${page}`).then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      $(".row > .item ", html).each(function () {
        const name = $(this).find("figcaption > h3 > a").text();
        const url = $(this).find("figcaption > h3 > a").attr("href");
        const image = $(this).find("a > img").attr("src");

        thumbnail.push({
          name,
          url: `${process.env.BASE_URL}` + url.split(`${process.env.URL}`)[1],
          image,
        });
      });
      return res.status(200).json(thumbnail);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Invalid Server");
  }
});

// APP GET SINGLE
app.get("/truyen-tranh/:id", (req, res) => {
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
                `${process.env.BASE_URL}` + href.split(`${process.env.URL}`)[1],
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
                `${process.env.BASE_URL}` + href.split(`${process.env.URL}`)[1],
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
      return res.status(200).json(data);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Invalid Server");
  }
});
