import './PoemTitle.css';

export default function PoemTitle({ title }) {
    const isLarge = title.length > 35;
    return (
        <h2 id='poem-title' className={isLarge ? 'large-title' : ''}>
            {title}
        </h2>
    )
}