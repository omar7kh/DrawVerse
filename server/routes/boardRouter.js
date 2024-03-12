import { Router } from 'express';
import {
  createBoard,
  fetchBoard,
  deleteBoard,
  editBoardName,
  members,
  deleteMember,
  checkIsMember,
  getMembers,
} from '../controllers/boardController.js';
const router = Router();

router.post('/getMembers', getMembers);
router.post('/checkIsMember', checkIsMember);
router.post('/createBoard', createBoard);
router.post('/getBoards', fetchBoard);
router.put('/editBoardName/:boardId/:userId', editBoardName);
router.delete('/deleteBoard/:boardId/:userId', deleteBoard);
router.get('/members/:boardId/:userId', members);
router.delete('/deleteMember/:memberId/:boardId/:userId', deleteMember);

export default router;
