export interface ImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  className?: string;
  [key: string]: any;
}

export default function Image(props: ImageProps) {
  return (
    <img
      width={props.width}
      height={props.height}
      className={props.className}
      {...props}
    />
  );
}
