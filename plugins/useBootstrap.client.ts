// @ts-ignore
import * as bootstrap from 'bootstrap'

export default defineNuxtPlugin(() => {
  /** Modal Instance */
  const modals: any = {}

  const instanceModal = (id: string) => {
    return bootstrap.Modal.getOrCreateInstance(`#${id}`)
  }

  interface Modal {
    show: Function
    hide: Function
    dispose: Function
    toggle: Function
    hideOthers: Function
  }

  const modal: Modal = {
    show(id: string) {
      instanceModal(id).show()
      modals[id] = instanceModal(id)
    },
    hide(id: string) {
      instanceModal(id).hide()
    },
    dispose(id: string) {
      instanceModal(id).dispose()
    },
    toggle(id: string) {
      instanceModal(id).toggle()
    },
    hideOthers(id: string) {
      const keys = Object.keys(modals)

      keys.forEach((key) => {
        if (key !== id) {
          modals[key].hide()
        }
      })
    }
  }
  /** End of Modal Instance */

  /** Toast Instance */
  const toasts: any = {}

  const instanceToast = (id: string) => {
    return bootstrap.Toast.getOrCreateInstance(`#${id}`)
  }

  interface Toast {
    show: Function
  }

  const toast = {
    show(id: string) {
      instanceToast(id).show()
      toasts[id] = instanceToast(id)
    },
  }
  /** End of Toast Instance */

  return {
    provide: {
      bootstrap,
      bModal: modal,
      bToast: toast,
    }
  }
})