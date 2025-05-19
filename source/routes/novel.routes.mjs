import { Router } from 'express'
import NovelController from '../controllers/novel.controller.mjs'

const router = Router()
const controller = new NovelController()

/**
 * @swagger
 * /novels:
 *   post:
 *     summary: 새 소설 생성
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               content:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: 생성된 소설 반환
 *       400:
 *         description: 요청 오류
 */
router.post('/', controller.create)

/**
 * @swagger
 * /novels/series:
 *   get:
 *     summary: 시리즈명으로 소설 목록 조회
 *     parameters:
 *       - in: query
 *         name: series
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 시리즈에 해당하는 소설 목록 반환
 *       400:
 *         description: 요청 오류
 */
router.get('/series', controller.getBySeries)

/**
 * @swagger
 * /novels/reference:
 *   get:
 *     summary: 참조 ID로 소설 목록 조회
 *     parameters:
 *       - in: query
 *         name: referenceId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 참조 ID에 해당하는 소설 목록 반환
 *       400:
 *         description: 요청 오류
 */
router.get('/reference', controller.getByReference)

/**
 * @swagger
 * /novels:
 *   get:
 *     summary: 전체 소설 목록 조회 (페이지네이션)
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: 전체 소설 목록과 페이지 정보 반환
 */
router.get('/', controller.getAll)

/**
 * @swagger
 * /novels/{id}:
 *   get:
 *     summary: 특정 소설 단건 조회
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 소설 데이터 반환
 *       404:
 *         description: 소설을 찾을 수 없음
 */
router.get('/:id', controller.get)

/**
 * @swagger
 * /novels/{id}:
 *   put:
 *     summary: 소설 정보 수정
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               reference:
 *                 type: string
 *     responses:
 *       200:
 *         description: 수정된 소설 반환
 *       403:
 *         description: 권한 없음
 *       400:
 *         description: 요청 오류
 */
router.put('/:id', controller.update)

/**
 * @swagger
 * /novels/{id}/deactivate:
 *   patch:
 *     summary: 소설 비활성화
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 비활성화된 소설 반환
 *       403:
 *         description: 권한 없음
 *       400:
 *         description: 요청 오류
 */
router.patch('/:id/deactivate', controller.deactivate)

export default router