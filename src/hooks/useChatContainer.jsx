import { useState, useRef } from 'react'

const useChatContainer = () => {
    const [messages, setMessages] = useState([])
    const [currentBotId, setCurrentBotId] = useState('')
    const promptElement = useRef(null)

    const generateUniqueId = () => {
        const timestamp = Date.now()
        const randomNumber = Math.random()
        const hexadecimalString = randomNumber.toString(16)

        return `id-${timestamp}-${hexadecimalString}`
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const form = e.currentTarget
        const data = new FormData(form)
        const prompt = data.get('prompt')

        promptElement.current.value = ''
        promptElement.current.focus()

        if (prompt.includes('clear')) {
            setMessages([])
            promptElement.current.focus()
            return
        }
        const uniqueUserId = generateUniqueId()

        const userMessage = {
            id: uniqueUserId,
            text: prompt,
            isUserMessage: true,
            isLoading: false
        }

        const uniqueBotId = generateUniqueId()
        const botMessage = {
            id: uniqueBotId,
            text: '...',
            isUserMessage: false,
            isLoading: true
        }

        setCurrentBotId(uniqueBotId)
        setMessages(prevMessages => [...prevMessages, userMessage, botMessage])

        try {
            const response = await fetch('https://codeai-5wxe.onrender.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt })
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            if (prompt.includes('img:')) {
                const imgRes = await response.json()

                setMessages(prevMessages => {
                    const updatedMessages = prevMessages.map(m => {
                        if (m.id === botMessage.id) {
                            m.isLoading = false
                            m.images = imgRes
                            m.isImageSearch = true
                        }
                        return m
                    })
                    return updatedMessages
                })

                return
            }

            const data = await response.json()
            const answer = data.bot.trim()

            setMessages(prevMessages => {
                const updatedMessages = prevMessages.map(m => {
                    if (m.id === botMessage.id) {
                        m.text = answer
                        m.isLoading = false
                    }
                    return m
                })
                return updatedMessages
            })
        } catch (err) {
            console.error(err)
        }
    }

    return { handleSubmit, messages, promptElement, currentBotId }
}

export default useChatContainer
