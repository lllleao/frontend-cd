import { render, screen } from '@testing-library/react'
import Hero from '.'
jest.mock('@/assets/logo-nova/logo3.png', () => ({
    default: 'test-file-stub'
}))

test('Mostra o botão da hero', () => {
    render(<Hero />)

    const link = screen.getByRole('link', { name: /instagram/i })

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute(
        'href',
        'https://www.instagram.com/cidadeclipse/'
    )
    expect(link).toHaveAttribute('target', '_blank')
})
