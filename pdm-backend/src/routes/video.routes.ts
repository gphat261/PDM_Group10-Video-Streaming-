import { Router } from 'express';
import { upload } from '../middleware/upload';
import { uploadVideo, getAllVideos, getVideoDetail } from '../controllers/video.controller';

const router = Router();

// upload
router.post('/upload', upload.single('video'), uploadVideo);

// list
router.get('/', getAllVideos);

// detail
router.get('/:id', getVideoDetail);

export default router;
