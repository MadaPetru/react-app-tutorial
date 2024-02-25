import {render, screen} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import SquareHighLighted from "./SquareHighLighted";

test('renders square component', () => {
    render(<SquareHighLighted value={'X'}/>);

    const valueOfButton = screen.getByText('X');

    expect(valueOfButton).toBeInTheDocument();
});

test('click on square component should set value for the button', async () => {
    const mockClickEvent = jest.fn();

    render(<SquareHighLighted value={'X'} onClick={mockClickEvent}/>);

    await userEvent.click(screen.getByText('X'));
    expect(mockClickEvent).toHaveBeenCalled();
});
