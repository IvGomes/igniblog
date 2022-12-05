import { ImgHTMLAttributes } from "react";

import styles from './Avatar.module.css'


interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  noBorder?: boolean;
}

export function Avatar({ noBorder, ...props }: AvatarProps) {
  return (
    <img
      className={noBorder ? styles.avatar : styles.avatarWithBorder}
      {...props}
    />
  );
}