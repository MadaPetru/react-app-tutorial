import {render, screen} from '@testing-library/react';
import Square from "./Square";
import userEvent from "@testing-library/user-event";

test('renders square component', () => {
    render(<Square value={'X'}/>);

    const valueOfButton = screen.getByText('X');

    expect(valueOfButton).toBeInTheDocument();
});

test('click on square component should set value for the button', async () => {
    const mockClickEvent = jest.fn();

    render(<Square value={'X'} onClick={mockClickEvent}/>);

    await userEvent.click(screen.getByText('X'));
    expect(mockClickEvent).toHaveBeenCalled();
});
