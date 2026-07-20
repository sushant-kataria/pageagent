import { Suspense, lazy, useEffect, useLayoutEffect } from 'react'
import { Route, Switch, useLocation } from 'wouter'

import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './pages/home'

const docsImport = () => import('./pages/docs')
const DocsPages = lazy(docsImport)

function ScrollToTop() {
	const [pathname] = useLocation()
	useLayoutEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])
	return null
}

export default function Router() {
	useEffect(() => {
		if ('requestIdleCallback' in globalThis) {
			const id = requestIdleCallback(() => docsImport())
			return () => cancelIdleCallback(id)
		}
		const id = setTimeout(() => docsImport(), 1)
		return () => clearTimeout(id)
	}, [])

	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<Suspense>
				<ScrollToTop />
				<Switch>
					<Route path="/">
						<main id="main-content" className="connect-home flex-1">
							<HomePage />
						</main>
					</Route>

					<Route path="/docs" nest>
						<div className="flex-1 bg-[var(--background)]">
							<Suspense
								fallback={
									<div className="flex items-center justify-center gap-3 py-20 text-[var(--muted-foreground)]">
										<div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--connect-accent-deep)] border-t-transparent" />
										Loading...
									</div>
								}
							>
								<DocsPages />
							</Suspense>
						</div>
					</Route>

					<Route>
						<div className="flex flex-1 items-center justify-center bg-[var(--background)]">
							<div className="text-center">
								<h1
									className="mb-4 text-4xl font-extrabold text-[var(--foreground)]"
									style={{ fontFamily: 'var(--font-brand)' }}
								>
									404
								</h1>
								<p className="text-lg text-[var(--muted-foreground)]">Page not found</p>
							</div>
						</div>
					</Route>
				</Switch>
			</Suspense>
			<Footer />
		</div>
	)
}
