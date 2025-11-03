import express from "express";
import { LibraryController } from "./library.controller.js";
import { LibraryService } from "./library.service.js";
import { LibraryRepository } from "./library.repository.js";

import { AsyncWrapper } from "../common/middlewares/asyncWrapper.js";

const libraryRepository = new LibraryRepository();
const libraryService = new LibraryService(libraryRepository);
const libraryController = new LibraryController(libraryService);

const router = express.Router();

// 서울 구로 도서관 도서 현황 조회
router.get("/seoul", AsyncWrapper(libraryController.getGuroBooks));

// 여주 도서관 도서 현황 조회
router.get("/yeoju", AsyncWrapper(libraryController.getYeojuBooks));

export default router;
