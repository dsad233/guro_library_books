import express from "express";
import { LibraryController } from "./library.controller.js";
import { LibraryService } from "./library.service.js";
import { LibraryRepository } from "./library.repository.js";

const libraryRepository = new LibraryRepository();
const libraryService = new LibraryService(libraryRepository);
const libraryController = new LibraryController(libraryService);

const router = express.Router();

// 서울 구로구 도서 현황 조회
router.get("", libraryController.getBooks);

export default router;
