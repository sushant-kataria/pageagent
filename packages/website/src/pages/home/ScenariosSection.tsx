import { BlurFade } from '../../components/ui/blur-fade'
import { useLanguage } from '../../i18n/context'

const ITEMS_EN = [
	{
		title: 'Product copilots',
		body: 'Give users a natural-language way to operate your SaaS UI — without rewriting the backend.',
	},
	{
		title: 'Guided workflows',
		body: 'Turn dense forms and multi-step flows into a single instruction the agent can execute.',
	},
	{
		title: 'Your models, your keys',
		body: 'BYOK by design. Keys stay in localStorage for Connect; production proxies keep secrets off the client.',
	},
]

const ITEMS_ZH = [
	{
		title: '产品副驾驶',
		body: '让用户用自然语言操作你的 SaaS 界面，无需重写后端。',
	},
	{
		title: '引导式流程',
		body: '把复杂表单和多步流程收成一句指令，交给 Agent 执行。',
	},
	{
		title: '自有模型与密钥',
		body: '默认 BYOK。Connect 密钥存本地；生产环境用同源代理，密钥不上前端。',
	},
]

export default function ScenariosSection() {
	const { isZh } = useLanguage()
	const items = isZh ? ITEMS_ZH : ITEMS_EN

	return (
		<section
			className="border-y border-[var(--border)] px-5 py-20 sm:px-6"
			aria-labelledby="built-for-heading"
			style={{
				background:
					'linear-gradient(180deg, color-mix(in srgb, var(--background) 70%, #dfe9d8) 0%, var(--background) 100%)',
			}}
		>
			<div className="mx-auto max-w-6xl">
				<BlurFade inView>
					<p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--connect-warm)]">
						{isZh ? '适用场景' : 'Built for'}
					</p>
					<h2
						id="built-for-heading"
						className="max-w-xl text-3xl font-extrabold tracking-[-0.03em] text-[var(--foreground)] sm:text-4xl"
						style={{ fontFamily: 'var(--font-brand)' }}
					>
						{isZh
							? '装进页面的操作能力，不是又一个后台。'
							: 'In-page control — not another backend.'}
					</h2>
				</BlurFade>

				<div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
					{items.map((item, i) => (
						<BlurFade key={item.title} inView delay={0.05 * (i + 1)}>
							<article>
								<div
									className="mb-4 h-1 w-12 rounded-full bg-[linear-gradient(90deg,var(--connect-accent-deep),var(--connect-warm))]"
									aria-hidden="true"
								/>
								<h3
									className="text-xl font-bold tracking-[-0.02em] text-[var(--foreground)]"
									style={{ fontFamily: 'var(--font-brand)' }}
								>
									{item.title}
								</h3>
								<p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-[0.95rem]">
									{item.body}
								</p>
							</article>
						</BlurFade>
					))}
				</div>
			</div>
		</section>
	)
}
