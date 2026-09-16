import json
from pathlib import Path


def retrieve_products(requirement: str):
    kb_path = Path(__file__).resolve().parents[2] / "knowledge_base.json"

    with open(kb_path, "r", encoding="utf-8") as file:
        products = json.load(file)

    requirement = requirement.lower()

    scored = []

    for product in products:
        score = 0

        if product["category"].lower() in requirement:
            score += 2

        for feature in product["features"]:
            if feature.lower() in requirement:
                score += 1

        if score > 0:
            scored.append((score, product))

    scored.sort(reverse=True, key=lambda x: x[0])

    return [item[1] for item in scored[:3]]