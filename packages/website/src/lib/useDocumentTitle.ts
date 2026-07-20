import { useEffect } from 'react'

import { SITE } from '@/site'

const DEFAULT_TITLE = `${SITE.name} — In-page AI agent`

export function useDocumentTitle(title?: string) {
	useEffect(() => {
		document.title = title ? `${title} · ${SITE.name}` : DEFAULT_TITLE
	}, [title])
}
