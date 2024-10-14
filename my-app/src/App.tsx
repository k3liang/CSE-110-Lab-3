import React, {
    FormEventHandler,
    ReactElement,
    ReactEventHandler,
} from "react";
import logo from "./logo.svg";
import "./App.css";
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constant"; // Import the dummyNotesList from the appropriate module

import ClickCounter from "./hooksExercise";

import { themes } from "./themes";

import { useState, useEffect } from "react";

function App() {
    const [lightTheme, setLightTheme] = useState(true);

    const [notes, setNotes] = useState(dummyNotesList);
    const initialNote = {
        id: -1,
        title: "",
        content: "",
        label: Label.personal,
        liked: false,
    };
    const [createNote, setCreateNote] = useState(initialNote);

    useEffect(() => {
        notes.forEach((note) => {
            const elem: HTMLElement = document.getElementById(
                "Button" + note.id
            ) as HTMLElement;
            const noteIndex = notes.findIndex((n) => n.id === note.id);
            elem.innerHTML = notes[noteIndex].liked ? "❤️" : "🤍";
        });
    }, [notes]);

    useEffect(() => {
        if (lightTheme) {
            document.body.style.backgroundColor = "lightgrey";
        } else {
            document.body.style.backgroundColor = "#082375";
        }
    }, [lightTheme]);

    function createNoteHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setCreateNote({
            ...createNote,
            id: notes.length + 1,
        });

        console.log(createNote.liked);
        setNotes([...notes, createNote]);
    }

    const deleteNoteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        const delButton: HTMLButtonElement = e.target as HTMLButtonElement;
        const delId: number = delButton.value as unknown as number;
        const notesBefore = notes.filter((note) => note.id < delId);
        let notesAfter = notes.filter((note) => note.id > delId);
        notesAfter = notesAfter.map((note) => ({ ...note, id: note.id - 1 }));
        setNotes(notesBefore.concat(notesAfter));
    };

    /*useEffect(() => {
        console.log(notes);
    }, [notes]);*/

    /*
    const handleUpdate = (e: React.FormEvent) => {
        const elem: HTMLElement = e.target as HTMLElement;
        const noteID: number = +elem.className;

        const noteIndex = notes.findIndex((note)=>note.id === noteID);
        notes[noteIndex] = {...notes[noteIndex]};
        setNotes(notes);
    };
    */

    function FavoriteButton(id: number) {
        const noteIndex = notes.findIndex((note) => note.id === id);
        /*useEffect(() => {
        document.getElementById("Fav" + id).innerHTML = ❤️;
      }, [fav]);*/
        /*useEffect(()=>{
            const elem:HTMLElement = document.getElementById("Button" + id) as HTMLElement;
            elem.innerHTML = notes[noteIndex].liked ? "❤️" : "🤍";
        },[notes]);*/

        const handleClick = () => {
            notes[noteIndex] = {
                ...notes[noteIndex],
                liked: !notes[noteIndex].liked,
            };
            setNotes(notes.concat([]));
        };

        return (
            <button onClick={handleClick} id={"Button" + id}>
                🤍
            </button>
        );
    }

    const FavList = () => {
        return (
            <div style={lightTheme ? { color: "black" } : { color: "white" }}>
                <h2>List of Favorites:</h2>
                {notes
                    .filter((note) => note.liked)
                    .map((note) => (
                        <p>{note.title}</p>
                    ))}
            </div>
        );
    };

    const ToggleTheme = () => {
        const toggleTheme = () => {
            setLightTheme(!lightTheme);
        };

        return (
            <div>
                <button onClick={toggleTheme}> Toggle Theme </button>
            </div>
        );
    };

    return (
        <div
            className="app-container"
            style={
                lightTheme
                    ? { background: "lightgrey" }
                    : { background: "#082375" }
            }
        >
            <form className="note-form" onSubmit={createNoteHandler}>
                <div>
                    <input
                        placeholder="Note Title"
                        onChange={(event) =>
                            setCreateNote({
                                ...createNote,
                                title: event.target.value,
                            })
                        }
                        required
                        style={
                            lightTheme
                                ? { background: "white" }
                                : { background: "black", color: "white" }
                        }
                    ></input>
                </div>

                <div>
                    <textarea
                        onChange={(event) =>
                            setCreateNote({
                                ...createNote,
                                content: event.target.value,
                            })
                        }
                        required
                        style={
                            lightTheme
                                ? { background: "white" }
                                : { background: "black", color: "white" }
                        }
                    ></textarea>
                </div>

                <div>
                    <select
                        onChange={(event) =>
                            setCreateNote({
                                ...createNote,
                                label: event.target.value as Label,
                            })
                        }
                        required
                        style={
                            lightTheme
                                ? { background: "white" }
                                : { background: "black", color: "white" }
                        }
                    >
                        <option value={Label.personal}>Personal</option>
                        <option value={Label.study}>Study</option>
                        <option value={Label.work}>Work</option>
                        <option value={Label.other}>Other</option>
                    </select>
                </div>

                <div>
                    <button type="submit">Create Note</button>
                </div>

                <ToggleTheme />
            </form>

            <div className="notes-grid">
                {notes.map((note) => (
                    <div
                        key={note.id}
                        className="note-item"
                        style={
                            lightTheme
                                ? { background: "white" }
                                : { background: "black", color: "white" }
                        }
                    >
                        <div className="notes-header">
                            {FavoriteButton(note.id)}
                            <button
                                onClick={deleteNoteHandler}
                                value={note.id}
                                style={
                                    lightTheme
                                        ? { color: "black" }
                                        : {
                                              color: "white",
                                          }
                                }
                            >
                                x
                            </button>
                        </div>
                        <h2 contentEditable="true"> {note.title} </h2>
                        <p contentEditable="true"> {note.content} </p>
                        <p contentEditable="true"> {note.label} </p>
                    </div>
                ))}
            </div>
            <FavList />
        </div>
    );
}

export default App;
