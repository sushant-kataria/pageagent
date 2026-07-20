/** Fork-owned site identity (not upstream Alibaba Pages). */
export const SITE = {
	/** Primary product name shown in UI */
	name: 'WebPilot',
	/** Full product name when the Connect console is implied */
	fullName: 'WebPilot Connect',
	tagline: 'Ship an in-page AI agent. Connect models in one command.',
	/** Upstream npm library this product is built on */
	libraryName: 'page-agent',
	libraryNpm: 'page-agent',
	github: 'https://github.com/sushant-kataria/pageagent',
	githubApi: 'https://api.github.com/repos/sushant-kataria/pageagent',
	termsUrl: 'https://github.com/sushant-kataria/pageagent/blob/main/docs/terms-and-privacy.md',
	termsDemoUrl:
		'https://github.com/sushant-kataria/pageagent/blob/main/docs/terms-and-privacy.md#2-testing-api-and-demo-disclaimer--terms-of-use',
	/** Vite / wouter base path for GitHub Pages project site */
	basePath: '/pageagent',
	url: 'https://sushant-kataria.github.io/pageagent',
	upstream: 'https://github.com/alibaba/page-agent',
} as const
