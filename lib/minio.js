const minio = require('minio')

const minioClient = new minio.Client({
   endPoint: 'https://minio.juzcare.ce.kmitl.cloud',
   useSSL: false,
   accessKey: 'm4EEpLc9MiPcjYoW',
   secretKey: 'gevGxxaPyGayOkkymthhg2kj8Pxo5o97',
});

module.exports = minioClient
