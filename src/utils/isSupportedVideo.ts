export default function isSupportedVideo(format?: string) {
  return ["mp4", "MP4", "mov"].includes(format || "");
}
