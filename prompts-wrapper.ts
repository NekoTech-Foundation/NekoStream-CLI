import { select, input, confirm } from '@inquirer/prompts'

export default async function prompts(options: any): Promise<any> {
  try {
    if (options.type === 'select') {
      // Inquirer doesn't natively map Esc to "return undefined" like the old library.
      // So we explicitly add a "Go Back" option at the bottom if it says "Press Esc to go back".
      const choices = options.choices.map((c: any) => ({
        name: c.title,
        value: c.value,
        description: c.description
      }))

      if (options.message.includes('Esc')) {
        options.message = options.message.replace('(Press Esc to go back)', '').trim()
        choices.push({ name: '[0] 🔙 Go Back', value: '__GOBACK__' })
      }

      const result = await select({
        message: options.message,
        choices: choices,
        pageSize: 15
      });
      
      if (result === '__GOBACK__') {
        return {} // empty object, same as pressing Esc in old prompts
      }
      
      return { [options.name]: result };
    }
    
    if (options.type === 'text') {
      const result = await input({
        message: options.message.replace('(Press Esc to go back)', '').trim(),
        default: options.initial
      });
      return { [options.name]: result };
    }
    
    if (options.type === 'confirm') {
      const result = await confirm({
        message: options.message
      });
      return { [options.name]: result };
    }
  } catch (err: any) {
    if (err.name === 'ExitPromptError' || err.message.includes('force closed')) {
      return {};
    }
    throw err;
  }
  return {};
}
