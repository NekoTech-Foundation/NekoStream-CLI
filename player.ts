import { spawn } from 'child_process'
import path from 'path'
import type { StreamInfo } from './scrapers/base'

export async function launchPlayer(streamInfo: StreamInfo) {
  return new Promise<void>((resolve, reject) => {
    const mainScript = path.join(__dirname, 'player-main.js')

    const env = {
      ...process.env,
      NEKOSTREAM_CLI_STREAM: Buffer.from(JSON.stringify(streamInfo)).toString('base64')
    }

    const electronBinary = require('electron') as unknown as string

    const electronProcess = spawn(electronBinary, [mainScript], {
      env,
      stdio: 'ignore',
      shell: false
    })

    electronProcess.on('close', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`Player exited with code ${code}`))
      }
    })

    electronProcess.on('error', (err) => {
      reject(err)
    })
  })
}
