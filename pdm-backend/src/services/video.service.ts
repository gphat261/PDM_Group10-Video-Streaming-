import { exec } from 'child_process';
import path from 'path';
import fs from 'fs/promises';
import { prisma } from '../libs/prisma';

/**
 * Convert file mp4 sang HLS, trả về đường dẫn tương đối tới file .m3u8
 * Ví dụ: hls/1763353616397/index.m3u8
 */
const convertToHls = (inputPath: string): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const folderName = Date.now().toString();
      const outputDir = path.join('uploads', 'hls', folderName);
      const outputPath = path.join(outputDir, 'index.m3u8');

      await fs.mkdir(outputDir, { recursive: true });

      const cmd = `ffmpeg -i "${inputPath}" -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls "${outputPath}"`;

      exec(cmd, (error, _stdout, stderr) => {
        if (error) {
          console.error('ffmpeg error:', stderr);
          return reject(error);
        }
        resolve(outputPath); // ví dụ: uploads/hls/1763.../index.m3u8
      });
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Tìm hoặc tạo một channel mặc định cho user đầu tiên
 */
const getOrCreateDefaultChannel = async () => {
  // lấy user đầu tiên làm owner (tạm thời cho đơn giản)
  const owner = await prisma.user.findFirst();
  if (!owner) {
    throw new Error('No user found. Please register at least one user first.');
  }

  let channel = await prisma.channel.findFirst({
    where: { ownerId: owner.id },
  });

  if (!channel) {
    channel = await prisma.channel.create({
      data: {
        name: `${owner.username}'s Channel`,
        description: 'Default channel',
        ownerId: owner.id,
      },
    });
  }

  return channel;
};

export const createVideo = async (filePath: string, title: string) => {
  // 1. Convert sang HLS
  const hlsPath = await convertToHls(filePath); // uploads/hls/.../index.m3u8

  // 2. playPath = bỏ chữ "uploads/" đi để ghép vào URL
  const playPath = hlsPath.replace(/^uploads\//, ''); // hls/.../index.m3u8

  // 3. Lấy / tạo channel mặc định
  const channel = await getOrCreateDefaultChannel();

  // 4. Lưu video vào DB
  const video = await prisma.video.create({
    data: {
      title,
      description: null,
      duration: 0,            // chưa phân tích duration nên tạm 0
      views: 0,
      status: 'public',
      thumbnailUrl: null,
      hlsUrl: playPath,       // lưu dạng: hls/.../index.m3u8
      channelId: channel.id,
      categoryId: null,
    },
  });

  return {
    video,
    playUrl: `http://localhost:4000/${playPath}`,
  };
};

/**
 * Lấy danh sách video
 */
export const listVideos = async () => {
  const videos = await prisma.video.findMany({
    orderBy: { uploadDate: 'desc' },
  });

  return videos.map((v) => ({
    id: v.id,
    title: v.title,
    views: v.views,
    uploadDate: v.uploadDate,
    hlsPath: v.hlsUrl,
    playUrl: v.hlsUrl ? `http://localhost:4000/${v.hlsUrl}` : null,
  }));
};

/**
 * Lấy chi tiết video theo id
 */
export const getVideoById = async (id: number) => {
  const v = await prisma.video.findUnique({
    where: { id },
  });

  if (!v) return null;

  return {
    id: v.id,
    title: v.title,
    description: v.description,
    views: v.views,
    uploadDate: v.uploadDate,
    hlsPath: v.hlsUrl,
    playUrl: v.hlsUrl ? `http://localhost:4000/${v.hlsUrl}` : null,
  };
};
