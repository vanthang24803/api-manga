<div align="center">
  <a href="https://github.com/vanthang24803/manga-nextjs-14">
    <img src="https://utfs.io/f/93b15ab6-043f-4315-9219-b096ca943f88-1zbfv.png" alt="logo" width="200" height="200">
  </a>
</div>

<h2 align="center">MANGA DEX API</h2>

<p align="center">Real-time API for Manga applications</p>

## Run Locally

Clone the project

```bash
 https://github.com/vanthang24803/api-manga
```

Go to the project directory

```bash
  cd api-manga
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
   yarn start
```

## API Reference

#### Get all items

```
  GET http://localhost:3002/v1?page=?limit=
```

```
  GET http://localhost:3002/v2/danh-sach?page=?limit=
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `page`    | `string` | Page **Default = 1**                |
| `limit`   | `string` | Items limit **Default = undefined** |

#### Get Manga

```
  GET /v1/truyen-tranh/${name}
```

```
  GET /v2/${name}
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `name`    | `string` | **Required**. Name of item to fetch |

#### Get Chapter

```
  GET /v1/truyen-tranh/${name}/${chapter}/${chapterId}
```

```
  GET /v2/${name}/${chapterId}
```

| Parameter   | Type     | Description                                 |
| :---------- | :------- | :------------------------------------------ |
| `name`      | `string` | **Required**. Name of item to fetch         |
| `chapter`   | `string` | **Required**. Name chapter of item to fetch |
| `chapterId` | `string` | **Required**. ChapterId of item to fetch    |

#### Get Chapter

```
  GET /v1/truyen-tranh/${name}/${chapter}/${chapterId}
```

```
  GET /v2/${name}/${chapterId}
```

| Parameter   | Type     | Description                                 |
| :---------- | :------- | :------------------------------------------ |
| `name`      | `string` | **Required**. Name of item to fetch         |
| `chapter`   | `string` | **Required**. Name chapter of item to fetch |
| `chapterId` | `string` | **Required**. ChapterId of item to fetch    |

#### Get Category

```
  GET /v1/tim-truyen/${category}
```

```
  GET /v2/${category}
```

| Parameter  | Type     | Description                             |
| :--------- | :------- | :-------------------------------------- |
| `category` | `string` | **Required**. Category of item to fetch |

#### Search Manga

```
  GET /v1/tim-truyen?name={name}
```

```
  GET /v2//tim-kiem/${name}
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `name`    | `string` | **Required**. Name of item to fetch |

#### Get Top Anime

```
  GET /v1/bxh
```

```
  GET /v2/top-ngay
```

| Parameter | Type     | Description                                                      |
| :-------- | :------- | :--------------------------------------------------------------- |
| `type`    | `string` | **Required**. all , day , week , month , follower , update , new |

#### SWAGGER DOCUMENTS

```
  GET /docs
```
