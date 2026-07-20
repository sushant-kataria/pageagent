import type { PageAgent as PageAgentType } from 'page-agent'
import { useEffect, useState } from 'react'
import { Link } from 'wouter'

import { CDN_DEMO_URL, DEMO_BASE_URL, DEMO_MODEL } from '../../constants'
import { useLanguage } from '../../i18n/context'
import { SITE } from '../../site'

let pageAgentModule: Promise<typeof import('page-agent')> | null = null

export default function HeroSection() {
	const { language, isZh } = useLanguage()

	const defaultTask = isZh
		? '从导航栏进入文档，打开「快速开始」，总结成 markdown'
		: 'Open Docs in the nav, find Quick Start, and summarize in markdown'

	const [task, setTask] = useState(() => defaultTask)
	const [prevDefaultTask, setPrevDefaultTask] = useState(defaultTask)
	if (prevDefaultTask !== defaultTask) {
		setPrevDefaultTask(defaultTask)
		setTask(defaultTask)
	}

	const [ready, setReady] = useState(false)
	useEffect(() => {
		pageAgentModule ??= import('page-agent')
		pageAgentModule.then(() => setReady(true))
	}, [])

	const handleExecute = async () => {
		if (!task.trim() || !ready || !pageAgentModule) return

		const { PageAgent } = await pageAgentModule
		const win = window as any

		if (!win.pageAgent || win.pageAgent.disposed) {
			win.pageAgent = new (PageAgent as typeof PageAgentType)({
				interactiveBlacklist: [document.getElementById('root')!],
				language,
				instructions: {
					system: `You are a helpful assistant on the ${SITE.fullName} website.`,
					getPageInstructions: (url: string) =>
						url.includes('pageagent') || url.includes('page-agent')
							? `This is the ${SITE.fullName} demo page.`
							: undefined,
				},
				model:
					import.meta.env.DEV && import.meta.env.LLM_MODEL_NAME
						? import.meta.env.LLM_MODEL_NAME
						: DEMO_MODEL,
				baseURL:
					import.meta.env.DEV && import.meta.env.LLM_BASE_URL
						? import.meta.env.LLM_BASE_URL
						: DEMO_BASE_URL,
				apiKey:
					import.meta.env.DEV && import.meta.env.LLM_API_KEY
						? import.meta.env.LLM_API_KEY
						: undefined,
			})
		}

		await win.pageAgent.execute(task)
	}

	const bookmarklet = encodeURI(
		`javascript:(function(){var s=document.createElement('script');s.src=\`${CDN_DEMO_URL}?lang=${isZh ? 'zh-CN' : 'en-US'}&t=\${Math.random()}\`;s.setAttribute('crossorigin','anonymous');s.type='text/javascript';document.body.appendChild(s);})();`
	)

	return (
		<section
			className="relative isolate min-h-[min(100svh,920px)] overflow-hidden"
			aria-labelledby="hero-heading"
		>
			{/* Full-bleed product visual */}
			<div className="absolute inset-0 -z-10" aria-hidden="true">
				<img
					src={`${SITE.basePath}/brand/hero.png`}
					alt=""
					className="h-full w-full object-cover object-center scale-[1.02] animate-[connect-float_12s_ease-in-out_infinite]"
				/>
				<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,20,18,0.55)_0%,rgba(12,20,18,0.72)_42%,rgba(12,20,18,0.92)_100%)]" />
				<div className="absolute inset-0 bg-[radial-gradient(900px_480px_at_70%_20%,rgba(214,255,75,0.22),transparent_60%)]" />
			</div>

			<div className="mx-auto flex min-h-[min(100svh,920px)] max-w-6xl flex-col justify-end px-5 pb-10 pt-24 sm:px-6 sm:pb-14 lg:justify-center lg:pb-20 lg:pt-28">
				<div className="max-w-2xl text-left text-[#eef6ef]">
					<p
						className="connect-rise mb-5 text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl lg:text-6xl"
						style={{ fontFamily: 'var(--font-brand)' }}
					>
						{SITE.name}{' '}
						<span
							className="bg-[linear-gradient(90deg,#d6ff4b,#efffb0,#ff8f6b,#d6ff4b)] bg-[length:200%_100%] bg-clip-text text-transparent"
							style={{ animation: 'connect-sheen 6s linear infinite' }}
						>
							Connect
						</span>
					</p>

					<h1
						id="hero-heading"
						className="connect-rise connect-rise-delay-1 text-2xl font-semibold leading-snug tracking-[-0.02em] text-[#f7faf7] sm:text-3xl lg:text-[2.15rem]"
						style={{ fontFamily: 'var(--font-brand)' }}
					>
						{isZh ? '把 AI 操作员装进你的网页。' : 'Ship an in-page AI agent.'}
					</h1>

					<p className="connect-rise connect-rise-delay-2 mt-4 max-w-xl text-base leading-relaxed text-[rgba(216,235,224,0.82)] sm:text-lg">
						{isZh
							? '用自然语言控制任意 Web UI。登录模型提供商，一键导出集成片段。'
							: 'Natural-language control for any web UI. Log in providers, pick a model, export a one-line integration.'}
					</p>

					<div className="connect-rise connect-rise-delay-3 mt-8 flex flex-wrap items-center gap-3">
						<Link
							href="/docs/introduction/quick-start"
							className="inline-flex items-center justify-center rounded-xl bg-[var(--connect-accent)] px-5 py-3 text-sm font-semibold text-[var(--connect-ink)] transition hover:brightness-105"
						>
							{isZh ? '快速开始' : 'Quick start'}
						</Link>
						<a
							href={SITE.github}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-[#eef6ef] backdrop-blur-sm transition hover:border-[var(--connect-accent)]/50 hover:bg-white/10"
						>
							GitHub
						</a>
						<a
							href={bookmarklet}
							className="inline-flex cursor-grab items-center justify-center rounded-xl border border-dashed border-[var(--connect-accent)]/55 px-4 py-3 text-xs font-medium text-[var(--connect-accent)]"
							draggable
							onClick={(e) => e.preventDefault()}
							title={
								isZh ? '拖到书签栏，在其他网站试用' : 'Drag to bookmarks to try on other sites'
							}
						>
							{isZh ? '书签试用' : 'Bookmarklet'}
						</a>
					</div>
				</div>

				{/* Interactive try panel — only interactive surface in hero */}
				<div className="connect-rise connect-rise-delay-3 mt-10 w-full max-w-2xl rounded-2xl border border-white/12 bg-[rgba(18,32,28,0.72)] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-5">
					<label
						htmlFor="connect-demo-task"
						className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-[rgba(216,235,224,0.55)]"
					>
						{isZh ? '在此页试用' : 'Try on this page'}
					</label>
					<div className="relative">
						<input
							id="connect-demo-task"
							value={task}
							onChange={(e) => setTask(e.target.value)}
							placeholder={isZh ? '描述你希望 AI 执行的任务…' : 'Describe a task for the agent…'}
							className="w-full rounded-xl border border-white/10 bg-[rgba(12,20,18,0.65)] px-4 py-3 pr-24 text-sm text-[#eef6ef] placeholder:text-white/35 outline-none ring-[var(--connect-accent)] focus:ring-2"
							data-page-agent-not-interactive
						/>
						<button
							type="button"
							onClick={handleExecute}
							disabled={!ready}
							className="absolute right-2 top-2 rounded-lg bg-[var(--connect-accent)] px-4 py-1.5 text-sm font-semibold text-[var(--connect-ink)] transition enabled:hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
							data-page-agent-not-interactive
						>
							{ready ? (isZh ? '运行' : 'Run') : isZh ? '准备中…' : '…'}
						</button>
					</div>
					<p className="mt-2 text-left text-[11px] leading-relaxed text-[rgba(216,235,224,0.5)]">
						{isZh
							? '使用免费测试 API。点击即表示同意'
							: 'Uses the free testing API. By running you agree to the'}{' '}
						<a
							href={SITE.termsDemoUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="underline"
						>
							{isZh ? '使用条款' : 'Terms'}
						</a>
						.
					</p>
				</div>
			</div>
		</section>
	)
}
