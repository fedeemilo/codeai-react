import { useRef, useEffect } from 'react'
import './chat-stripe.css'
import { ThreeDots } from 'react-loader-spinner'

import bot from '../../assets/bot.svg'
import user from '../../assets/user.svg'

const ChatStripe = ({
    isAi,
    value,
    isNew,
    isLoading,
    isImageSearch,
    images
}) => {
    const botResponseRef = useRef(null)
    const imgsRef = useRef(null)

    const typingPromises = (message, timeout) =>
        [...message].map(
            (_, i) =>
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve(message.substring(0, i + 1))
                    }, timeout * i)
                })
        )

    useEffect(() => {
        if (images?.bot && imgsRef.current) {
            imgsRef.current.scrollTop = imgsRef.current.scrollHeight
        }
    }, [images])

    if (isAi && isNew)
        typingPromises(value, 20).forEach(promise => {
            promise.then(portion => {
                botResponseRef.current.innerHTML = portion
                botResponseRef.current.scrollTop =
                    botResponseRef.current.scrollHeight
            })
        })

    if (value)
        return (
            <div className={`wrapper ${isAi && 'ai'}`}>
                <div className="chat">
                    <div className="profile">
                        <img
                            src={`${isAi ? bot : user}`}
                            alt={`${isAi ? 'bot' : 'user'}...`}
                        />
                    </div>
                    {!isLoading ? (
                        <>
                            {!isImageSearch && (
                                <div className="message">
                                    {isAi ? (
                                        <div ref={botResponseRef}></div>
                                    ) : (
                                        value
                                    )}
                                </div>
                            )}
                            <div ref={imgsRef} className="generated-imgs">
                                {isImageSearch &&
                                    images?.bot?.map(img => (
                                        <img
                                            className="img-gen"
                                            src={img.url}
                                        />
                                    ))}
                            </div>
                        </>
                    ) : (
                        <ThreeDots
                            height="30"
                            width="30"
                            radius="9"
                            color="#dcdcdc"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{
                                margin: '.3rem 0 0 0'
                            }}
                            wrapperClassName=""
                            visible={true}
                        />
                    )}
                </div>
            </div>
        )
}

export default ChatStripe
