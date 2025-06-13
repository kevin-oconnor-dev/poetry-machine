import './AuthorInput.css'
export default function AuthorInput({ userEntry, setUserEntry, children }) {
    return (
        <input
        id="author-input" 
        placeholder="Enter an author..." 
        autoComplete="off"
        value={userEntry}
        onChange={e => setUserEntry(e.target.value)}
        >
          {children}
        </input>
    )
}