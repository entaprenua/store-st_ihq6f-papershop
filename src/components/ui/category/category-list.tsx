import { splitProps, type JSX, For, createMemo } from "solid-js"
import { Collection, CollectionView } from "../collection"
import { useParentCategoryId } from "./category-context"
import { categoriesApi } from "~/lib/api/categories"
import { useCurrentStoreId } from "~/lib/stores/store-context"
import type { Category } from "~/lib/types"

export type CategoryItemsProps = {
  storeId?: string
  page?: number
  pageSize?: number
  queryKey?: unknown[]
  enabled?: boolean
  errorFallback?: JSX.Element
  loadingFallback?: JSX.Element
  children?: JSX.Element
}

export const CategoryItems = (props: CategoryItemsProps) => {
  const [local] = splitProps(props, [
    "storeId",
    "page",
    "pageSize",
    "queryKey",
    "enabled",
    "errorFallback",
    "loadingFallback",
    "children",
  ])

  const contextStoreId = useCurrentStoreId()

  const resolvedStoreId = createMemo(() => local.storeId ?? contextStoreId())

  const queryFn = async (): Promise<Category[] | null> => {
    const storeId = resolvedStoreId()
    if (!storeId) return null

    const response = await categoriesApi.getRoot(storeId)
    return response.content
  }

  const key = ["categories", "root", resolvedStoreId()]

  return (
    <Collection
      queryFn={queryFn}
      queryKey={local.queryKey ?? key}
      enabled={local.enabled ?? true}
      loadingFallback={local.loadingFallback ?? <DefaultCategoryListLoading />}
      errorFallback={local.errorFallback}
    >
      {local.children}
    </Collection>
  )
}

export type SubcategoryItemsProps = {
  storeId?: string
  page?: number
  pageSize?: number
  queryKey?: unknown[]
  enabled?: boolean
  errorFallback?: JSX.Element
  loadingFallback?: JSX.Element
  children?: JSX.Element
}

export const SubcategoryItems = (props: SubcategoryItemsProps) => {
  const [local] = splitProps(props, [
    "storeId",
    "page",
    "pageSize",
    "queryKey",
    "enabled",
    "errorFallback",
    "loadingFallback",
    "children",
  ])

  const contextStoreId = useCurrentStoreId()
  const parentCategoryId = useParentCategoryId()

  const resolvedStoreId = createMemo(() => local.storeId ?? contextStoreId())

  const queryFn = async (): Promise<Category[] | null> => {
    const storeId = resolvedStoreId()
    const parentId = parentCategoryId
    if (!storeId || !parentId) return []

    const page = local.page ?? 0
    const size = local.pageSize ?? 20

    const response = await categoriesApi.getByParent(storeId, parentId, page, size)
    return response.content
  }

  const key = parentCategoryId
    ? ["categories", "children", resolvedStoreId(), parentCategoryId]
    : ["categories", "children", "no-parent"]

  return (
    <Collection
      queryFn={queryFn}
      queryKey={local.queryKey ?? key}
      enabled={local.enabled ?? (parentCategoryId !== undefined)}
      loadingFallback={local.loadingFallback ?? <DefaultCategoryListLoading />}
      errorFallback={local.errorFallback}
    >
      {local.children}
    </Collection>
  )
}

const DefaultCategoryListLoading = () => (
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    <For each={[1, 2, 3, 4, 5, 6, 7, 8]}>
      {() => (
        <div class="animate-pulse space-y-3 p-4 border rounded-lg">
          <div class="h-24 bg-muted rounded-md" />
          <div class="h-4 bg-muted rounded w-3/4" />
          <div class="h-3 bg-muted rounded w-1/2" />
        </div>
      )}
    </For>
  </div>
)

export type CategoryItemsViewProps = {
  class?: string
  children?: JSX.Element | ((item: Category, index: number) => JSX.Element)
}

export const CategoryItemsView = (props: CategoryItemsViewProps) => {
  const [local] = splitProps(props, ["class", "children"])

  return (
    <CollectionView class={local.class}>
      {local.children}
    </CollectionView>
  )
}

export type CategoryItemsEmptyProps = {
  class?: string
  children?: JSX.Element
}

export const CategoryItemsEmpty = (props: CategoryItemsEmptyProps) => {
  const [local] = splitProps(props, ["class", "children"])

  return (
    <div class={local.class}>
      {local.children ?? <DefaultCategoryListEmpty />}
    </div>
  )
}

const DefaultCategoryListEmpty = () => (
  <div class="flex flex-col items-center justify-center min-h-[30vh] gap-2">
    <span class="text-muted-foreground text-lg">No categories found</span>
  </div>
)
