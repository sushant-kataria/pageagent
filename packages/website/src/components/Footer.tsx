import { siGithub } from 'simple-icons'

import { useLanguage } from '@/i18n/context'
import { SITE } from '@/site'

export default function Footer() {
	const { isZh } = useLanguage()

	return (
		<footer
			className="border-t border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_92%,#c5d9c8)] dark:bg-[var(--card)]"
			role="contentinfo"
		>
			<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-6">
				<div className="text-center text-sm text-[var(--muted-foreground)] sm:text-left">
					<p
						style={{ fontFamily: 'var(--font-brand)' }}
						className="font-bold text-[var(--foreground)]"
					>
						{SITE.fullName}
					</p>
					<p className="mt-1 text-xs">
						{isZh ? '基于' : 'Built on'}{' '}
						<a
							href={SITE.upstream}
							target="_blank"
							rel="noopener noreferrer"
							className="underline decoration-[var(--connect-accent-deep)]/40 underline-offset-2 hover:text-[var(--foreground)]"
						>
							alibaba/page-agent
						</a>
						{' · '}© 2026
					</p>
				</div>

				<div className="flex items-center gap-4">
					<a
						href={SITE.termsUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
					>
						{isZh ? '使用条款与隐私' : 'Terms & Privacy'}
					</a>
					<a
						href={SITE.github}
						target="_blank"
						rel="noopener noreferrer"
						className="text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
						aria-label={isZh ? '访问 GitHub 仓库' : 'Visit GitHub repository'}
					>
						<svg role="img" viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
							<path d={siGithub.path} />
						</svg>
					</a>
				</div>
			</div>
		</footer>
	)
}
