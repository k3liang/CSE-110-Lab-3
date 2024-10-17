import { render, screen, fireEvent, within } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";

describe("Create and Read StickyNote", () => {
    test("renders create note form", () => {
        render(<StickyNotes />);

        const createNoteButton = screen.getByText("Create Note");
        expect(createNoteButton).toBeInTheDocument();
    });

    test("creates a new note", () => {
        render(<StickyNotes />);

        // Please make sure your sticky note has a title and content input field with the following placeholders.
        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea =
            screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");

        fireEvent.change(createNoteTitleInput, {
            target: { value: "New Note" },
        });
        fireEvent.change(createNoteContentTextarea, {
            target: { value: "Note content" },
        });
        fireEvent.click(createNoteButton);

        const newNoteTitle = screen.getByText("New Note");
        const newNoteContent = screen.getByText("Note content");

        expect(newNoteTitle).toBeInTheDocument();
        expect(newNoteContent).toBeInTheDocument();
    });

    test("create a bunch of distinct notes and read them", () => {
        render(<StickyNotes />);
        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea =
            screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");

        fireEvent.change(createNoteTitleInput, {
            target: { value: "HELLO BOB" },
        });
        fireEvent.change(createNoteContentTextarea, {
            target: { value: "IM JOE" },
        });
        fireEvent.click(createNoteButton);

        const newNoteTitle = screen.getByText("HELLO BOB");
        const newNoteContent = screen.getByText("IM JOE");

        expect(newNoteTitle).toBeInTheDocument();
        expect(newNoteContent).toBeInTheDocument();

        fireEvent.change(createNoteTitleInput, {
            target: { value: "WHATS UP BOB" },
        });
        fireEvent.change(createNoteContentTextarea, {
            target: { value: "WHATS UP JOE" },
        });
        fireEvent.click(createNoteButton);

        const newNoteTitle2 = screen.getByText("WHATS UP BOB");
        const newNoteContent2 = screen.getByText("WHATS UP JOE");

        expect(newNoteTitle).toBeInTheDocument();
        expect(newNoteContent).toBeInTheDocument();
        expect(newNoteTitle2).toBeInTheDocument();
        expect(newNoteContent2).toBeInTheDocument();

        fireEvent.change(createNoteTitleInput, {
            target: { value: "BYE BOB" },
        });
        fireEvent.change(createNoteContentTextarea, {
            target: { value: "BYE JOE" },
        });
        fireEvent.click(createNoteButton);

        const newNoteTitle3 = screen.getByText("BYE BOB");
        const newNoteContent3 = screen.getByText("BYE JOE");

        expect(newNoteTitle).toBeInTheDocument();
        expect(newNoteContent).toBeInTheDocument();
        expect(newNoteTitle2).toBeInTheDocument();
        expect(newNoteContent2).toBeInTheDocument();
        expect(newNoteTitle3).toBeInTheDocument();
        expect(newNoteContent3).toBeInTheDocument();
    });

    test("read dummy notes", () => {
        render(<StickyNotes />);

        const title1 = screen.getByText("test note 1 title");
        const content1 = screen.getByText("test note 1 content");
        const label1 = screen.getByText("other");
        expect(title1).toBeInTheDocument();
        expect(content1).toBeInTheDocument();
        expect(label1).toBeInTheDocument();

        const title2 = screen.getByText("test note 2 title");
        const content2 = screen.getByText("test note 2 content");
        const label2 = screen.getByText("personal");
        expect(title2).toBeInTheDocument();
        expect(content2).toBeInTheDocument();
        expect(label2).toBeInTheDocument();

        const title3 = screen.getByText("test note 3 title");
        const content3 = screen.getByText("test note 3 content");
        const label3 = screen.getByText("work");
        expect(title3).toBeInTheDocument();
        expect(content3).toBeInTheDocument();
        expect(label3).toBeInTheDocument();
    });

    test("create and read duplicate notes", () => {
        render(<StickyNotes />);
        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea =
            screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");

        fireEvent.change(createNoteTitleInput, {
            target: { value: "HELLO BOB" },
        });
        fireEvent.change(createNoteContentTextarea, {
            target: { value: "IM JOE" },
        });
        fireEvent.click(createNoteButton);

        fireEvent.change(createNoteTitleInput, {
            target: { value: "HELLO BOB" },
        });
        fireEvent.change(createNoteContentTextarea, {
            target: { value: "IM JOE" },
        });
        fireEvent.click(createNoteButton);

        const firstNote = within(
            document.getElementsByClassName("note-item")[3] as HTMLElement
        );
        const firstNoteTitle = firstNote.getByText("HELLO BOB");
        const firstNoteContent = firstNote.getByText("IM JOE");
        expect(firstNoteTitle).toBeInTheDocument();
        expect(firstNoteContent).toBeInTheDocument();

        const secondNote = within(
            document.getElementsByClassName("note-item")[4] as HTMLElement
        );
        const secondNoteTitle = firstNote.getByText("HELLO BOB");
        const secondNoteContent = firstNote.getByText("IM JOE");
        expect(secondNoteTitle).toBeInTheDocument();
        expect(secondNoteContent).toBeInTheDocument();
    });
});

describe("update notes", () => {
    test("update dummy note", () => {
        render(<StickyNotes />);

        screen.getByTestId("title 1").innerHTML = "HELLO BOB";
        expect(screen.getByTestId("title 1").innerHTML).toBe("HELLO BOB");

        screen.getByTestId("content 1").innerHTML = "IM JOE";
        expect(screen.getByTestId("title 1").innerHTML).toBe("HELLO BOB");
        expect(screen.getByTestId("content 1").innerHTML).toBe("IM JOE");

        screen.getByTestId("label 1").innerHTML = "WHAT";
        expect(screen.getByTestId("title 1").innerHTML).toBe("HELLO BOB");
        expect(screen.getByTestId("content 1").innerHTML).toBe("IM JOE");
        expect(screen.getByTestId("label 1").innerHTML).toBe("WHAT");
    });

    test("update all dummy notes", () => {
        render(<StickyNotes />);

        screen.getByTestId("title 1").innerHTML = "HELLO BOB";
        expect(screen.getByTestId("title 1").innerHTML).toBe("HELLO BOB");

        screen.getByTestId("title 2").innerHTML = "HELLO JOE";
        expect(screen.getByTestId("title 1").innerHTML).toBe("HELLO BOB");
        expect(screen.getByTestId("title 2").innerHTML).toBe("HELLO JOE");

        screen.getByTestId("title 3").innerHTML = "HELLO SAM";
        expect(screen.getByTestId("title 1").innerHTML).toBe("HELLO BOB");
        expect(screen.getByTestId("title 2").innerHTML).toBe("HELLO JOE");
        expect(screen.getByTestId("title 3").innerHTML).toBe("HELLO SAM");
    });

    test("add note then update that note, then delete that note", ()=> {
        render(<StickyNotes />);

        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea =
            screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");

        fireEvent.change(createNoteTitleInput, {
            target: { value: "HELLO BOB" },
        });
        fireEvent.change(createNoteContentTextarea, {
            target: { value: "IM JOE" },
        });
        fireEvent.click(createNoteButton);

        expect(screen.getByText("HELLO BOB")).toBeInTheDocument();
        expect(screen.getByText("IM JOE")).toBeInTheDocument();

        screen.getByTestId("title 4").innerHTML = "IM NOT BOB";
        screen.getByTestId("content 4").innerHTML = "IM NOT JOE";
        expect(screen.getByTestId("title 4").innerHTML).toBe("IM NOT BOB");
        expect(screen.getByTestId("content 4").innerHTML).toBe("IM NOT JOE");

        expect(screen.queryByText("HELLO BOB")).toBeNull();
        expect(screen.queryByText("IM JOE")).toBeNull();

        const desiredNote = within(
            document.getElementsByClassName("note-item")[3] as HTMLElement
        );
        const firstDel = desiredNote.getByText("x");
        fireEvent.click(firstDel);

        expect(screen.queryByText("HELLO BOB")).toBeNull();
        expect(screen.queryByText("IM JOE")).toBeNull();
        expect(screen.queryByText("IM NOT BOB")).toBeNull();
        expect(screen.queryByText("IM NOT JOE")).toBeNull();
    });
});

describe("delete notes", () => {
    test("delete dummy note", () => {
        render(<StickyNotes />);

        const title1 = screen.getByText("test note 1 title");
        const content1 = screen.getByText("test note 1 content");
        const label1 = screen.getByText("other");
        expect(title1).toBeInTheDocument();
        expect(content1).toBeInTheDocument();
        expect(label1).toBeInTheDocument();

        const firstNote = within(
            document.getElementsByClassName("note-item")[0] as HTMLElement
        );
        const firstDel = firstNote.getByText("x");
        fireEvent.click(firstDel);

        const titleX = screen.queryByText("test note 1 title");
        const contentX = screen.queryByText("test note 1 content");
        const labelX = screen.queryByText("other");
        expect(titleX).toBeNull();
        expect(contentX).toBeNull();
        expect(labelX).toBeNull();
    });

    test("delete all notes", () => {
        render(<StickyNotes />);
        let firstNote = within(
            document.getElementsByClassName("note-item")[0] as HTMLElement
        );
        let firstDel = firstNote.getByText("x");
        fireEvent.click(firstDel);

        firstNote = within(
            document.getElementsByClassName("note-item")[0] as HTMLElement
        );
        firstDel = firstNote.getByText("x");
        fireEvent.click(firstDel);

        firstNote = within(
            document.getElementsByClassName("note-item")[0] as HTMLElement
        );
        firstDel = firstNote.getByText("x");
        fireEvent.click(firstDel);

        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        expect(createNoteTitleInput).toBeInTheDocument();
    });

    test("add then delete note", () => {
        render(<StickyNotes />);
        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea =
            screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");

        fireEvent.change(createNoteTitleInput, {
            target: { value: "HELLO BOB" },
        });
        fireEvent.change(createNoteContentTextarea, {
            target: { value: "IM JOE" },
        });
        fireEvent.click(createNoteButton);

        const title1 = screen.getByText("HELLO BOB");
        const content1 = screen.getByText("IM JOE");
        expect(title1).toBeInTheDocument();
        expect(content1).toBeInTheDocument();

        const desiredNote = within(
            document.getElementsByClassName("note-item")[3] as HTMLElement
        );
        const firstDel = desiredNote.getByText("x");
        fireEvent.click(firstDel);

        const titleX = screen.queryByText("HELLO BOB");
        const contentX = screen.queryByText("IM JOE");
        expect(titleX).toBeNull();
        expect(contentX).toBeNull();
    });

    test("add then delete then add note", () => {
        render(<StickyNotes />);
        let createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        let createNoteContentTextarea =
            screen.getByPlaceholderText("Note Content");
        let createNoteButton = screen.getByText("Create Note");

        fireEvent.change(createNoteTitleInput, {
            target: { value: "HELLO BOB" },
        });
        fireEvent.change(createNoteContentTextarea, {
            target: { value: "IM JOE" },
        });
        fireEvent.click(createNoteButton);

        const title1 = screen.getByText("HELLO BOB");
        const content1 = screen.getByText("IM JOE");
        expect(title1).toBeInTheDocument();
        expect(content1).toBeInTheDocument();

        const desiredNote = within(
            document.getElementsByClassName("note-item")[3] as HTMLElement
        );
        const firstDel = desiredNote.getByText("x");
        fireEvent.click(firstDel);

        const titleX = screen.queryByText("HELLO BOB");
        const contentX = screen.queryByText("IM JOE");
        expect(titleX).toBeNull();
        expect(contentX).toBeNull();

        createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
        createNoteButton = screen.getByText("Create Note");

        fireEvent.change(createNoteTitleInput, {
            target: { value: "WHATS UP BOB" },
        });
        fireEvent.change(createNoteContentTextarea, {
            target: { value: "WHATS UP JOE" },
        });
        fireEvent.click(createNoteButton);

        const title2 = screen.getByText("WHATS UP BOB");
        const content2 = screen.getByText("WHATS UP JOE");
        expect(title2).toBeInTheDocument();
        expect(content2).toBeInTheDocument();
    });
});
