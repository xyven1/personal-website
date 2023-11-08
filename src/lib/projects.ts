import homeManagementEdit from '$lib/home-management/home-management-edit.svg';
import homeManagementIrrigation from '$lib/home-management/home-management-irrigation.svg';
import homeManagementLightMode from '$lib/home-management/home-management-light-mode.svg';
import homeManagementLights from '$lib/home-management/home-management-lights.svg';
import homeManagementMobile from '$lib/home-management/home-management-mobile.svg';

import dipole from '$lib/images/dipole-physics-simulation.png?as=run';
import type { Picture } from 'imagetools-core';
export type EmbedInfo = {
	path: string;
	fill_width?: boolean;
	fill_height?: boolean;
	max_width?: number;
	max_height?: number;
	min_height?: number;
};

export type Project = {
	name: string;
	short_description: string;
	long_description?: string;
	github_url?: string;
	embed_info?: EmbedInfo;
	slug: string;
	images: (Picture | string)[];
};
export type Projects = Project[];

const projects: Projects = [
	{
		name: 'Dipole Physics Simulation',
		short_description:
			'A physics simulation of a dipole. Mess around with it, it is interactive! (best on desktop)',
		github_url: 'https://github.com/Xyven1/dipole-simulation',
		slug: 'dipole-physics-simulation',
		embed_info: {
			path: '/dipole-simulation/dipole_simulation.htm',
			max_width: 700,
			max_height: 528,
			min_height: 528
		},
		images: [dipole],
		long_description: `<p>This project was developed for the simulation of dipole moments in a way which is accessible on the web. I opted to use web assembly with Rust for this project as the performance benefit for the numerical calculations necessary for the simulation would be noticeable. I used raw WebGL for the graphical display aspect of the project, as there was no complex graphics necessary and it gave fine grained control with high performance. For the simulation I wrote a 4th order Runge Kutta algorithm for linear and rotational mechanics. The input forces for the Runge Kutta were calculated using Coulomb's law across discrete charges. The dipoles were modeled as a physical dipole with two opposite charges separated by an offset.
<p/>
<p>
As this simulation does not account for any repulsive or normal forces between objects the dipoles eventually converge which results in the simulation failing. This can be tracked via the momentum and energy readouts, which report the current state of the simulation. In cases were more accuracy could correct the divergence, it would be possible to address the issue by using different methods of solving the differential equations such as Verlet integration which is energy conserving (as far as the mean is concerned), csRKN, or simply adaptive Runge Kutta for more accuracy in edge cases, but the reality is that at some point all methods will fail as the forces become infinite without some model of normal or repulsive forces.</p>`
	},
	{
		name: 'Home Managment',
		short_description: 'A web application for managing your home',
		github_url: 'https://github.com/Xyven1/home-management',
		slug: 'home-managment',
		images: [
			homeManagementLights,
			homeManagementMobile,
			homeManagementEdit,
			homeManagementIrrigation,
			homeManagementLightMode
		],
		long_description: `<p>This application is designed to manage all the IoT devices in my house, including lights, TV, and audio equipment.</p>
		<p>This project uses Express and Socket.io for the backend and Vite-Vue-Vuetify for the front end. It is a redisign of my earlier project <a href="https://github.com/Xyven1/wemo-interface">wemo-interface</a> updated to use vite, and refactored so that mutiple different interfaces can be created and navigated.</p>`
	}
];
export default projects;
