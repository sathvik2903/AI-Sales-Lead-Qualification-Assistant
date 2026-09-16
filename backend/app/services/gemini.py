import os
import cohere
from dotenv import load_dotenv

load_dotenv()

co = cohere.ClientV2(api_key=os.getenv("CO_API_KEY"))

def analyze_lead(requirement, context):
    system_prompt = """
You are an AI Sales Lead Qualification Assistant.

Always respond professionally with these sections:

1. Lead Summary
2. Relevant Products / Features
3. Potential Customer Needs
4. Recommended Next Step
5. 2-3 Follow-up Questions
"""

    response = co.chat(
        model="command-a-plus-05-2026",
        messages=[
            {"role": "system", "content": system_prompt},
            {
                "role": "user",
                "content": f"""
Customer Requirement:
{requirement}

Relevant Products:
{context}
"""
            }
        ]
    )

    return response.message.content[0].text