import json
from fastapi import APIRouter, HTTPException

from app.schemas.lead import LeadRequest
from app.services.retrieval import retrieve_products
from app.services.gemini import analyze_lead
from app.database.db import SessionLocal
from app.models.lead import Lead

router = APIRouter()


@router.post("/leads/analyze")
def analyze(data: LeadRequest):
    db = SessionLocal()

    try:
        products = retrieve_products(data.requirement)
        context = json.dumps(products, indent=2)

        ai_response = analyze_lead(data.requirement, context)

        lead = Lead(
            customer_name=data.customer_name,
            company=data.company,
            industry=data.industry,
            email=data.email,
            requirement=data.requirement,
            retrieved_context=context,
            ai_analysis=ai_response,
        )

        db.add(lead)
        db.commit()
        db.refresh(lead)

        return {
            "id": lead.id,
            "analysis": ai_response,
            "products": products
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        db.close()


@router.get("/leads")
def get_leads():
    db = SessionLocal()

    try:
        return db.query(Lead).order_by(Lead.created_at.desc()).all()

    finally:
        db.close()