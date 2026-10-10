import { IMG_URL } from './config';

export function imageUrl(src: string): string {
  return `${IMG_URL}/${src}`;
}
