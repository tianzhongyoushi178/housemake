import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Define the response structure we expect from the AI
const SYSTEM_PROMPT = `
You are an expert architect and 3D layout designer.
Your task is to generate a floor plan layout based on the user's description.
You must output a JSON object containing an array of "units".

Each unit represents a room or space and must have the following properties:
- type: One of "living", "kitchen", "bath", "toilet", "washroom", "entrance", "stairs", "room".
- position: [x, y] coordinates in meters. (0,0 is the center).
- width: Width of the room in meters (default ~3.6 for living, ~1.8 for others).
- depth: Depth of the room in meters.
- rotation: Rotation in radians (0, 1.57, 3.14, 4.71).

Constraints:
- "living" should be the central room.
- Rooms should be adjacent to each other to form a coherent house.
- Avoid overlapping rooms if possible.
- Standard sizes:
  - Living: 3.6x3.6 or larger
  - Kitchen: 2.7x2.7 or 2.7x1.8
  - Bath/Toilet/Washroom/Entrance: 1.8x1.8
  - Stairs: 1.8x2.7 or 1.8x1.8
  - Room: 2.7x2.7 or 3.6x3.6

Output Format:
Only return the JSON object. Do not include markdown formatting like \`\`\`json.
Example:
{
  "units": [
    { "type": "living", "position": [0, 0], "width": 3.6, "depth": 3.6, "rotation": 0 },
    { "type": "kitchen", "position": [2.7, 0], "width": 1.8, "depth": 3.6, "rotation": 0 }
  ]
}
`;

export async function POST(req: Request) {
    try {
        const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: 'API Key not configured. Please set GOOGLE_GEMINI_API_KEY in .env.local' },
                { status: 500 }
            );
        }

        const { prompt } = await req.json();
        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const result = await model.generateContent([
            SYSTEM_PROMPT,
            `User Request: ${prompt}`
        ]);

        const response = await result.response;
        console.log('Gemini Response Status:', response); // Debug log
        let text = response.text();
        console.log('Gemini Raw Text:', text); // Debug log

        // Clean up markdown code blocks if present
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const data = JSON.parse(text);

        // Add IDs and default properties if missing
        const units = data.units.map((u: any, index: number) => ({
            id: `ai-unit-${Date.now()}-${index}`,
            type: u.type,
            position: u.position || [0, 0],
            rotation: u.rotation || 0,
            width: u.width || 3.6,
            depth: u.depth || 3.6,
            walls: [], // Start with no walls
            openings: []
        }));

        return NextResponse.json({ units });
    } catch (error: any) {
        console.error('AI Generation Error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to generate layout' },
            { status: 500 }
        );
    }
}
