import { useRef, useEffect } from 'react'

const useForm = ({ handleSubmit }) => {
    const formRef = useRef(null)

    useEffect(() => {
        const form = formRef.current

        const handleKeyDown = event => {
            if (event.keyCode === 13 && !event.shiftKey) {
                event.preventDefault()
                handleSubmit(event)
            }
        }

        form.addEventListener('keydown', handleKeyDown)

        return () => {
            form.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleSubmit])

    return { formRef }
}

export default useForm
