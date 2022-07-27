import { useState } from 'react'
import Fuse from 'fuse.js'

function Sidebar({ notes, onAddNote, onDeleteNote, activeNote, setActiveNote }) {

    const [query, setQuery] = useState('');
    const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);

    const fuse = new Fuse(notes, {
        keys: [
            'title'
        ],
        includeScore: true
    })

    const results = fuse.search(query);
    const notesResults = query ? results.map(note => note.item) : notes;
    const handleOnSearch = ({ currentTarget = {} }) => {
        const { value } = currentTarget;
        setQuery(value);
    }

    return (
        <div className="app-sidebar">
            <div className="app-sidebar-header">
                <h1>Notes</h1>
                <button onClick={onAddNote}>Add</button>
            </div>
            <div className="app-sidebar-notes">
                <input
                    type="text"
                    className="search-bar"
                    value={query}
                    autoFocus
                    placeholder='Search...'
                    onChange={handleOnSearch}
                />
                {notesResults.map((note) => (
                    <div
                        className={`app-sidebar-note ${note.id === activeNote && "active"}`}
                        onClick={() => setActiveNote(note.id)}>
                        <div className="sidebar-note-title">
                            <strong>{note.title}</strong>
                            <button onClick={() => onDeleteNote(note.id)} >Delete</button>
                        </div>

                        <p>{note.body && note.body.substr(0, 100) + "..."}</p>

                        <small className="note-meta"> Last Modified {new Date(note.lastModified).toLocaleDateString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}</small>

                    </div>
                ))}


            </div>

        </div >

    )
}

export default Sidebar