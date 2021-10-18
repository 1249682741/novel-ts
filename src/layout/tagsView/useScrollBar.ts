
import {computed, ref} from 'vue'

// 由于这个scrollbarRef 与dom元素中的ref重名。 
// 在onMounted后， 这个值可相当于v2.6的 this.$ref.scrollbar
export const scrollbarRef = ref()
const scrollWrapper = computed(() => scrollbarRef.value.wrap as HTMLElement)

export function handleWheelScroll (e: WheelEvent) {
  const eventDelta = (e as any).wheelDelta || -e.deltaY * 40
  scrollWrapper.value.scrollLeft = scrollWrapper.value.scrollLeft + eventDelta / 4
}

export function handleScroll(cb: Function) {
  return () => {
    cb()
  }
}

const tagSpacing = 4

export function moveToTarget(currentTag: HTMLElement, tagList: HTMLElement[]){
  const container = scrollbarRef.value.$el as HTMLElement
  const containerWidth = container.offsetWidth

  let firstTag = null
  let lastTag = null

  // find first tag and last tag
  if (tagList.length > 0) {
    firstTag = tagList[0]
    lastTag = tagList[tagList.length - 1]
  }

  if (firstTag === currentTag) {
    scrollWrapper.value.scrollLeft = 0
  } else if (lastTag === currentTag) {
    scrollWrapper.value.scrollLeft = scrollWrapper.value.scrollWidth - containerWidth
  } else {
    // find preTag and nextTag
    const currentIndex = [].slice.call(tagList).findIndex((item) => item === currentTag)
    const prevTag = tagList[currentIndex - 1]
    const nextTag = tagList[currentIndex + 1]
    // the tag's offsetLeft after of nextTag
    const afterNextTagOffsetLeft = nextTag.offsetLeft + nextTag.offsetWidth + tagSpacing
    // the tag's offsetLeft before of prevTag
    const beforePrevTagOffsetLeft = prevTag.offsetLeft - tagSpacing

    if (afterNextTagOffsetLeft > scrollWrapper.value.scrollLeft + containerWidth) {
      scrollWrapper.value.scrollLeft = afterNextTagOffsetLeft - containerWidth
    } else if (beforePrevTagOffsetLeft < scrollWrapper.value.scrollLeft) {
      scrollWrapper.value.scrollLeft = beforePrevTagOffsetLeft
    }
  }
}