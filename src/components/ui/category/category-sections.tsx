import { Show, splitProps, type JSX } from "solid-js"
import { useCategory } from "./category-context"
import { cn } from "~/lib/utils"

type CategoryNameProps = {
  class?: string
}

const CategoryName = (props: CategoryNameProps) => {
  const category = useCategory()
  return (
    <span class={props.class}>
      {category.name()}
    </span>
  )
}

type CategoryImageProps = {
  class?: string
  alt?: string
}

const CategoryImage = (props: CategoryImageProps) => {
  const [local] = splitProps(props, ["class", "alt"])
  const category = useCategory()
  const image = () => category.image()
  const alt = () => local.alt ?? category.name() ?? "Category image"

  return (
    <Show when={image()}>
      <img
        src={image()!}
        alt={alt()}
        class={cn("size-full object-cover", local.class)}
      />
    </Show>
  )
}

type CategorySlugProps = {
  class?: string
}

const CategorySlug = (props: CategorySlugProps) => {
  const category = useCategory()
  return (
    <span class={props.class}>
      {category.slug()}
    </span>
  )
}

type CategoryLevelProps = {
  class?: string
}

const CategoryLevel = (props: CategoryLevelProps) => {
  const category = useCategory()
  return (
    <span class={props.class}>
      {category.level()}
    </span>
  )
}

type CategoryDepthProps = {
  class?: string
}

const CategoryDepth = (props: CategoryDepthProps) => {
  const category = useCategory()
  return (
    <span class={props.class}>
      {category.depth()}
    </span>
  )
}

type CategoryPathProps = {
  class?: string
}

const CategoryPath = (props: CategoryPathProps) => {
  const category = useCategory()
  return (
    <span class={props.class}>
      {category.path()}
    </span>
  )
}

type CategoryParentIdProps = {
  class?: string
}

const CategoryParentId = (props: CategoryParentIdProps) => {
  const category = useCategory()
  return (
    <span class={props.class}>
      {category.parentId()}
    </span>
  )
}

export type {
  CategoryNameProps,
  CategoryImageProps,
  CategorySlugProps,
  CategoryLevelProps,
  CategoryDepthProps,
  CategoryPathProps,
  CategoryParentIdProps,
}

export {
  CategoryName,
  CategoryImage,
  CategorySlug,
  CategoryLevel,
  CategoryDepth,
  CategoryPath,
  CategoryParentId,
}
