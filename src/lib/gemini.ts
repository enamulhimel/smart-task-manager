// import { GoogleGenerativeAI } from '@google/generative-ai';

// const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

// export async function generateSubtasks(taskTitle: string, taskDescription: string) {
//   const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
//   const prompt = `Break down the following task into 3-5 smaller, actionable steps. 
//   Return only the steps as a bulleted list with no additional text.
  
//   Task: ${taskTitle}
//   Description: ${taskDescription}
  
//   Example output format:
//   - Step 1
//   - Step 2
//   - Step 3`;

//   try {
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();
//     return text.split('\n').filter(step => step.trim().startsWith('-')).map(step => step.replace(/^- /, '').trim());
//   } catch (error) {
//     console.error('Error generating subtasks:', error);
//     throw error;
//   }
// }

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function getSubtasksFromGemini(taskTitle: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
  Break down the following task into 3-5 actionable subtasks:

  Task: ${taskTitle}

  Return the subtasks as a simple bullet list.
  `;

  const result = await model.generateContent(prompt);
  const text = await result.response.text();

  // Parse subtasks from bullet points
  const subtasks = text
    .split("\n")
    .filter(line => line.trim())
    .map(line => line.replace(/^[-*•]\s*/, "").trim());

  return subtasks;
}
