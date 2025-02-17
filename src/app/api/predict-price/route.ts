import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { originalPrice } = body;

    const analysis = await openai.chat.completions.create({
      model: "deepseek-chat",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: `You are a product pricing expert. Analyze the product and return a JSON object. The user might put random details in the product, so make sure to extract the price and other necessary details. The user might also put irrelevant details, so ignore them. The user might also put the price in a different currency, so make sure to convert it to the local currency. The user might also put the price in a different format, so make sure to extract the price correctly. The user might also put the price in a different unit, so make sure to convert it to the local unit. The user might also put the price in a different quantity, so make sure to extract the price correctly. The user might also put the price in a different condition, so make sure to extract the price correctly. The user might also put the price in a different status, so make sure to extract the price correctly. The user might also put the price in a different category, so make sure to extract the price correctly.

          Response format:
          {
            "percentage": number,
            "reasoning": string,
            "condition_factor": string,
            "expiry_factor": string,
            "market_factor": string
          }

          Rules:
          1. Return ONLY the JSON object, no other text
          2. percentage must be between 40 and 60
          3. Better condition items get higher percentage
          4. Items near expiry get lower percentage
          5. Consider market demand and brand value`,
        },
        {
          role: "user",
          content: `Analyze and price this product:
          ${JSON.stringify(body, null, 2)}
          `,
        },
      ],
    });

    let aiResponse;
    try {
      const content = analysis.choices[0].message.content?.trim() ?? "";
      // Remove any markdown formatting if present
      const jsonContent = content.replace(/```json\n?|\n?```/g, "").trim();
      aiResponse = JSON.parse(jsonContent);

      // Validate response structure
      if (
        !aiResponse ||
        typeof aiResponse.percentage !== "number" ||
        aiResponse.percentage < 40 ||
        aiResponse.percentage > 60
      ) {
        throw new Error("Invalid AI response format");
      }
    } catch (parseError) {
      console.error("AI response parsing error:", parseError);
      throw new Error("Failed to parse AI response");
    }

    const suggestedPercentage = aiResponse.percentage / 100;
    const sellerPrice =
      Math.round(originalPrice * suggestedPercentage * 100) / 100;
    const marketPrice = Math.round(originalPrice * 0.7 * 100) / 100;

    return NextResponse.json({
      sellerPrice,
      marketPrice,
      analysis: {
        percentage: aiResponse.percentage,
        reasoning: aiResponse.reasoning,
        factors: {
          condition: aiResponse.condition_factor,
          expiry: aiResponse.expiry_factor,
          market: aiResponse.market_factor,
        },
      },
    });
  } catch (error) {
    console.error("Price prediction error:", error);
    return NextResponse.json(
      {
        error: "Failed to calculate price",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
