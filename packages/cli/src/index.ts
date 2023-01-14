import { program } from 'commander';

import { serveCommand } from './commands/serve';

program.addCommand(serveCommand);

program.parse(process.argv);

module.exports = () => {
  console.log('Server is listening.');
};
