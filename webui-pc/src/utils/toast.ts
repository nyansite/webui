import { ToastServiceMethods } from "primevue";

// primevue规定toast只能在vue setup中使用
export function showToast(toast: ToastServiceMethods, severity: string, summary: string, detail: string) {
  toast.add({
    severity,
    summary,
    detail,
    life: 3000,
  })
}