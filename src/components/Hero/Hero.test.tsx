import { render, screen } from '@testing-library/react'
import Hero from '.'

test('Mostra o botão da hero', () => {
    render(<Hero />)

    const link = screen.getByRole('link', { name: /instagram/i })

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute(
        'href',
        'https://www.instagram.com/cidadeclipse/'
    )
    expect(link).toHaveAttribute(
        'target',
        '_blank'
    )
})
