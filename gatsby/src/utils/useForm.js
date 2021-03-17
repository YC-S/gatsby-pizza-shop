import { useState } from 'react'

const useForm = (defaults) => {
  const [values, setValues] = useState(defaults)

  function updateValue(e) {
    const { value } = e.target
    if (e.target.type === 'number') {
      value = parseInt(value)
    }
    setValues({
      ...values,
      [e.target.name]: value,
    })
  }
  return { values, updateValue }
}

export default useForm
