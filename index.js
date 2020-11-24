'use strict';

const { promises: fs } = require('fs');
const core = require('@actions/core');
const githubLabelSync = require('github-label-sync');

void async function () {
	try {
		const labelsFilePath = core.getInput('labels-path');
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
