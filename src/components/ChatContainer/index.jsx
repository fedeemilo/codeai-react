import React from 'react'
import './chat-container.css'

import Form from '../Form'
import ChatStripe from '../ChatStripe'
import useChatContainer from '../../hooks/useChatContainer'

const ChatContainer = () => {
    const { handleSubmit, messages, promptElement, currentBotId } =
        useChatContainer()

    return (
        <>
            <div id="chat_container">
                {messages.map((message, i) => (
                    <ChatStripe
                        key={i}
                        isAi={!message.isUserMessage}
                        value={message.text}
                        isLoading={message.isLoading}
                        isNew={message.id === currentBotId}
                        isImageSearch={message.isImageSearch}
                        images={message.images}
                    />
                ))}
            </div>
            <Form handleSubmit={handleSubmit} promptElement={promptElement} />
        </>
    )
}

export default ChatContainer
