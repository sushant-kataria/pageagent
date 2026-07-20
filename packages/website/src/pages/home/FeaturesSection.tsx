import { BlurFade } from '../../components/ui/blur-fade'
import { useLanguage } from '../../i18n/context'

const STEPS_EN = [
	{
		n: '01',
		title: 'Launch Connect',
		body: 'Run npm start. Open the local console — no account wall, keys stay in your browser.',
	},
	{
		n: '02',
		title: 'Log in a model',
		body: 'DashScope, OpenAI, OpenRouter, DeepSeek, Ollama, LM Studio, or any OpenAI-compatible endpoint.',
	},
	{
		n: '03',
		title: 'Export & ship',
		body: 'Copy a script tag, NPM snippet, or bookmarklet. Drop it into any site and talk to the UI.',
	},
]

const STEPS_ZH = [
	{
		n: '01',
		title: '启动 Connect',
		body: '运行 npm start，打开本地控制台。无需注册，密钥只存在浏览器本地。',
	},
	{
		n: '02',
		title: '登录模型',
		body: '支持百炼、OpenAI、OpenRouter、DeepSeek、Ollama、LM Studio，以及任意 OpenAI 兼容接口。',
	},
	{
		n: '03',
		title: '导出并上线',
		body: '复制脚本标签、NPM 片段或书签。嵌入任意站点，用自然语言操作界面。',
	},
]

export default function FeaturesSection() {
	const { isZh } = useLanguage()
	const steps = isZh ? STEPS_ZH : STEPS_EN

	return (
		<section
			className="relative px-5 py-20 sm:px-6"
			aria-labelledby="how-heading"
			style={{
				background:
					'radial-gradient(800px 420px at 0% 0%, rgba(159,207,31,0.12), transparent 55%), radial-gradient(700px 400px at 100% 20%, rgba(255,143,107,0.1), transparent 50%), var(--background)',
			}}
		>
			<div className="mx-auto max-w-6xl">
				<BlurFade inView>
					<p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--connect-accent-deep)] dark:text-[var(--connect-accent)]">
						{isZh ? '工作流' : 'Workflow'}
					</p>
					<h2
						id="how-heading"
						className="max-w-xl text-3xl font-extrabold tracking-[-0.03em] text-[var(--foreground)] sm:text-4xl"
						style={{ fontFamily: 'var(--font-brand)' }}
					>
						{isZh ? '三步连上模型，装进页面。' : 'Three steps from model login to in-page agent.'}
					</h2>
					<p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted-foreground)] sm:text-lg">
						{isZh
							? 'Connect 是上线前的控制台：选供应商、存密钥、导出集成。'
							: 'Connect is the on-ramp: authenticate providers, save keys locally, export the integration.'}
					</p>
				</BlurFade>

				<ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
					{steps.map((step, i) => (
						<BlurFade key={step.n} inView delay={0.06 * (i + 1)}>
							<li className="relative">
								<span
									className="mb-4 block text-5xl font-extrabold tracking-[-0.06em] text-[color-mix(in_srgb,var(--connect-accent-deep)_35%,transparent)] dark:text-[color-mix(in_srgb,var(--connect-accent)_28%,transparent)]"
									style={{ fontFamily: 'var(--font-brand)' }}
									aria-hidden="true"
								>
									{step.n}
								</span>
								<h3
									className="text-xl font-bold tracking-[-0.02em] text-[var(--foreground)]"
									style={{ fontFamily: 'var(--font-brand)' }}
								>
									{step.title}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-[0.95rem]">
									{step.body}
								</p>
							</li>
						</BlurFade>
					))}
				</ol>
			</div>
		</section>
	)
}
