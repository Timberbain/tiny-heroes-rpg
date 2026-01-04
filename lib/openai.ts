import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Please add your OpenAI API key to .env.local')
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const GAME_MASTER_MODEL = 'gpt-4-turbo-preview'
