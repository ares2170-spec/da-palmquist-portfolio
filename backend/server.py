from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Dict, Any, Optional
from datetime import datetime
import os
import logging
import uuid

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'portfolio_db')
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    message: str
    project_type: Optional[str] = None
    submitted_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "new"

class ContactSubmissionRequest(BaseModel):
    name: str
    email: EmailStr
    message: str
    project_type: Optional[str] = None

class AudioInteraction(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    action: str  # "play", "pause", "skip"
    excerpt: str  # "excerpt1" or "excerpt2"
    timestamp: float
    created_at: datetime = Field(default_factory=datetime.utcnow)
    ip_address: Optional[str] = None

class AudioInteractionRequest(BaseModel):
    action: str
    excerpt: str
    timestamp: float

# Helper functions for default data
def get_default_portfolio_data():
    """Return default portfolio data from mock.js structure"""
    return {
        "hero": {
            "name": "Peter D. Allen",
            "title": "Visionary Comic Book Artist & AI Pioneer",
            "tagline": "Pioneering the next generation of entertainment franchises through the fusion of creative storytelling and cutting-edge generative AI",
            "location": "Saint Paul, Minnesota, United States",
            "email": "ares2170@gmail.com",
            "phone": "+1 651-231-8821"
        },
        "about": {
            "summary": "Visionary and self-published comic book artist with a proven track record in original intellectual property development, now pioneering a groundbreaking approach to multi-media franchise creation using advanced generative AI. Combining a strong narrative sensibility with cutting-edge technological acumen, I am poised to deliver immersive, scalable entertainment experiences that captivate global audiences and redefine content production workflows.",
            "mission": "Seeking to leverage creative leadership and technical innovation to develop the next generation of entertainment franchises for a leading entertainment company."
        },
        "skills": {
            "technical": [
                "Generative AI Integration",
                "AI-driven Content Generation", 
                "Digital Publishing & Distribution",
                "Project Management & Execution",
                "Emerging Technologies"
            ],
            "creative": [
                "Intellectual Property Development",
                "Original World-building",
                "Character Design",
                "Compelling Storytelling",
                "Creative Direction",
                "Art Direction"
            ],
            "business": [
                "Multi-Media Production Strategy",
                "Community Building & Monetization",
                "Cross-platform Content Expansion",
                "Fanbase Development",
                "Strategic Planning"
            ]
        },
        "experience": [
            {
                "title": "Creator & Lead Developer",
                "company": "Principia (Proprietary Multi-Media Franchise)",
                "period": "2019 - Present",
                "description": "A complete rebranding of the existing Frontier: 2170 universe, leveraging generative AI to create a comprehensive, multi-stage entertainment franchise. Designed for rapid iteration, fan engagement, and scalable content production across diverse media. Published under the pseudonym D.A. Palmquist.",
                "achievements": [
                    "Established new standard for IP development by integrating generative AI into every facet of creative and production pipeline",
                    "Developing 5-phase rollout from webnovel to animated streaming content",
                    "Implementing AI tools for narrative expansion, visual asset generation, and character interaction",
                    "Strategically planned Patreon-based funding model for community engagement"
                ]
            },
            {
                "title": "Author & Artist", 
                "company": "Frontier: 2170 Series (Self-Published)",
                "period": "Published via Amazon KDP",
                "description": "Successfully conceptualized, wrote, illustrated, and self-published full-length graphic novels in original science fiction universe.",
                "achievements": [
                    "Published 'Frontier: 2170 Volume 01: Easy Street' - managed all production aspects",
                    "Published 'Frontier: 2170 Volume 02: First Blood' - expanded established narrative universe", 
                    "Demonstrated expertise in sequential art, character development, and long-form storytelling",
                    "Handled storyboarding, illustration, print preparation, and digital distribution"
                ]
            }
        ],
        "projects": [
            {
                "title": "Principia Multi-Media Franchise",
                "description": "Comprehensive AI-driven entertainment franchise spanning webnovels, audiobooks, webcomics, animation, and interactive experiences. Principia represents a complete rebranding of the Frontier: 2170 universe, featuring original character designs including Jon Orvar and other key figures. Published under the pseudonym D.A. Palmquist.",
                "technologies": ["Generative AI", "Multi-speaker AI Voice Synthesis", "Advanced Image Generation", "Conversational AI"],
                "status": "Phase 1: Foundation & Fanbase Development",
                "image": "https://customer-assets.emergentagent.com/job_dev-spotlight-36/artifacts/3lktix58_Jon%20Orvar%20concept.jpg",
                "phases": [
                    "Webnovel Foundation & Fanbase Development",
                    "Interactive Audio Immersion",
                    "Visual Narrative Expansion (Webcomic)",
                    "Animated Streaming & Educational Content", 
                    "Interactive Characters & Tie-in Products"
                ]
            },
            {
                "title": "Frontier: 2170 Volume 01: Easy Street",
                "description": "Original science fiction graphic novel featuring complex world-building and character development in a futuristic setting. Low on money and unemployed, the crew of the independent spaceship Peregrine are forced to take a shady job from a shadier person.",
                "technologies": ["Sequential Art", "Digital Publishing", "Character Design", "Narrative Development"],
                "status": "Published",
                "link": "https://www.amazon.com/Frontier-2170-01-Easy-Street/dp/1466250534/",
                "image": "https://m.media-amazon.com/images/I/71elpDRHmXL._SY466_.jpg"
            },
            {
                "title": "Frontier: 2170 Volume 02: First Blood",
                "description": "The crew of the Peregrine are caught in the crossfire when Mars launches a pre-emptive sneak attack on an American military base on the Moon, escalating the war to a whole new level.",
                "technologies": ["Sequential Art", "World Expansion", "Character Development", "Long-form Storytelling"],
                "status": "Published", 
                "link": "https://www.amazon.com/Frontier-2170-02-First-Blood/dp/1484914058/",
                "image": "https://m.media-amazon.com/images/I/41X8SiMCn2L._SY466_.jpg"
            },
            {
                "title": "AI-Generated Interactive Wiki",
                "description": "Public canon wiki with Google Translate integration for the Spaceborn constructed language, enhancing fan engagement.",
                "technologies": ["AI Translation", "Interactive Web Development", "Community Engagement", "Constructed Languages"],
                "status": "In Development",
                "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop"
            }
        ],
        "contact": {
            "email": "ares2170@gmail.com",
            "phone": "+1 651-231-8821",
            "location": "Saint Paul, Minnesota, United States",
            "availability": "Open to corporate investment for accelerated growth and wider market penetration"
        }
    }

def get_default_skills_data():
    """Return default skills data when database is empty"""
    return {
        "technical": [
            "Generative AI Integration",
            "AI-driven Content Generation", 
            "Digital Publishing & Distribution",
            "Project Management & Execution",
            "Emerging Technologies"
        ],
        "creative": [
            "Intellectual Property Development",
            "Original World-building",
            "Character Design",
            "Compelling Storytelling",
            "Creative Direction",
            "Art Direction"
        ],
        "business": [
            "Multi-Media Production Strategy",
            "Community Building & Monetization",
            "Cross-platform Content Expansion",
            "Fanbase Development",
            "Strategic Planning"
        ]
    }

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Peter D. Allen Portfolio API"}

# Portfolio Data Endpoints
@api_router.get("/portfolio/data")
async def get_portfolio_data():
    """Get complete portfolio data"""
    try:
        portfolio_data = await db.portfolio_data.find_one({"active": True})
        if not portfolio_data:
            # Return default data if no database entry exists
            return get_default_portfolio_data()
        
        # Remove MongoDB _id field
        portfolio_data.pop('_id', None)
        return portfolio_data
    except Exception as e:
        logging.error(f"Error fetching portfolio data: {e}")
        return get_default_portfolio_data()

@api_router.get("/projects")
async def get_projects():
    """Get all projects"""
    try:
        projects = await db.projects.find({"active": True}).to_list(100)
        for project in projects:
            project.pop('_id', None)
        return {"projects": projects}
    except Exception as e:
        logging.error(f"Error fetching projects: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch projects")

@api_router.get("/skills")
async def get_skills():
    """Get skills organized by category"""
    try:
        skills_data = await db.skills.find_one({"active": True})
        if not skills_data:
            return get_default_skills_data()
        
        skills_data.pop('_id', None)
        return skills_data
    except Exception as e:
        logging.error(f"Error fetching skills: {e}")
        return get_default_skills_data()

# Contact Form Endpoint
@api_router.post("/contact/submit")
async def submit_contact_form(contact_data: ContactSubmissionRequest):
    """Handle contact form submissions"""
    try:
        # Create contact submission
        submission = ContactSubmission(**contact_data.dict())
        
        # Save to database
        await db.contact_submissions.insert_one(submission.dict())
        
        logging.info(f"Contact form submitted by {contact_data.email}")
        
        return {
            "success": True,
            "message": "Thank you for your message! I'll get back to you soon.",
            "submission_id": submission.id
        }
    except Exception as e:
        logging.error(f"Error submitting contact form: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")

# Audio Interaction Analytics
@api_router.post("/audio/interaction")
async def log_audio_interaction(interaction_data: AudioInteractionRequest):
    """Track audio player interactions for analytics"""
    try:
        interaction = AudioInteraction(**interaction_data.dict())
        
        # Save to database
        await db.audio_interactions.insert_one(interaction.dict())
        
        return {"success": True, "message": "Interaction logged"}
    except Exception as e:
        logging.error(f"Error logging audio interaction: {e}")
        # Don't raise exception for analytics - fail silently
        return {"success": False, "message": "Failed to log interaction"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
