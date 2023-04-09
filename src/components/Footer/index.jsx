import { footerIcons } from './constants'
import './footer.css'

const Footer = () => {
    return (
        <footer>
            <p>© fedmilo 2023</p>

            {footerIcons.map(ic => (
                <a href={ic.src} target="_blank">
                    {ic.icon}
                </a>
            ))}
        </footer>
    )
}

export default Footer
