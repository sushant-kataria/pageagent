import { Suspense, lazy } from 'react'

import { useDocumentTitle } from '@/lib/useDocumentTitle'

import HeroSection from './HeroSection'

const FeaturesSection = lazy(() => import('./FeaturesSection'))
const ScenariosSection = lazy(() => import('./ScenariosSection'))
const OneMoreThingSection = lazy(() => import('./OneMoreThingSection'))

export default function HomePage() {
	useDocumentTitle()

	return (
		<>
			<HeroSection />
			<Suspense
				fallback={
					<div className="flex items-center justify-center gap-3 py-20 text-[var(--muted-foreground)]">
						<div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--connect-accent-deep)] border-t-transparent" />
						Loading...
					</div>
				}
			>
				<FeaturesSection />
				<ScenariosSection />
				<OneMoreThingSection />
			</Suspense>
		</>
	)
}
