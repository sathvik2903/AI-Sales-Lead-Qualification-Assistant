from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
import os
import json
import cohere
from dotenv import load_dotenv

load_dotenv("backend/.env")

COHERE_API_KEY = os.getenv("COHERE_API_KEY")

co = cohere.Client(COHERE_API_KEY)

app = FastAPI(title="AI Sales Lead Qualification API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = "backend/sales_leads.db"

PRODUCTS = [
    {"name":"CRM Pro","keywords":["crm","sales","pipeline"]},
    {"name":"AnalyticsX","keywords":["analytics","dashboard","reports"]},
    {"name":"AutoMail","keywords":["email","marketing","automation"]},
    {"name":"CloudSync","keywords":["cloud","storage"]},
    {"name":"HR Flow","keywords":["hr","employees"]},
    {"name":"Inventory Plus","keywords":["inventory","warehouse"]},
    {"name":"Finance Hub","keywords":["finance","accounting"]},
    {"name":"Support Desk","keywords":["support","ticket"]},
    {"name":"IoT Connect","keywords":["iot","sensors"]},
    {"name":"Secure Shield","keywords":["security","cyber"]},
]


class Lead(BaseModel):
    customer_name: str
    company: str
    industry: str
    email: str
    requirement: str


def init_db():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    cur.execute("""
        CREATE TABLE IF NOT EXISTS leads(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            customer_name TEXT,
            company TEXT,
            industry TEXT,
            email TEXT,
            requirement TEXT,
            score INTEGER,
            priority TEXT
        )
    """)

    conn.commit()
    conn.close()


init_db()


@app.get("/")
def home():
    return {"status": "Backend Running"}


@app.get("/leads")
def get_leads():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    cur.execute("SELECT * FROM leads ORDER BY id DESC")

    rows = [dict(r) for r in cur.fetchall()]
    conn.close()

    return rows


@app.post("/leads/analyze")
def analyze_lead(lead: Lead):

    text = f"{lead.industry} {lead.requirement}".lower()

    matched = [
        p["name"]
        for p in PRODUCTS
        if any(k in text for k in p["keywords"])
    ]

    if not matched:
        matched = ["CRM Pro"]

    prompt = f"""
You are an Enterprise AI Sales Lead Qualification Assistant.

Customer Details
----------------
Name: {lead.customer_name}
Company: {lead.company}
Industry: {lead.industry}
Email: {lead.email}

Customer Requirement:
{lead.requirement}

Matched Products:
{", ".join(matched)}

Analyze this sales lead professionally.

Return ONLY valid JSON.

{{
  "score": 0-100,
  "confidence": 0-100,
  "priority": "High|Medium|Low",
  "summary": "...",
  "recommended_products": ["..."],
  "next_action": "...",
  "follow_up_questions": ["...","...","..."]
}}
"""

    try:
        response = co.chat(
            model="command-a-03-2025",
            message=prompt,
            temperature=0.3,
        )

        text = response.text.strip()

        if text.startswith("```"):
            text = (
                text.replace("```json", "")
                .replace("```", "")
                .strip()
            )

        result = json.loads(text)

    except Exception as e:
        print("COHERE ERROR:", e)

        result = {
            "score": 75,
            "confidence": 80,
            "priority": "Medium",
            "summary": "AI fallback response.",
            "recommended_products": matched,
            "next_action": "Follow up with the customer and schedule a discovery call.",
            "follow_up_questions": [
                "What is your budget?",
                "How many users will use the solution?",
                "What is your implementation timeline?"
            ]
        }

    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO leads
        (customer_name,company,industry,email,requirement,score,priority)
        VALUES(?,?,?,?,?,?,?)
    """, (
        lead.customer_name,
        lead.company,
        lead.industry,
        lead.email,
        lead.requirement,
        result["score"],
        result["priority"]
    ))

    conn.commit()
    conn.close()

    return {
        "success": True,
        "customer_name": lead.customer_name,
        "company": lead.company,
        "industry": lead.industry,
        **result
    }