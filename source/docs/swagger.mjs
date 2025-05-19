// source/swagger.mjs
import swaggerJSDoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Novel API',
      version: '1.0.0',
      description: 'Novel 관리용 API 문서입니다'
    },
    servers: [
      {
        url: 'https://flash-fiction-shelf.onrender.com',
        description: '로컬 서버'
      }
    ]
  },
  apis: ['./source/routes/*.routes.mjs'],
}

const swaggerSpec = swaggerJSDoc(options)
export default swaggerSpec