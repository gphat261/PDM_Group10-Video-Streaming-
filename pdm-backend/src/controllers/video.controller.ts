import { Request, Response } from 'express';
import { createVideo, listVideos, getVideoById } from '../services/video.service';

export const uploadVideo = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No video file uploaded' });
    }

    const title = (req.body.title as string) || 'Untitled';

    const result = await createVideo(req.file.path, title);

    return res.status(200).json({
      message: 'Video uploaded successfully',
      video: result.video,
      playUrl: result.playUrl,
    });
  } catch (err) {
    console.error('uploadVideo error:', err);
    return res.status(500).json({ message: 'Error processing video' });
  }
};

export const getAllVideos = async (_req: Request, res: Response) => {
  try {
    const videos = await listVideos();
    return res.json(videos);
  } catch (err) {
    console.error('getAllVideos error:', err);
    return res.status(500).json({ message: 'Error fetching videos' });
  }
};

export const getVideoDetail = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Invalid id' });
    }

    const video = await getVideoById(id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    return res.json(video);
  } catch (err) {
    console.error('getVideoDetail error:', err);
    return res.status(500).json({ message: 'Error fetching video detail' });
  }
};
