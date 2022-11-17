const minio = require('minio')

const minioClient = new minio.Client({
   endPoint: '10.10.0.25',
   port: 9000,
   useSSL: false,
   accessKey: '02ByBpFXr7q0gh5Z',
   secretKey: 'g9dduIYbWmrN88R4pM4FaaWJeMHO1Fy9',
});

module.exports = minioClient
