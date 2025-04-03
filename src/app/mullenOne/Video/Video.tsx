import styles from './Video.module.scss';

interface VideoProps {
  src: string;
}

const VideoContainer = ({ src }: VideoProps) => {
  return (
    <div className={styles.videoContainer}>
      <iframe
        width='100%'
        height='100%'
        src={src}
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      ></iframe>
    </div>
  );
};

export default VideoContainer;
