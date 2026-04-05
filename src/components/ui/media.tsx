import { Switch, Match, splitProps } from "solid-js"
import { cn } from "~/lib/utils"
import { Audio } from "./audio"
import { Video } from "./video"
import { Image, ImageImg, ImageFallback } from "./image"
import { useCollectionItem } from "./collection"
import type { MediaType, MediaItemProps } from "./types/media"

const detectMediaType = (src?: string): MediaType => {
  if (!src) return "image"  
  const ext = src.split(".").pop()?.toLowerCase()?.split("?")[0]  
  const imageExts = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "ico", "avif"]
  const videoExts = ["mp4", "webm", "ogg", "mov", "avi", "mkv", "m4v"]
  const audioExts = ["mp3", "wav", "ogg", "aac", "flac", "m4a", "wma"]
  
  if (ext && imageExts.includes(ext)) return "image"
  if (ext && videoExts.includes(ext)) return "video"
  if (ext && audioExts.includes(ext)) return "audio"  
  return "image"
}

type MediaProps = {
  src?: string
  type?: MediaType
  alt?: string
  class?: string
  autoplay?: boolean
  controls?: boolean
  loop?: boolean
  muted?: boolean
  poster?: string
}

const Media = (props: MediaProps) => {
  const [local, others] = splitProps(props, [
    "src", "type", "alt", "class", "autoplay", "controls", "loop", "muted", "poster"
  ])
  
  const collectionItem = useCollectionItem()
  const mediaItem = () => collectionItem?.item as MediaItemProps | undefined
  
  const src = () => local.src ?? mediaItem()?.url
  const alt = () => local.alt ?? mediaItem()?.alt
  const type = () => local.type ?? mediaItem()?.type ?? detectMediaType(src())

  return (
    <Switch fallback={
      <Image class={cn("size-full", local.class)} {...others}>
        <ImageImg src={src()} alt={alt() ?? ""} class="size-full object-cover" />
        <ImageFallback>
          <img src={src()} alt={alt() ?? ""} class="size-full object-cover" />
        </ImageFallback>
      </Image>
    }>
      <Match when={type() === "video"}>
        <Video
          src={src()}
          class={local.class}
          autoplay={local.autoplay}
          controls={local.controls}
          loop={local.loop}
          muted={local.muted}
          poster={local.poster}
          {...others}
        />
      </Match>
      <Match when={type() === "audio"}>
        <Audio
          src={src()}
          class={local.class}
          autoplay={local.autoplay}
          controls={local.controls}
          loop={local.loop}
          muted={local.muted}
          {...others}
        />
      </Match>
    </Switch>
  )
}

export { Media, detectMediaType }
export type { MediaType, MediaProps }
