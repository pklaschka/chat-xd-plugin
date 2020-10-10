/**
 * Syncs versions `package.json` => `manifest.json`
 * @author Pablo Klaschka
 */

const fs = require('fs');
const path = require('path');
const sh = require('shelljs');
const ch = require('chalk');

const { version } = require('../package.json');

const manifestPath = path.join(__dirname, '../dist/manifest.json');

const manifest = fs.readFileSync(manifestPath).toString();

const newManifest = manifest.replace(
	/"version": "\d+\.\d+\.\d+"/g,
	`"version": "${version}"`
);

fs.writeFileSync(manifestPath, newManifest);

console.log(ch.green(`Updated manifest version to ${ch.blue(version)}`));

sh.exec('npm run prettier:check');
sh.exec(`git add ${manifestPath}`, { silent: true });
