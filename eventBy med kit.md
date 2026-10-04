# EventBy — Med Kit

> **Purpose:** This is a last-minute interview handbook for explaining and defending the EventBy project.
>
> **Rule:** Understand the flows. Do not memorize paragraphs. If asked about a feature, explain **what it does → why it exists → how data flows → what happens on failure**.

---

# 0. 60-SECOND PROJECT INTRO

### Say this

> **EventBy is a full-stack event-management platform built using the MERN stack. It connects users with event organisers and provides separate interfaces for users, organisers and administrators. Users can discover and register for events, organisers can create and manage events, and admins can manage organisers and monitor platform activity.**
>
> **The frontend is built with React and Vite, while the backend uses Node.js and Express. MongoDB with Mongoose is used for persistent data. The project also integrates JWT-based organiser authentication, bcrypt password hashing, Cloudinary for event images, Razorpay for payments, Socket.IO for real-time communication, Firebase services, and geolocation support using MongoDB's 2dsphere indexing.**

### One-line architecture

```text
React Apps → Axios/HTTP → Express API → Middleware → Controllers → Mongoose → MongoDB
                                      ↓
                         Cloudinary / Razorpay / Firebase / Socket.IO
```

---

# 1. WHAT IS EVENTBY?

## Problem

An event platform needs different workflows for:

- People looking for events
- Organisers creating/managing events
- Admins managing the platform

## Main roles

```text
                    EVENTBY
                       |
          +------------+------------+
          |            |            |
          ▼            ▼            ▼
        USER       ORGANISER      ADMIN
          |            |            |
      Discover      Create       Manage
      Register      Events       Platform
      Payments      Analytics    Organisers
      Teams         Announce     Dashboard
```

## Main capabilities

### User

- Browse/discover events
- View event details
- Register/participate
- Team-based participation
- Payments for paid events
- Event passes / QR-related functionality
- Maps/location
- Real-time updates/communication

### Organiser

- Register/login
- Create events
- Upload event banner
- Publish/update/delete events
- Manage event status
- View event analytics
- Post/broadcast announcements
- Manage event-related activity

### Admin

- Admin authentication
- Manage organisers
- Dashboard/statistics
- Top-event views
- Platform-level management

---

# 2. COMPLETE ARCHITECTURE

```text
                     ┌───────────────────────┐
                     │        USERS          │
                     │       Browser         │
                     └───────────┬───────────┘
                                 │
                                 ▼
              ┌──────────────────────────────────┐
              │          FRONTEND LAYER           │
              │                                  │
              │ React + Vite                     │
              │ React Router                     │
              │ Context API                      │
              │ Axios                            │
              │ Tailwind CSS                     │
              │ Firebase / Maps / Socket.IO      │
              └────────────────┬─────────────────┘
                               │
                          HTTP / HTTPS
                               │
                               ▼
              ┌──────────────────────────────────┐
              │          EXPRESS API             │
              │                                  │
              │ CORS / Helmet / Cookies          │
              │ Routes                            │
              │ Authentication Middleware         │
              │ Controllers                       │
              │ Error Handler                     │
              └───────────────┬──────────────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
                ▼             ▼             ▼
          ┌──────────┐  ┌───────────┐  ┌───────────┐
          │ Mongoose │  │ Cloudinary│  │ Firebase  │
          └────┬─────┘  └───────────┘  └───────────┘
               │
               ▼
          ┌──────────┐
          │ MongoDB  │
          └──────────┘

        Other integrations:
        ├── Razorpay → Payments
        └── Socket.IO → Real-time communication
```

---

# 3. TECHNOLOGY CHEAT SHEET

| Technology | What it does | Where |
|---|---|---|
| React | UI/components | Frontend |
| Vite | Frontend build/dev tool | Frontend |
| React Router | Client-side routing | Frontend |
| Axios | HTTP communication | Frontend |
| Context API | Shared frontend state | Frontend |
| Tailwind CSS | Styling | Frontend |
| Node.js | JavaScript runtime | Backend |
| Express | API/server framework | Backend |
| MongoDB | Database | Backend |
| Mongoose | MongoDB ODM | Backend |
| JWT | Authentication token | Backend |
| bcrypt | Password hashing | Backend |
| Cookie Parser | Read cookies | Backend |
| Multer | Handle uploaded files | Backend |
| Cloudinary | Image/media storage | External service |
| Razorpay | Payments | External service |
| Socket.IO | Real-time communication | Client + Server |
| Firebase | Firebase services / Admin SDK | Client + Server |
| Helmet | Security HTTP headers | Backend |
| CORS | Controls cross-origin requests | Backend |
| Morgan | HTTP request logging | Backend |
| Render | Hosting/deployment | Infrastructure |

---

# 4. FRONTEND — WHAT TO KNOW

## React mental model

```text
React Application
       |
       +-- Pages
       |
       +-- Components
       |
       +-- State
       |
       +-- Context
       |
       +-- Router
       |
       +-- API calls
              |
              ▼
            Axios
              |
              ▼
         Backend API
```

### Component

Reusable UI building block.

### Props

Data passed from parent → child.

### State

Data that changes and causes the component to re-render.

### Context

Used to share state/data across multiple components without passing props through every level.

### React Router

Changes frontend views based on URL without a full browser reload.

---

# 5. AXIOS — ONLY WHAT HE NEEDS

**Axios = HTTP client.**

```text
React
  |
  | axios.get(...)
  ▼
Express API
  |
  ▼
MongoDB
  |
  ▼
JSON response
  |
  ▼
React
```

Methods:

```text
GET     → read
POST    → create
PUT     → update
PATCH   → partial update
DELETE  → delete
```

### Axios vs Express

```text
Axios   = sends the request
Express = receives/processes the request
```

### Axios vs fetch

Axios is a convenient HTTP client with features such as easier JSON handling, configuration, interceptors and consistent request/response handling.

Do **not** say Axios is inherently faster than fetch.

---

# 6. BACKEND ARCHITECTURE

The most important flow:

```text
HTTP Request
     ↓
Express Router
     ↓
Middleware
     ↓
Controller
     ↓
Mongoose Model
     ↓
MongoDB
     ↓
Controller
     ↓
JSON Response
     ↓
Frontend
```

## Router

Defines which endpoint maps to which controller.

Example:

```text
POST /api/event
        ↓
protectOrganiser
        ↓
upload.single("banner")
        ↓
createEvent
```

## Middleware

Runs between request and controller.

Typical jobs:

- Authentication
- Authorization
- File upload
- Request processing
- Security

## Controller

Contains business logic.

Example:

```text
createEvent()
loginOrganiser()
updateEvent()
deleteEvent()
getEventAnalytics()
```

## Model

Defines the database structure and provides database operations through Mongoose.

---

# 7. CREATE EVENT — KNOW THIS FLOW PERFECTLY

This is one of the best flows to explain in the interview.

```text
Organizer fills form
        ↓
React
        ↓
FormData
        ↓
Axios POST /api/event
        ↓
Express Router
        ↓
JWT Middleware
        ↓
Multer / Cloudinary upload
        ↓
createEvent Controller
        ↓
Validate fields
        ↓
Calculate participation
        ↓
Calculate pricing
        ↓
Process location
        ↓
Create MongoDB document
        ↓
Create announcement group
        ↓
201 Created
        ↓
React updates UI
```

## Important route

```text
POST /api/event
```

The route uses:

```text
protectOrganiser
+
upload.single("banner")
+
createEvent
```

---

# 8. CREATE EVENT BUSINESS LOGIC

The backend does more than blindly save form data.

## Required information

- title
- description
- event type
- registration deadline
- start/end time
- mode
- participation type

## Participation

```text
solo
  → maxParticipants = maxTeams

duo
  → team size = 2
  → maxParticipants = maxTeams × 2

squad
  → team size = 4
  → maxParticipants = maxTeams × 4
```

## Pricing

```text
Free
 ↓
isPaid = false
price = 0

Paid
 ↓
isPaid = true
price = amount
```

Paid event with price <= 0 is rejected.

## Location

Offline event:

```text
Address
Latitude
Longitude
     ↓
GeoJSON Point
     ↓
[lng, lat]
```

Online event:

```text
location = Online Event
```

---

# 9. MONGODB + MONGOOSE

## MongoDB

NoSQL document database.

```text
Database
  ↓
Collections
  ↓
Documents
```

## Mongoose

ODM = Object Data Modeling.

It provides:

- Schema
- Models
- Validation
- Queries
- References
- Middleware/hooks

Mental model:

```text
JavaScript object
      ↓
Mongoose Model
      ↓
MongoDB document
```

---

# 10. EVENT DATA MODEL

An Event contains important fields such as:

```text
organiser
title
description
eventType
rules
banner
registrationDeadline
eventStart
eventEnd

participationType
maxParticipants
maxTeams

isPaid
price
revenue

mode
location
geoLocation

status
participantsCount
createdAt
updatedAt
```

Event types include:

```text
hackathon
workshop
expert-talk
competition
meetup
```

Participation types:

```text
solo
duo
squad
```

Status:

```text
draft
published
completed
```

---

# 11. MONGODB GEOLOCATION

This is an advanced talking point.

The Event model stores:

```text
geoLocation
   type: "Point"
   coordinates: [longitude, latitude]
```

and uses a:

```text
2dsphere index
```

### Why?

To efficiently perform geographical/location-based queries.

### Important

GeoJSON coordinate order:

```text
[longitude, latitude]
```

NOT:

```text
[latitude, longitude]
```

---

# 12. AUTHENTICATION

## Organizer login flow

```text
Email + Password
       ↓
Express login endpoint
       ↓
Find organiser
       ↓
bcrypt.compare()
       ↓
Credentials valid?
       ↓
JWT.sign()
       ↓
HTTP-only cookie
       ↓
Future requests
       ↓
JWT middleware
       ↓
jwt.verify()
       ↓
Find organiser
       ↓
req.organiser
       ↓
Protected controller
```

The organizer JWT is configured for 7 days.

---

# 13. JWT

JWT = JSON Web Token.

It allows the backend to identify an authenticated user.

Conceptually:

```text
JWT
 ├── Header
 ├── Payload
 └── Signature
```

EventBy puts the organiser ID in the payload.

```text
{ id: organiser._id }
```

Backend signs it using a secret.

Later:

```text
jwt.verify(token, JWT_SECRET)
```

### Authentication vs Authorization

```text
Authentication
= Who are you?

Authorization
= Are you allowed to do this?
```

---

# 14. HTTP-ONLY COOKIE

EventBy's organizer auth uses a cookie:

```text
organiser_token
```

Important cookie settings:

```text
httpOnly
secure in production
sameSite = strict
```

### Why HTTP-only?

JavaScript cannot directly read an HTTP-only cookie, reducing exposure of the token to client-side scripts.

---

# 15. PASSWORD SECURITY

Never store:

```text
password = "mypassword123"
```

Instead:

```text
Plain Password
      ↓
bcrypt
      ↓
Hash
      ↓
MongoDB
```

During login:

```text
Entered Password
      ↓
bcrypt.compare()
      ↓
Stored Hash
      ↓
true / false
```

---

# 16. CLOUDINARY + MULTER

Images should not be stored as huge binary data directly inside normal event documents.

Flow:

```text
Image selected
      ↓
FormData
      ↓
Axios
      ↓
Multer
      ↓
Cloudinary
      ↓
Image URL
      ↓
MongoDB Event.banner
```

Multer handles the incoming file.

Cloudinary stores the media.

MongoDB stores the URL/reference.

---

# 17. WHY FORMDATA?

JSON is good for normal text/data:

```json
{
  "title": "Hackathon",
  "price": 500
}
```

But when sending:

```text
text + image
```

use:

```text
multipart/form-data
```

So the frontend can send:

```text
FormData
 ├── title
 ├── description
 ├── pricing
 └── banner → image
```

---

# 18. RAZORPAY

For paid events, Razorpay handles payment processing.

Conceptually:

```text
User chooses paid event
        ↓
Registration/payment flow
        ↓
Backend creates/handles payment
        ↓
Razorpay
        ↓
Payment result
        ↓
Backend records payment
        ↓
Registration/event participation
```

### Important interview distinction

Your backend should not blindly trust the browser saying:

> "Payment successful."

Payment state should be verified using the payment provider/backend flow before treating a registration as successfully paid.

---

# 19. SOCKET.IO

Socket.IO is for **real-time, bidirectional communication**.

Normal HTTP:

```text
Client → Request → Server
Client ← Response ← Server
```

Real-time:

```text
Client ←──────→ Server
       persistent connection
```

Possible EventBy use cases:

- Announcements
- Real-time updates
- Live communication/events
- Notifications

The server creates an HTTP server and attaches Socket.IO to it.

---

# 20. FIREBASE

EventBy also integrates Firebase/Firebase Admin.

Know the distinction:

```text
Firebase client SDK
→ used from frontend for Firebase services

Firebase Admin SDK
→ trusted server-side Firebase operations
```

Do not automatically say:

> "Firebase handles our complete authentication."

Be precise about the specific feature being discussed.

---

# 21. SECURITY

EventBy uses several security-related mechanisms.

## Helmet

Adds security-related HTTP headers.

## CORS

Controls which browser origins can communicate with the backend.

```text
Allowed Frontend
       ↓
Backend
       ✓

Unknown origin
       ↓
Backend
       ✗
```

## Cookies

Authentication token can be stored in HTTP-only cookie.

## bcrypt

Passwords are hashed.

## JWT

Authenticated requests are verified.

## Input validation

Backend validates important event fields instead of trusting the frontend.

---

# 22. ERROR HANDLING

There are two important levels.

### Controller-level

Specific failures return appropriate status codes:

```text
400 → invalid request
401 → not authenticated
403 → forbidden/disabled
404 → not found
500 → server error
```

### Global Express error handler

```text
Request
  ↓
Route / Controller
  ↓
Error
  ↓
Global error middleware
  ↓
JSON error response
```

The app has a global Express error handler.

---

# 23. ROUTES TO REMEMBER

### User

```text
/users/...
/teams/...
```

### Organizer

```text
/api/organiser/auth/...
/api/event/...
```

### Explorer

```text
/api/explorer/...
```

### Admin

```text
/api/admin/...
/api/admin/dashboard/...
/api/admin/top-events/...
/api/admin/organisers/...
```

Health check:

```text
GET /health
```

Response:

```json
{
  "status": "ok"
}
```

---

# 24. ORGANIZER EVENT API

Know these examples:

```text
POST   /api/event
GET    /api/event
GET    /api/event/:id
PUT    /api/event/:id
DELETE /api/event/:id
PATCH  /api/event/:id/status

GET    /api/event/dashboard/stats
GET    /api/event/:id/analytics

POST   /api/event/:id/announcements
GET    /api/event/:id/announcements
POST   /api/event/broadcast
```

Most organizer event routes are protected by organizer authentication.

---

# 25. DEPLOYMENT — UNDERSTAND THE PICTURE

EventBy is deployed as multiple web applications plus a backend.

```text
                         INTERNET
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
          ▼                 ▼                 ▼
   User Frontend     Organizer Frontend   Admin Frontend
      Render              Render             Render
          │                 │                 │
          └─────────────────┼─────────────────┘
                            │
                            ▼
                    EventBy Backend
                       Render
                            │
                ┌───────────┼────────────┐
                │           │            │
                ▼           ▼            ▼
             MongoDB    Cloudinary    Firebase
                │
                │
             Payments
                │
                ▼
             Razorpay
```

The backend creates an HTTP server, attaches Socket.IO, connects to MongoDB, and listens on `process.env.PORT` (with a local fallback). Deployment URLs/origins are configured for Render-hosted frontend/backend applications.

---

# 26. WHAT HAPPENS DURING DEPLOYMENT?

## Frontend

```text
React source
   ↓
npm run build
   ↓
Vite production build
   ↓
Static production files
   ↓
Hosting platform
```

## Backend

```text
Node/Express source
       ↓
Install dependencies
       ↓
Environment variables
       ↓
Connect MongoDB
       ↓
Start server
       ↓
Listen on PORT
```

## Environment variables

Never hardcode secrets.

Typical examples:

```text
MONGODB_URI
JWT_SECRET
CLOUDINARY_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
Firebase credentials/config
```

---

# 27. LOCAL VS PRODUCTION

```text
LOCAL

React
localhost:5173
      ↓
Backend
localhost:5000/8000
      ↓
MongoDB / external services


PRODUCTION

React frontend
      ↓
HTTPS
      ↓
Render backend
      ↓
MongoDB Atlas
      ↓
Cloudinary / Firebase / Razorpay
```

Important deployment concerns:

- Correct API base URL
- CORS
- Cookies/credentials
- HTTPS
- Environment variables
- Production frontend URLs
- Backend `PORT`
- Database connection
- Third-party service credentials

---

# 28. WHY CORS MATTERS HERE

Suppose:

```text
Frontend:
https://eventby.onrender.com

Backend:
https://eventby-server.onrender.com
```

These are different origins.

Browser security rules apply.

Backend therefore needs to explicitly allow trusted frontend origins.

Because authentication uses cookies, credentials also need to be configured correctly.

---

# 29. WHY `credentials: true` MATTERS

For cookie-based authentication:

```text
Browser
   ↓
Request + Cookie
   ↓
Backend
```

Cross-origin frontend/backend setups require proper credential configuration on both sides.

Remember:

```text
Frontend request:
credentials included

Backend CORS:
credentials allowed
```

---

# 30. REQUEST LIFECYCLE — MASTER THIS

If interviewer asks:

> "Explain how your frontend talks to your backend."

Say:

```text
User interaction
      ↓
React component
      ↓
Axios request
      ↓
HTTP/HTTPS
      ↓
Express route
      ↓
Middleware
      ↓
Controller
      ↓
Mongoose
      ↓
MongoDB
      ↓
Controller creates response
      ↓
JSON response
      ↓
Axios receives response
      ↓
React updates state/UI
```

This one diagram answers MANY questions.

---

# 31. COMMON INTERVIEW QUESTIONS

## Q1. Why MERN?

**Answer:**

> React gives a component-based frontend, Node and Express provide a JavaScript backend, and MongoDB works naturally with JavaScript objects and flexible document structures. Using JavaScript across the stack also reduces context switching.

---

## Q2. Why MongoDB?

> The application has document-oriented entities such as events, organisers and participation records. MongoDB provides flexible document storage and integrates well with Node.js through Mongoose.

---

## Q3. Why Mongoose?

> It gives us schemas, validation, models, references and a structured way to interact with MongoDB from Node.js.

---

## Q4. Why Axios?

> It provides a convenient HTTP client for communicating between the React frontend and Express backend, including request configuration, JSON handling and interceptors.

---

## Q5. What is middleware?

> Middleware is a function that runs during the request-response lifecycle before the final route handler. In our application it is used for authentication, file uploads, security and request processing.

---

## Q6. Authentication vs authorization?

> Authentication verifies who the user is. Authorization determines what that authenticated user is allowed to do.

---

## Q7. Why JWT?

> JWT provides a compact signed token that allows the backend to verify the identity of an authenticated user across subsequent requests.

---

## Q8. Why bcrypt?

> Passwords should never be stored as plaintext. bcrypt hashes passwords and allows secure password comparison during login.

---

## Q9. Why Cloudinary?

> Cloudinary provides dedicated media storage and delivery. Instead of storing large image binaries in MongoDB, we store the resulting image URL.

---

## Q10. Why Multer?

> Multer parses multipart/form-data requests and handles incoming files so the backend can process/upload them.

---

## Q11. Why Socket.IO?

> HTTP is request-response based. Socket.IO provides persistent real-time communication where the server can push updates to connected clients.

---

## Q12. What is a 2dsphere index?

> It is a MongoDB geospatial index designed for spherical geographic queries using GeoJSON coordinates.

---

## Q13. What happens if JWT is invalid?

```text
Request
 ↓
JWT middleware
 ↓
jwt.verify()
 ↓
throws error
 ↓
401 Unauthorized
```

---

## Q14. What happens if MongoDB is down?

> Database operations fail, the backend should catch the error and return an appropriate server-side error rather than crashing the application. In production I would also add monitoring, retries where appropriate, health checks and proper logging.

---

## Q15. How would you scale EventBy?

Start simple:

```text
Load Balancer
      ↓
Multiple Node instances
      ↓
Shared MongoDB
      ↓
Redis/cache
```

Then:

- Database indexing
- Pagination
- Caching
- CDN for images
- Horizontal scaling
- Background jobs
- Rate limiting
- Monitoring/logging
- Database optimization

---

# 32. PERFORMANCE QUESTIONS

### How would you improve event listing performance?

```text
1. Database indexes
2. Pagination
3. Projection — fetch only required fields
4. Aggregation optimization
5. Cache frequently accessed data
6. CDN for images
7. Debounce search requests
```

### Why pagination?

Without pagination:

```text
100,000 events
      ↓
send everything
      ↓
slow response
      ↓
large payload
```

With pagination:

```text
100,000 events
      ↓
20 events/page
      ↓
small response
```

---

# 33. SECURITY QUESTIONS

Possible improvements:

```text
HTTPS
Helmet
CORS
HTTP-only cookies
bcrypt
JWT validation
Input validation
Rate limiting
Role-based authorization
Secure environment variables
Payment verification
File type/size validation
```

### Never say:

> "The frontend protects the API."

Frontend protection is not enough.

**Backend must enforce authorization.**

---

# 34. IF THEY ASK "WHAT WAS YOUR HARDEST PROBLEM?"

Use a REAL problem you understand.

Strong examples from this architecture:

### Option 1 — File upload

> Handling event creation with both structured form data and image upload required multipart/form-data, Multer processing and Cloudinary storage while keeping the database record consistent.

### Option 2 — Authentication

> Handling JWT authentication with HTTP-only cookies required correct middleware, token verification, CORS and credential configuration between separate frontend and backend origins.

### Option 3 — Geolocation

> Storing location correctly required understanding GeoJSON's longitude-latitude ordering and MongoDB's 2dsphere index.

Pick the one you can actually explain technically.

---

# 35. IF THEY ASK "WHAT WOULD YOU IMPROVE?"

Good answer:

> "I would improve the system in several areas: add stronger request validation and rate limiting, introduce caching for high-read endpoints, improve automated testing and CI/CD, add centralized monitoring, and further optimize database queries and indexes as traffic grows."

Do not say:

> "Nothing, everything is perfect."

---

# 36. IF THEY ASK "HOW WOULD YOU SCALE IT TO 1 MILLION USERS?"

```text
                         LOAD BALANCER
                              |
                 +------------+------------+
                 |            |            |
                 ▼            ▼            ▼
              Node 1       Node 2       Node 3
                 |            |            |
                 +------------+------------+
                              |
                         Redis Cache
                              |
                         MongoDB
                      /               \
                 Primary            Replica(s)

External:
Cloudinary → CDN/media
Razorpay → payments
Socket.IO → real-time layer
```

Mention:

- Horizontal scaling
- Load balancing
- Redis
- MongoDB indexes
- Read replicas where appropriate
- CDN
- Queue/background jobs
- Rate limiting
- Monitoring

---

# 37. DO NOT GET CAUGHT BY THESE

### Don't claim:

❌ "Axios is the backend."

❌ "MongoDB is SQL."

❌ "JWT encrypts everything."

❌ "bcrypt encrypts passwords."

❌ "Cloudinary is our database."

❌ "React directly talks to MongoDB."

❌ "Frontend authentication is enough."

❌ "Socket.IO is just another REST API."

❌ "CORS is authentication."

### Correct mental model:

```text
React
 ↓
Axios
 ↓
Express
 ↓
Middleware
 ↓
Controller
 ↓
Mongoose
 ↓
MongoDB
```

---

# 38. 30-SECOND TECHNOLOGY DEFINITIONS

If the interviewer rapidly asks definitions:

**React:** UI library for building component-based interfaces.

**Node.js:** JavaScript runtime that allows JavaScript to run outside the browser.

**Express:** Minimal web framework for Node.js used to build APIs/server routes.

**Axios:** HTTP client used to communicate with APIs.

**MongoDB:** NoSQL document database.

**Mongoose:** ODM for MongoDB.

**JWT:** Signed token used for stateless authentication.

**bcrypt:** Password hashing algorithm/library.

**Middleware:** Function executed during request-response processing.

**REST API:** HTTP-based API style using resources and methods.

**Cloudinary:** Cloud media storage/delivery service.

**Multer:** Middleware for handling multipart file uploads.

**Socket.IO:** Real-time bidirectional communication library.

**CORS:** Browser security mechanism controlling cross-origin requests.

**Helmet:** Middleware that sets security-related HTTP headers.

**Razorpay:** Payment gateway.

**Firebase:** Backend/mobile/web services platform; EventBy uses Firebase client/admin integration.

**Render:** Cloud hosting platform used for deployment.

---

# 39. FINAL INTERVIEW MENTAL MAP

Before entering the interview, remember only this:

```text
                    EVENTBY
                       |
       +---------------+---------------+
       |               |               |
      USER         ORGANISER         ADMIN
       |               |               |
       +---------------+---------------+
                       |
                    React
                       |
                    Axios
                       |
                  HTTP/HTTPS
                       |
                    Express
                       |
              +--------+--------+
              |        |        |
           Router  Middleware Controller
                              |
                           Mongoose
                              |
                           MongoDB

External integrations:
-----------------------------------------
Cloudinary → images
Razorpay   → payments
Firebase   → Firebase services
Socket.IO  → real-time
Render     → deployment
```

And the **single most important request flow**:

```text
USER ACTION
    ↓
REACT
    ↓
AXIOS
    ↓
EXPRESS ROUTE
    ↓
MIDDLEWARE
    ↓
CONTROLLER
    ↓
MONGOOSE
    ↓
MONGODB
    ↓
RESPONSE
    ↓
REACT UI
```

If he understands this deeply, he can reconstruct most answers instead of memorizing them.

---

# 40. EXCALIDRAW PROMPTS

Use these as separate prompts. **Do not try to put every concept into one giant diagram.**

---

## DIAGRAM 1 — MASTER ARCHITECTURE

**Prompt:**

> Create a clean professional software architecture diagram for a full-stack event management platform called "EventBy". Use a left-to-right flow. On the left show three separate actors/interfaces: User Web App, Organizer Web App, Admin Web App. All three are React + Vite frontends. Connect them to a central Node.js + Express REST API. Inside the backend show CORS, Helmet, Cookie Parser, Routes, Authentication Middleware, Controllers, Mongoose Models, and Global Error Handler. From the backend connect to MongoDB as the primary database. Also show external integrations: Cloudinary for image uploads, Razorpay for payments, Firebase/Firebase Admin for Firebase services, and Socket.IO for real-time communication. Show Render as the deployment/hosting layer around the web apps and backend. Use clear arrows, short labels, grouped boxes, and minimal text. Make the diagram easy to explain verbally in an interview.

---

## DIAGRAM 2 — REQUEST/RESPONSE FLOW

**Prompt:**

> Create a detailed sequence-style architecture diagram showing how a user action travels through EventBy. Start with User Browser → React Component → Axios → HTTP/HTTPS → Express Router → Middleware → Controller → Mongoose → MongoDB. Then show the response path returning from MongoDB → Mongoose → Controller → JSON Response → Axios → React State/UI. Add a side branch from Middleware for JWT Authentication and another side branch from Controller for Cloudinary/Razorpay where appropriate. Clearly label "Frontend", "Backend", "Database", and "External Services". Make it visually simple and suitable for explaining in an Infosys technical interview.

---

## DIAGRAM 3 — CREATE EVENT FLOW

**Prompt:**

> Create a detailed flowchart for EventBy's "Create Event" feature. Start with Organizer filling the Create Event form in React. Then FormData → Axios POST /api/event → Express Router → protectOrganiser JWT middleware → Multer file upload → Cloudinary image storage → createEvent controller. Inside createEvent show validation of required fields, participation calculation, pricing calculation, offline/online location handling, GeoJSON Point creation for offline events, and event status set to published. Then show Mongoose Event.create → MongoDB → create announcement group → 201 Created JSON response → React UI update. Use decision diamonds for paid/free event and online/offline event. Make it clean, hierarchical, and easy to narrate.

---

## DIAGRAM 4 — AUTHENTICATION FLOW

**Prompt:**

> Create a security architecture diagram for EventBy organizer authentication. Show Organizer → Login Form → React → Axios → Express Login Route → Find Organizer in MongoDB → bcrypt.compare(password, storedHash) → if valid generate JWT using JWT_SECRET → set HTTP-only secure same-site organiser_token cookie → response. Then show a second request path: Browser sends cookie → protectOrganiser middleware → extract token → jwt.verify → find organiser → check organiser is active → attach req.organiser → protected controller. Show failure branches for missing/invalid/expired token returning 401 and disabled organiser returning 403. Use a clean security-focused layout.

---

## DIAGRAM 5 — DEPLOYMENT

**Prompt:**

> Create a production deployment diagram for EventBy. Show Internet at the top. Under it show three separately deployed React/Vite applications: User Frontend, Organizer Frontend, Admin Frontend, all hosted on Render. Connect all three over HTTPS to the EventBy Node.js + Express Backend hosted on Render. From the backend connect to MongoDB/MongoDB Atlas, Cloudinary, Firebase/Firebase Admin, Razorpay, and Socket.IO. Show environment variables/secrets between the deployment platform and backend without exposing secret values. Add labels for CORS, HTTPS, API base URL, PORT, and database connection. Make it a clean cloud deployment architecture diagram.

---

## DIAGRAM 6 — DATABASE / EVENT MODEL

**Prompt:**

> Create a simplified ER-style data model diagram for EventBy focused on the Event entity. Put Event in the center with fields: organiser, title, description, eventType, rules, banner, registrationDeadline, eventStart, eventEnd, participationType, maxParticipants, maxTeams, isPaid, price, revenue, mode, location, geoLocation, status, participantsCount, createdAt, updatedAt. Connect Event to Organiser, EventParticipation, Payment, EventPass, and AnnouncementGroup. Show Organiser as the owner/creator relationship. Keep only important fields in connected entities. Highlight geoLocation as GeoJSON Point with a 2dsphere index. Use a clean database-design style.

---

# 41. LAST 15-MINUTE REVISION

If there is almost no time, read ONLY these:

### 1. Project

```text
EventBy = event management platform
User + Organizer + Admin
```

### 2. Stack

```text
React + Vite
Node + Express
MongoDB + Mongoose
JWT + bcrypt
Cloudinary
Razorpay
Socket.IO
Firebase
Render
```

### 3. Main flow

```text
React
 ↓
Axios
 ↓
Express
 ↓
Middleware
 ↓
Controller
 ↓
Mongoose
 ↓
MongoDB
```

### 4. Authentication

```text
Login
 ↓
bcrypt.compare
 ↓
JWT
 ↓
HTTP-only cookie
 ↓
JWT middleware
 ↓
Protected route
```

### 5. Create event

```text
FormData
 ↓
Multer
 ↓
Cloudinary
 ↓
Validation/business logic
 ↓
MongoDB
```

### 6. Advanced points

```text
2dsphere → location queries
Socket.IO → real-time
Razorpay → payments
Cloudinary → images
Render → deployment
```

### 7. Best scaling answer

```text
Load Balancer
 ↓
Multiple Node instances
 ↓
Redis
 ↓
MongoDB + indexes
 ↓
CDN / Cloudinary
```

### 8. Golden sentence

> **"The frontend communicates with our Express REST API through Axios. Requests pass through authentication and other middleware, reach controllers containing the business logic, and the controllers use Mongoose to interact with MongoDB. External services such as Cloudinary, Razorpay, Firebase and Socket.IO handle specialized functionality."**

---

# SOURCE OF TRUTH

This guide is based on the current EventBy repository implementation, especially:

- `server/app.js`
- `server/server.js`
- `server/package.json`
- `client/user/package.json`
- organizer authentication middleware/controller
- organizer event routes
- event controller
- Event Mongoose model
- Cloudinary configuration

**Important:** If the interviewer asks about a feature, answer according to what is actually implemented in the repository rather than claiming an unrelated technology was used.
