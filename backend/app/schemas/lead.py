from pydantic import BaseModel, EmailStr, Field


class LeadRequest(BaseModel):
    customer_name: str = Field(..., min_length=2)
    company: str
    industry: str
    email: EmailStr
    requirement: str = Field(..., min_length=10)