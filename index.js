'use strict';

const { promises: fs } = require('fs');
const core = require('@actions/core');
const githubLabelSync = require('github-label-sync');

void async function () {
	try {
		const labelsFilePath = core.getInput('labels-path');
		console.log('Files in root:');
		await fs.readdir('.', (err, files) => {
			files.forEach(file => {
			  console.log(file);
			});
		  });
		console.log('Files in .github:');
		await fs.readdir('./.github/', (err, files) => {
			files.forEach(file => {
			  console.log(file);
			});
		});
		

		const content = await fs.readFile(labelsFilePath, 'utf8');
		const labels = JSON.parse(content);

		await githubLabelSync({
			accessToken: core.getInput('github-token'),
			repo: process.env.GITHUB_REPOSITORY,
			allowAddedLabels: true,
			labels,
			log: {
				info: core.info,
				warn: core.warning
			}
		});
	} catch (error) {
		core.setFailed(error.message);
	}
}();
