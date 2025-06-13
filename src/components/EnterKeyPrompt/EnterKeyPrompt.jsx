import './EnterKeyPrompt.css'
import { ReactComponent as EnterIcon } from '../../assets/enter-key.svg'

export default function EnterKeyPrompt({ className }) {
    return (
        <EnterIcon id='enter-svg' className={className} />
    )
}