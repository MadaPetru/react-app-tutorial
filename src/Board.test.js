import {render, screen} from '@testing-library/react';
import Board from "./Board";
import userEvent from "@testing-library/user-event";

test('renders board component', () => {
    render(<Board squares={[]}/>);

    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(9);
});

test('renders board component when game is ended with a win', async () => {
    render(<Board squares={['X', 'X', 'X', 'O', 'O']} isMatchFinished={true} winnerSquares={[0, 1, 2]}
    />);

    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(9);
});

test('click buttons of board component should call square', async () => {
    const mockClickEvent = jest.fn();

    render(<Board squares={[]} onClick={mockClickEvent}/>);

    const buttons = screen.getAllByRole('button');
    await userEvent.click(buttons[0]);

    expect(mockClickEvent).toHaveBeenCalled();
});

test('click buttons of board component should call square high lighted when math is a win', async () => {
    const mockClickEvent = jest.fn();

    render(<Board squares={['X', 'X', 'X', 'O', 'O']} isMatchFinished={true} winnerSquares={[0, 1, 2]}
                  onClick={mockClickEvent}/>);

    const buttons = screen.getAllByRole('button');
    await userEvent.click(buttons[0]);
    expect(mockClickEvent).toHaveBeenCalled();
});
