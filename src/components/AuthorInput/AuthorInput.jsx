import './AuthorInput.css'
export default function AuthorInput({ userEntry, setUserEntry }) {
    return (
        <input
        id="author-input" 
        placeholder="Enter an author..." 
        autoComplete="off"
        value={userEntry}
        onChange={e => setUserEntry(e.target.value)}
      />
    )
}