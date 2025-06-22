import { createSnackbar } from "@snackbar/core"

export function useNormalSnackBar(content: string, action: string) {
  createSnackbar(content, {
    position: 'right',
    timeout: 2000,
    theme: isDark ? 'dark' : 'light',
    actions: [
      {
        text: action,
        style: {
          color: 'pink',
        },
      },
    ],
  })
}

export function useErrorSnackBar(content: string, action: string) {
  createSnackbar(content, {
    position: 'right',
    timeout: 2000,
    theme: {
      backgroundColor: '#c8006a',
    },
    actions: [
      {
        text: action,
        style: {
          color: 'white',
        },
      },
    ],
  })
}