import type { ValidComponent } from "solid-js"
import { splitProps, mergeProps } from "solid-js"
import * as ImagePrimitive from "@kobalte/core/image"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import { useProduct } from "./product-context"
 
import { cn } from "~/lib/utils"
 
type ImageRootProps<T extends ValidComponent = "span"> = ImagePrimitive.ImageRootProps<T> & {
  class?: string | undefined
}
 
const Image = <T extends ValidComponent = "span">(
  props: PolymorphicProps<T, ImageRootProps<T>>
) => {
  const [local, others] = splitProps(props as ImageRootProps, ["class"])
  return (
    <ImagePrimitive.Root
      class={cn("relative flex size-10 shrink-0 overflow-hidden", local.class)}
      {...others}
    />
  )
}
 
type ImageImgProps<T extends ValidComponent = "img"> = ImagePrimitive.ImageImgProps<T> & {
  class?: string | undefined
}

const ImageImg = <T extends ValidComponent = "img">(
  props: PolymorphicProps<T, ImageImgProps<T>>
) => {
  const [local, others] = splitProps(props as ImageImgProps, [
    "class", "src",
  ])
  const product = useProduct()
  const src = () => local.src ?? product?.data?.image
  return(
      <ImagePrimitive.Img 
           class={cn("aspect-square size-full", local.class)}
           src={src()}
	   {...others}
     />
  )
}
type ImageFallbackProps<T extends ValidComponent = "span"> =
  ImagePrimitive.ImageFallbackProps<T> & { class?: string | undefined }
 
const ImageFallback = <T extends ValidComponent = "span">(
  props: PolymorphicProps<T, ImageFallbackProps<T>>
) => {
  const [local, others] = splitProps(props as ImageFallbackProps, ["class"])
  return (
    <ImagePrimitive.Fallback
      class={cn("flex size-full items-center justify-center bg-muted", local.class)}
      {...others}
    />
  )
}
 
export { Image, ImageImg,   ImageFallback }
