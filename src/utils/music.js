// 从网易云音乐链接中提取歌曲ID
export const extractMusicId = (url) => {
  try {
    const regex = /id=(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  } catch (error) {
    console.error('解析音乐链接失败:', error);
    return null;
  }
};

// 获取音乐信息
export const fetchMusicInfo = async (musicId) => {
  try {
    const response = await fetch(`/api/song/detail?ids=${musicId}`);
    const data = await response.json();
    
    if (data.songs && data.songs[0]) {
      const song = data.songs[0];
      return {
        name: song.name,
        artist: song.artists.map(artist => artist.name).join(', '),
        duration: formatDuration(song.duration),
        albumImg: song.album.picUrl
      };
    }
    throw new Error('未找到音乐信息');
  } catch (error) {
    console.error('获取音乐信息失败:', error);
    return null;
  }
};

// 格式化时长
const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 1000 / 60);
  const seconds = Math.floor((duration / 1000) % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
