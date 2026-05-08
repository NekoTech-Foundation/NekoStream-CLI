import { AnimeVietsubProvider } from './scrapers/providers/animevietsub'
import { Anime47Provider } from './scrapers/providers/anime47'
import { AnimehayProvider } from './scrapers/providers/animehay'
import type { BaseScraper } from './scrapers/base'

export const providers: Record<string, BaseScraper> = {
  animevietsub: new AnimeVietsubProvider(),
  anime47: new Anime47Provider(),
  animehay: new AnimehayProvider()
}

export function getProvider(name: string): BaseScraper {
  const providerName = name.toLowerCase()
  const provider = providers[providerName]
  if (!provider) {
    throw new Error(`Provider not found: ${name}`)
  }

  // Inject custom domain if configured
  try {
    const { loadSettings } = require('./storage')
    const settings = loadSettings()
    if (settings.providerDomains && settings.providerDomains[providerName]) {
      let customDomain = settings.providerDomains[providerName]
      if (!customDomain.startsWith('http')) customDomain = 'https://' + customDomain
      // Remove trailing slash
      provider.baseUrl = customDomain.replace(/\/$/, '')
    }
  } catch (e) {
    // Ignore storage errors here to avoid breaking provider resolution
  }

  return provider
}
