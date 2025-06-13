import './MainHeading.css';

export default function MainHeading({ textContent, className }) {
    return (
        <h1 id="main-header" className={className}>{textContent}</h1>
    )
}