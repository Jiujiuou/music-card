import { create } from "zustand";

const useStore = create((set) => ({
  backgroundUrl: "",
  cardImageUrl: "",
  musicInfo: {
    name: "是的 我有见过我的梦",
    artist: "安溥 anpu",
    duration: "5:26",
    albumImg: "",
    currentTime: "0:30",
  },
  updateBackgroundUrl: (url) => set({ backgroundUrl: url }),
  updateCardImageUrl: (url) => set({ cardImageUrl: url }),
  updateSongName: (name) =>
    set((state) => ({
      musicInfo: { ...state.musicInfo, name },
    })),
  updateArtist: (artist) =>
    set((state) => ({
      musicInfo: { ...state.musicInfo, artist },
    })),
  updateDuration: (duration) =>
    set((state) => ({
      musicInfo: { ...state.musicInfo, duration },
    })),
  updateCurrentTime: (currentTime) =>
    set((state) => ({
      musicInfo: { ...state.musicInfo, currentTime },
    })),
  updateAlbumImg: (albumImg) =>
    set((state) => ({
      musicInfo: { ...state.musicInfo, albumImg },
    })),
}));

export default useStore;
