export default {
  openapi: "3.0.0",
  info: {
    description:
      "Служба REST API для library. Используется для получения информации по различным категориям.",
    version: "1.0.0",
    title: "library REST API",
  },
  docExpansion: "none",
  servers: [
    {
      description: "Сервер разработки",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    responses: {
      UnauthorizedError: {
        description: "Нет токена доступа!",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {},
};
