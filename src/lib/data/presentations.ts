export type Presentation = {
	href: string;
	title: string;
	description: string;
	tags: string[];
};

export const presentations: Record<string, Presentation> = {
	singularity: {
		href: 'https://docs.google.com/presentation/d/13oI7g0TEUP-qpJYMUCxwAGf1cLt_5C5vm29SRwDb2-4/edit?usp=sharing',
		title: 'Singularity',
		description: 'A presentation on the AI Singularity.',
		tags: ['AI', 'Singularity']
	},
	'simulated-annealing': {
		href: 'https://docs.google.com/presentation/d/1DkNU-HYCZAaPuWCQ5SYXE7asZxjlTRS8cf29Hhelb5g/edit?usp=sharing',
		title: 'Local Search and Simulated Annealing',
		description:
			'A presentation on local search, the metropolis algorithm, and simulated annealing.',
		tags: ['Algorithms', 'Simulated Annealing', 'Local Search', 'AI']
	},
	zkp: {
		href: 'https://docs.google.com/presentation/d/1t4eu54bfACUSWMknT2X-pInvJ0F9c3g4h0W3Bm6lzik/edit?usp=sharing',
		title: 'Zero Knowledge Proofs',
		description:
			'A presentations about zero knowledge proofs, their applications, and how they work.',
		tags: ['Cryptography']
	}
};
