import express from "express";
import { LibraryController } from "./library.controller.js";
import { LibraryService } from "./library.service.js";
import { LibraryRepository } from "./library.repository.js";

const libraryRepository = new LibraryRepository();
const libraryService = new LibraryService(libraryRepository);
const libraryController = new LibraryController(libraryService);

const router = express.Router();

router.get("", libraryController.get);

// 서울 구로구 도서 현황 조회
router.get("/seoul", libraryController.getBooks);

// 서울 구로구 도서 검색
router.get("/seoul/search", libraryController.findBook);

export default router;
