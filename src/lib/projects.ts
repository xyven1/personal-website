export type Project = {
	name: string;
	short_description: string;
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
	{
		name: 'Home Managment 2',
		short_description: 'A web application for managing your home',
		path: 'home-managment-2',
		image: 'home-managment-2.png'
	}
];
export default projects;
