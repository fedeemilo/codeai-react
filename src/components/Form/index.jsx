import './form.css'

import sendImg from '../../assets/send.svg'
import useForm from '../../hooks/useForm'

const Form = ({ handleSubmit, promptElement }) => {
    const { formRef } = useForm({ handleSubmit })

    return (
        <form ref={formRef} onSubmit={handleSubmit}>
            <textarea
                ref={promptElement}
                name="prompt"
                id=""
                cols="1"
                rows="1"
                placeholder="Ask Codeai..."
            ></textarea>
            <button type="submit">
                <img src={sendImg} alt="send" />
            </button>
        </form>
    )
}

export default Form
