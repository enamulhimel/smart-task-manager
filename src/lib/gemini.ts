import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function generateSubtasks(taskTitle: string, taskDescription: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemma-3-1b-it" });
    
    const prompt = `Break down the following task into 3-5 smaller, actionable steps. 
    Return only the steps as a bulleted list with no additional text or explanations.
    
    Task: ${taskTitle}
    ${taskDescription ? `Description: ${taskDescription}` : ''}
    
    Example output format:
    - Book venue
    - Send invitations
    - Order cake`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const subtasks = text.split('\n')
      .filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'))
      .map(line => line.replace(/^[-•]\s*/, '').trim())
      .filter(Boolean);

    if (subtasks.length === 0) {
      throw new Error('No subtasks were generated');
    }

    return subtasks;
  } catch (error) {
    console.error('Error generating subtasks:', error);
    throw error;
  }
}


  //model:gemma-3-1b-it