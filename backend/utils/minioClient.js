const Minio = require("minio");

var MinioClient = new Minio.Client({
  endPoint: "127.0.0.1",
  port: 9000,
  useSSL: false,
  accessKey: "4va3O5BGvlvZ85qP",
  secretKey: "8w65KYWSZXdXriwZ4XUN7t4Mi2w0Ves4",
});

module.exports = MinioClient;
