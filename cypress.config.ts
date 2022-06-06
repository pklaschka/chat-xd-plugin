import { defineConfig } from 'cypress';
import webpackConfig from './webpack.cypress.config';

export default defineConfig({
	viewportWidth: 360,
	projectId: 'dqzeub',
	component: {
		setupNodeEvents(on, config) {},
		specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
		devServer: {
			framework: 'react',
			bundler: 'webpack',
			webpackConfig
		}
	}
});
