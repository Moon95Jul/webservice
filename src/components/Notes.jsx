import { useState } from 'react';
function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editNoteId, setEditNoteId] = useState(null);
  const [editNoteText, setEditNoteText] = useState('');

  const createNote = () => {
    const note = {
      id: notes.length + 1,
      text: newNote,
      timestamp: new Date().toLocaleString(),
    };
    setNotes([...notes, note]);
    setNewNote('');
  };

  const updateNote = (id) => {
    setNotes(
      notes.map(note =>
        note.id === id ? { ...note, text: editNoteText, timestamp: new Date().toLocaleString(), } : note
      )
    );
    setEditNoteId(null);
    setEditNoteText('');
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div>
      <h2>노트</h2>
      <input
        type="text"
        placeholder="새 메모 입력"
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
      />
      <button onClick={createNote}>메모 추가</button>
      <ul>
      {notes.map(note => (
        <li key={note.id}>
          {editNoteId === note.id ? (
            <div>
              <input
                type="text"
                value={editNoteText}
                onChange={(e) => setEditNoteText(e.target.value)}
              />
              <button onClick={() => updateNote(note.id)}>저장</button>
              <button onClick={() => setEditNoteId(null)}>취소</button>
            </div>
          ) : (
            <div>
              {note.text} <span style={{ fontSize: '0.8em', color: 'gray' }}>({note.timestamp})</span>
              <button onClick={() => {
                setEditNoteId(note.id);
                setEditNoteText(note.text);
              }}>수정</button><button onClick={() => deleteNote(note.id)}>삭제</button>
            </div>
          )}
        </li>
        ))}
        </ul>
    </div>
  );
}

export default Notes;