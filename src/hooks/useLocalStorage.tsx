import { useState } from "react"

type Props<T> = {
  key: string
  initialValue?: T
}

export default function useLocalStorage<T = any>({key, initialValue}: Props<T>) {
  const [state, setState] = useState<T>(() => {
    try {
      const value = window.localStorage.getItem(key)
      return value ? JSON.parse(value) : initialValue ?? []
    } catch (error) {
      return []
    }
  })

  const setValue = (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
      setState(value)
    } catch (error) {
    }
  }

  return {state, setValue}
}