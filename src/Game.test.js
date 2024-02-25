import {render, screen} from '@testing-library/react';
import Game from "./Game";

test('renders game component', () => {
    render(<Game/>);

    const valueOfNode = screen.getAllByText('Go to game start');

    expect(valueOfNode[0]).toBeInTheDocument();
});

test('click on game component for history position should set travel back in time', async () => {

});
