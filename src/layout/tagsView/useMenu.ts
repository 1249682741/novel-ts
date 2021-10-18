import { ref } from "vue";

export const visible = ref(false)

export function closeMenu() {
  visible.value = false
}

export function openMenu(){

}