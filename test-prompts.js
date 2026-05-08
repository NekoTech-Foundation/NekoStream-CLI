const prompts = require('prompts');
const ora = require('ora');

async function test() {
  const spinner = ora('Loading...').start();
  await new Promise(r => setTimeout(r, 1000));
  spinner.stop();

  const { choice } = await prompts({
    type: 'select',
    name: 'choice',
    message: 'Select an option',
    choices: [
      { title: 'Option 1', value: 1 },
      { title: 'Option 2', value: 2 },
      { title: 'Option 3', value: 3 }
    ]
  });

  console.log('You selected:', choice);
}

test();
