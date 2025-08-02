import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
    const { pathname } = useLocation()

    useEffect(() => {
        const shouldScrollToTopPaths = ['/store', '/cart', '/profile', '/checkout']

        const shouldScrollToTop = shouldScrollToTopPaths.some((route) =>
            pathname.startsWith(route)
        )

        if (shouldScrollToTop) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }, [pathname])

    return null
}

export default ScrollToTop
