import "./VideoPlayer.scss";
import playBtn from "../../assets/icon/play-btn.svg";

function VideoPlayer({ videoFile, previewImage, ...rest }) {
  const playVideo = () => {
    const video = document.getElementById("video");
    video.play();
  };

  return (
    <div className="video-player">
      <video id="video" poster={previewImage}>
        <source src={videoFile} type="video/mp4" {...rest} />
        Your browser does not support the video tag.
      </video>
      <button className="play-button" onClick={playVideo}>
        <img src={playBtn} alt="play button" />
      </button>
    </div>
  );
}

export { VideoPlayer };
