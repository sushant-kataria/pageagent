import { BookOpen, Menu, Terminal, X } from 'lucide-react'
import { useState } from 'react'
import { siGithub } from 'simple-icons'
import { Link } from 'wouter'

import { formatStars, useGitHubStars } from '@/hooks/useGitHubStars'
import { useLanguage } from '@/i18n/context'
import { SITE } from '@/site'

import LanguageSwitcher from './LanguageSwitcher'
import ThemeSwitcher from './ThemeSwitcher'

export default function Header() {
	const { isZh } = useLanguage()
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const stars = useGitHubStars()

	return (
		<header
			className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_86%,transparent)] backdrop-blur-md"
			role="banner"
		>
			<div className="mx-auto max-w-6xl px-5 py-3.5 sm:px-6">
				<div className="flex items-center justify-between gap-3">
					<Link
						href="/"
						className="group flex shrink-0 items-center gap-2.5"
						aria-label={isZh ? `${SITE.fullName} 首页` : `${SITE.fullName} home`}
						onClick={() => setMobileMenuOpen(false)}
					>
						<span
							className="h-9 w-9 rounded-xl bg-[linear-gradient(145deg,var(--connect-accent),#efffb0_45%,var(--connect-warm))] shadow-[0_0_0_1px_rgba(159,207,31,0.35),0_10px_24px_rgba(159,207,31,0.18)] transition-transform duration-300 group-hover:scale-105"
							aria-hidden="true"
						/>
						<span className="leading-tight">
							<span
								className="block text-[1.05rem] font-extrabold tracking-[-0.03em] text-[var(--foreground)] sm:text-lg"
								style={{ fontFamily: 'var(--font-brand)' }}
							>
								{SITE.name}{' '}
								<span className="text-[var(--connect-accent-deep)] dark:text-[var(--connect-accent)]">
									Connect
								</span>
							</span>
							<span className="hidden text-[11px] text-[var(--muted-foreground)] sm:block">
								{isZh ? '网页内的 AI 操作员' : 'In-page AI agent'}
							</span>
						</span>
					</Link>

					<nav
						className="hidden items-center gap-1 md:flex"
						role="navigation"
						aria-label={isZh ? '主导航' : 'Primary'}
					>
						<Link
							href="/docs/introduction/quick-start"
							className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-[var(--muted-foreground)] transition-colors hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
						>
							<Terminal className="h-4 w-4" />
							{isZh ? '快速开始' : 'Start'}
						</Link>
						<Link
							href="/docs/introduction/overview"
							className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-[var(--muted-foreground)] transition-colors hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
						>
							<BookOpen className="h-4 w-4" />
							{isZh ? '文档' : 'Docs'}
						</Link>
						<a
							href={SITE.github}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-[var(--muted-foreground)] transition-colors hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
							aria-label="GitHub"
						>
							<svg
								role="img"
								viewBox="0 0 24 24"
								className="h-4 w-4 fill-current"
								aria-hidden="true"
							>
								<path d={siGithub.path} />
							</svg>
							GitHub
							{stars !== null && (
								<span className="tabular-nums text-xs">★ {formatStars(stars)}</span>
							)}
						</a>
						<div className="ml-1 flex items-center gap-1 border-l border-[var(--border)] pl-3">
							<ThemeSwitcher />
							<LanguageSwitcher />
						</div>
					</nav>

					<button
						type="button"
						className="rounded-lg p-2 text-[var(--muted-foreground)] transition-colors hover:bg-[var(--muted)] md:hidden"
						aria-label={isZh ? '打开导航栏' : 'Open navigation'}
						aria-expanded={mobileMenuOpen}
						aria-controls="mobile-menu"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					>
						{mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
					</button>
				</div>

				{mobileMenuOpen && (
					<nav
						id="mobile-menu"
						className="mt-3 space-y-1 border-t border-[var(--border)] pt-3 md:hidden"
						role="navigation"
					>
						<Link
							href="/docs/introduction/overview"
							className="flex items-center gap-2 rounded-lg px-3 py-2 text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
							onClick={() => setMobileMenuOpen(false)}
						>
							<BookOpen className="h-5 w-5" />
							{isZh ? '文档' : 'Docs'}
						</Link>
						<a
							href={SITE.github}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 rounded-lg px-3 py-2 text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
						>
							<svg
								role="img"
								viewBox="0 0 24 24"
								className="h-5 w-5 fill-current"
								aria-hidden="true"
							>
								<path d={siGithub.path} />
							</svg>
							GitHub
							{stars !== null && (
								<span className="text-xs tabular-nums">★ {formatStars(stars)}</span>
							)}
						</a>
						<div className="flex items-center gap-3 px-3 py-2">
							<ThemeSwitcher />
							<LanguageSwitcher />
						</div>
					</nav>
				)}
			</div>
		</header>
	)
}
