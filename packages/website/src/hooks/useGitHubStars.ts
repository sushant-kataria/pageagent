import { useEffect, useState } from 'react'

import { SITE } from '@/site'

let cached: number | null = null

export function useGitHubStars() {
	const [stars, setStars] = useState(cached)

	useEffect(() => {
		if (cached !== null) return
		const controller = new AbortController()
		fetch(SITE.githubApi, {
			signal: controller.signal,
			headers: { Accept: 'application/vnd.github+json' },
		})
			.then((r) => (r.ok ? r.json() : Promise.reject(new Error(`GitHub API ${r.status}`))))
			.then((data) => {
				cached = typeof data.stargazers_count === 'number' ? data.stargazers_count : null
				setStars(cached)
			})
			.catch(() => {})
		return () => controller.abort()
	}, [])

	return stars
}

export function formatStars(n: number): string {
	if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`
	return String(n)
}
