import {
    render,
    screen,
    fireEvent,
    within,
    cleanup,
} from "@testing-library/react";
import { ToDoList } from "./toDoList";

describe("read items in list", () => {
    test("renders list", () => {
        render(<ToDoList />);

        const title = screen.getByText("Items bought: 0");
        expect(title).toBeInTheDocument();
    });

    test("read all items", () => {
        render(<ToDoList />);

        const item1 = screen.getByText("Apples");
        const item2 = screen.getByText("Bananas");

        expect(item1).toBeInTheDocument();
        expect(item2).toBeInTheDocument();
    });
});

describe("check items", () => {

    test("increment checks", () => {
        render(<ToDoList />);

        let title = screen.getByText("Items bought: 0");
        expect(title).toBeInTheDocument();

        const button1 = screen.getByTestId("Apples");
        fireEvent.click(button1);
        title = screen.getByText("Items bought: 1");
        expect(title).toBeInTheDocument();

        expect(button1).toBeChecked;

        const button2 = screen.getByTestId("Bananas");
        fireEvent.click(button2);
        title = screen.getByText("Items bought: 2");
        expect(title).toBeInTheDocument();

        expect(button2).toBeChecked;

        //fireEvent.click(button1);
        //fireEvent.click(button2);
    });

    test("increment then decrement then increment checks", () => {
        render(<ToDoList />);

        let title = screen.getByTestId("title");
        expect(title.innerHTML).toContain("Items bought: 0");

        const button1 = screen.getByTestId("Bananas");
        fireEvent.click(button1);
        title = screen.getByTestId("title");
        expect(title.innerHTML).toContain("Items bought: 1");

        const button2 = screen.getByTestId("Bananas");
        fireEvent.click(button2);
        title = screen.getByTestId("title");
        expect(title.innerHTML).toContain("Items bought: 0");

        const button3 = screen.getByTestId("Apples");
        fireEvent.click(button3);
        title = screen.getByTestId("title");
        expect(title.innerHTML).toContain("Items bought: 1");

        const button4 = screen.getByTestId("Bananas");
        fireEvent.click(button4);
        title = screen.getByTestId("title");
        expect(title.innerHTML).toContain("Items bought: 2");

        /*const button2 = screen.getAllByRole("checkbox")[1];
        fireEvent.click(button2);
        title = screen.getByText("Items bought: 0");
        expect(title).toBeInTheDocument();*/
/*const button3 = screen.getAllByRole("checkbox")[1];
        fireEvent.click(button3);
        title = screen.getByText("Items bought: 1");
        expect(title).toBeInTheDocument();*/
    });
});

