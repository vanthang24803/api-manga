
# MANGA API

Real-time API for reading applications

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

```http
  GET http://localhost:3002/v1?page=?limit=
```

```http
  GET http://localhost:3002/v2/danh-sach?page=?limit=
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page` | `string` | Page **Default = 1** |
| `limit` | `string` | Items limit **Default = undefined** |

#### Get Manga

```http
  GET /v1/truyen-tranh/${name}
```
```http
  GET /v2/${name}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of item to fetch |

#### Get Chapter

```http
  GET /v1/truyen-tranh/${name}/${chapter}/${chapterId}
```
```http
  GET /v2/${name}/${chapterId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of item to fetch |
| `chapter`      | `string` | **Required**. Name chapter of item to fetch |
| `chapterId`      | `string` | **Required**. ChapterId of item to fetch |

#### Get Chapter

```http
  GET /v1/truyen-tranh/${name}/${chapter}/${chapterId}
```
```http
  GET /v2/${name}/${chapterId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of item to fetch |
| `chapter`      | `string` | **Required**. Name chapter of item to fetch |
| `chapterId`      | `string` | **Required**. ChapterId of item to fetch |

#### Get Category

```http
  GET /v1/tim-truyen/${category}
```
```http
  GET /v2/${category}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `category`      | `string` | **Required**. Category of item to fetch |
|

#### Search Manga

```http
  GET /v1/tim-truyen?name={name}
```
```http
  GET /v2//tim-kiem/${name}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of item to fetch |
|

#### Get Top Anime By Day

```http
  GET /v1/bxh
```
```http
  GET /v2/top-ngay
```




