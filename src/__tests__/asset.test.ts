jest.mock('@/assets/logo-nova/logo3.png', () => ({ default: 'test-file-stub' }))

// eslint-disable-next-line @typescript-eslint/no-require-imports
const logo = require('@/assets/logo-nova/logo3.png').default

test('image import is stubbed in Jest (inline mock)', () => {
    expect(logo).toBe('test-file-stub')
})
