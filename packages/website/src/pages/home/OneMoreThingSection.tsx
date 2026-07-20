import { Link } from 'wouter'

import { BlurFade } from '../../components/ui/blur-fade'
import { useLanguage } from '../../i18n/context'
import { SITE } from '../../site'

export default function OneMoreThingSection() {
	const { isZh } = useLanguage()

	return (
		<section className="px-5 py-20 sm:px-6" aria-labelledby="start-heading">
			<div className="mx-auto max-w-6xl">
				<BlurFade inView>
					<p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--connect-accent-deep)] dark:text-[var(--connect-accent)]">
						{isZh ? '开始' : 'Get started'}
					</p>
					<h2
						id="start-heading"
						className="max-w-2xl text-3xl font-extrabold tracking-[-0.03em] text-[var(--foreground)] sm:text-4xl"
						style={{ fontFamily: 'var(--font-brand)' }}
					>
						{isZh ? '一条命令打开 Connect。' : 'One command opens Connect.'}
					</h2>
					<p className="mt-4 max-w-2xl text-base text-[var(--muted-foreground)] sm:text-lg">
						{isZh
							? '克隆本仓库后本地启动控制台，或直接看文档接入 page-agent。'
							: 'Clone this repo, start the console locally, or jump straight into the docs.'}
					</p>
				</BlurFade>

				<BlurFade inView delay={0.08}>
					<pre className="mt-10 overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--connect-ink)] p-5 text-sm leading-7 text-[var(--connect-mist)] sm:p-6">
						<code>
							<span className="text-[var(--connect-accent)]">npm</span> install{'\n'}
							<span className="text-[var(--connect-accent)]">npm</span> start{'\n'}
							<span className="text-white/35">{'// → http://localhost:5173'}</span>
						</code>
					</pre>
				</BlurFade>

				<BlurFade inView delay={0.12}>
					<div className="mt-8 flex flex-wrap gap-3">
						<Link
							href="/docs/introduction/quick-start"
							className="inline-flex items-center justify-center rounded-xl bg-[var(--connect-ink)] px-5 py-3 text-sm font-semibold text-[var(--connect-accent)] transition hover:brightness-110 dark:bg-[var(--connect-accent)] dark:text-[var(--connect-ink)]"
						>
							{isZh ? '阅读文档' : 'Read the docs'}
						</Link>
						<a
							href={SITE.github}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center justify-center rounded-xl border border-[var(--border)] px-5 py-3 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--connect-accent-deep)]"
						>
							{isZh ? '查看仓库' : 'View repository'}
						</a>
						<Link
							href="/docs/features/chrome-extension"
							className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium text-[var(--muted-foreground)] underline-offset-4 hover:text-[var(--foreground)] hover:underline"
						>
							{isZh ? '可选：浏览器扩展' : 'Optional: browser extension'}
						</Link>
					</div>
				</BlurFade>
			</div>
		</section>
	)
}
