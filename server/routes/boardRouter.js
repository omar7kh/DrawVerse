import { Router } from "express";
import {
	createBoard,
	fetchBoard,
	deleteBoard,
	editBoardName,
} from "../controllers/boardController.js";
const router = Router();

router.post("/createBoard", createBoard);
router.post("/getBoards", fetchBoard);
router.put("/editBoardName/:boardId/:userId", editBoardName);
router.delete("/deleteBoard/:boardId/:userId", deleteBoard);

export default router;
