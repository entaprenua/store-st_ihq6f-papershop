type MediaType = "image" | "video" | "audio" | "document" | "file"

type MediaVariants = {
  thumbnail?: { url: string; width: number; height: number }
  small?: { url: string; width: number; height: number }
  medium?: { url: string; width: number; height: number }
  large?: { url: string; width: number; height: number }
}

type MediaItemProps = {
  id: string
  url: string
  type?: MediaType
  mimeType?: string
  sizeBytes?: number
  width?: number
  height?: number
  alt?: string
  variants?: MediaVariants
  isPrimary?: boolean
  displayOrder?: number
  insertedAt?: string
  updatedAt?: string
}

export type { MediaType, MediaVariants, MediaItemProps }
