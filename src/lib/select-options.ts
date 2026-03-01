export interface SelectOption {
  value: number
  label: string
}

interface OptionSource {
  id?: number
  name?: string
}

export function toSelectOptions(values: OptionSource[] | undefined): SelectOption[] {
  if (!values) {
    return []
  }

  return values.flatMap((value) => {
    if (typeof value.id !== 'number') {
      return []
    }

    if (typeof value.name !== 'string' || value.name.trim().length === 0) {
      return []
    }

    return [{ value: value.id, label: value.name }]
  })
}
