export type Project = {
	name: string;
	short_description: string;
  long_description: string;
  github_url: string;
  embed_path: string;
	path: string;
	image: string;
};
export type Projects = Project[];

const projects: Projects = [
	{
		name: 'Home Managment',
		short_description: 'A web application for managing your home',
		path: 'home-managment',
		image: 'home-managment-1.png'
	},
	/* {
		name: 'Home Managment 2',
		short_description: 'A web application for managing your home',
		path: 'home-managment-2',
		image: 'home-managment-2.png'
	}, */
  {
    name: 'Dipole Physics Simulation',
    short_description: 'A physics simulation of a dipole. Mess around with it, it is interactive!',
    github_url: 'https://github.com/Xyven1/dipole-simulation',
    path: 'dipole-physics-simulation',
    embed_path: '/dipole-simulation/dipole-simulation.html',
    image: 'dipole-physics-simulation.png',
    long_description: `This project was developed for the simulation of dipole moments in a way which is accessible on the web. I opted to use web assembly with Rust for this project as the performance benefit for the numerical calculations necessary for the simulation would be noticeable. I used raw WebGL for the graphical display aspect of the project, as there was no complex graphics necessary and it gave fine grained control with high performance. For the simulation I wrote a 4th order Runge Kutta algorithm for linear and rotational mechanics. The input forces for the Runge Kutta were calculated using Coulomb's law across discrete charges. The dipoles were modeled as a physical dipole with two opposite charges separated by an offset.

As this simulation does not account for any repulsive or normal forces between objects the dipoles eventually converge which results in the simulation failing. This can be tracked via the momentum and energy readouts, which report the current state of the simulation. In cases were more accuracy could correct the divergence, it would be possible to address the issue by using different methods of solving the differential equations such as Verlet integration which is energy conserving (as far as the mean is concerned), csRKN, or simply adaptive Runge Kutta for more accuracy in edge cases, but the reality is that at some point all methods will fail as the forces become infinite without some model of normal or repulsive forces.`
  }
];
export default projects;
