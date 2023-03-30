import { useState, useRef, useEffect } from 'react';

export const Notes = () => {
  const [noteData,setNoteData]=useState([])
  const [length, setLength] = useState(0)
  const [notes, setNotes] = useState(noteData)
  let input = useRef()
  const dataFetcher = () => {
    setLength(input.current.value.length)
  }
  const addNote = () => {
    const date = new Date()
    if(input.current.value.length>0){
    setNotes([...notes, {
      text: input.current.value,
      date: date.toLocaleDateString()
    }])
  }
    input.current.value = ""
    setLength(0)
  }
  const deleteNote = (item) => {
    const data = notes.filter((note) =>
      note !== item
    );
    setNotes(data)
  }
  const searchNote = (e) => {
    if(e.target.value!==''){
    const search = notes.filter((item) =>
      item.text.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setNotes(search)
    }else{
      setNotes(noteData)
    }
  }
  useEffect(() => {
    const note = JSON.parse(localStorage.getItem('notes-app'))
    if (note) {
      setNotes(note)
      setNoteData([...noteData,...note])
    }
  }, [])
  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("notes-app", JSON.stringify(notes))
      console.log(noteData)
    }, 300);

  }, [notes]);
  return (
    <>
    <div className="search-bar">
      <input type="search" placeholder="Search here" onChange={searchNote} />
    </div>
      <div className='big-box'>
        <div className="box">
          <textarea onChange={dataFetcher} ref={input}></textarea>
          <div className="editor">
            <p>{length}</p>
            <button onClick={addNote}>Add</button>
          </div>
        </div>
        {
          notes?.map((item, index) =>
            <div className="box box2" key={index}>
              <h5>{item.text}</h5>
              <div className="editor">
                <p>{item?.date}</p>
                <button onClick={() => deleteNote(item)}>Delete</button>
              </div>
            </div>
          )
        }
      </div>
    </>
  )
}