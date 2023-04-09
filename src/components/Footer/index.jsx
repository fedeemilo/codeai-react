import './footer.css'

import { AiFillGithub } from 'react-icons/ai'
import { BsBriefcaseFill } from 'react-icons/bs'

const Footer = () => {
    return (
        <footer>
            <p>© fedmilo 2023</p>

            <a href="https://fedmilo-portfolio.vercel.app" target="_blank">
                <BsBriefcaseFill />
            </a>
            <a href="https://github.com/fedeemilo/codeai-react" target="_blank">
                <AiFillGithub />
            </a>
        </footer>
    )
}

export default Footer
