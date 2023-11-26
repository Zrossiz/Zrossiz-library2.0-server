import YAML from "yamljs";

const booksPaths = YAML.load("./src/docs/paths/books.yaml");
const usersPaths = YAML.load("./src/docs/paths/users.yaml");

export default {
  openapi: "3.0.0",
  info: {
    description:
      "Служба REST API для Library. Используется для получения информации по различным категориям.",
    version: "1.0.0",
    title: "Library REST API",
  },
  docExpansion: "none",
  servers: [
    {
      url: `${process.env.API_URL}/api`,
      description: "Сервер разработки",
    },
  ],
  paths: {
    ...booksPaths,
    ...usersPaths,
  },
};
