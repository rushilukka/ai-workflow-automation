import OpenAI from 'openai';
import { NVIDIA_CONFIG, PROMPTS, getLLMParams, getSystemPrompt } from './CONSTANTS.js';

const openai = new OpenAI({
  apiKey: NVIDIA_CONFIG.apiKey,
  baseURL: NVIDIA_CONFIG.baseURL,
});

async function main() {
  const query = PROMPTS.greeting;

  const completion = await openai.chat.completions.create({
    model: NVIDIA_CONFIG.model,
    messages: [
      {
        role: "system",
        content: getSystemPrompt('english_only')
      },
      {
        role: "user",
        content: query
      }
    ],
    ...getLLMParams(),
  });
   
  console.log('Query:\n', query);
  console.log('Response:\n', completion.choices[0]?.message?.content || '');
 
}

main();
