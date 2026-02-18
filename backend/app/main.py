from fastapi import FastAPI
from app.api.v1.endpoints import profiles, portfolios, transactions, insights

app = FastAPI(
    title="CelebrityPortfolio API",
    description="API for tracking portfolios of high-profile investors and politicians.",
    version="1.0.0"
)

# Root Endpoint
@app.get("/")
async def root():
    return {"message": "Welcome to CelebrityPortfolio API v1.0"}

# Include Routers
app.include_router(profiles.router, prefix="/api/v1/profiles", tags=["Profiles"])
app.include_router(portfolios.router, prefix="/api/v1/portfolios", tags=["Portfolios"])
app.include_router(transactions.router, prefix="/api/v1/transactions", tags=["Transactions"])
app.include_router(insights.router, prefix="/api/v1/insights", tags=["Insights"])
