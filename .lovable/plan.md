

# SafeHerRide – Technical Prototype Plan

## Overview
A women-first safety-focused ride-hailing web app that demonstrates core ride-booking flows with real authentication, interactive maps, and safety intelligence. Built as a responsive web app with Supabase backend.

---

## Phase 1: Foundation & Authentication

### Landing Page
- Bold, safety-focused hero section with SafeHerRide branding
- Clear CTAs for riders ("Book a Ride") and drivers ("Drive with Us")
- Key value propositions: safety scores, female driver preference, SOS system

### Auth System (Supabase Auth)
- **User signup/login** with email + password (and Google OAuth)
- **Driver signup** with additional document upload step (license, RC book, vehicle photos, govt ID)
- **Admin login** with email + password
- Role-based access system (User / Driver / Admin) using a separate `user_roles` table
- Session persistence and auto-redirect based on role

### User Profiles & Driver Profiles
- User profiles: name, phone, emergency contacts (optional)
- Driver profiles: vehicle type (bike/car), night ride availability, document status, approval status
- Drivers start as "pending" until admin approves

---

## Phase 2: Ride Booking + Map

### Ride Booking Page
- **Pickup**: Manual address entry with map pin placement (Leaflet + OpenStreetMap)
- **Drop-off**: Search-based location entry with map pin
- **Driver preference**: Female driver (default), option to allow male drivers
- **Route options**: Fastest / Safest / Balanced (visual route display on map)
- Fare estimate display (distance-based mock calculation)
- Vehicle type selection (Bike / Car)

### Live Map Page
- Interactive Leaflet map showing ride route as polyline
- Simulated driver movement along route (for prototype)
- Ride status updates: Searching → Driver assigned → En route → Arrived → Trip started → Completed
- Driver info card (name, vehicle, rating)

### Mock Matching System
- Simulated driver assignment with short delay
- Driver pool from seeded/approved driver accounts

---

## Phase 3: Safety Intelligence

### Safety Score Engine
- Calculate a safety score (1-100) based on:
  - Time of day (lower scores at night)
  - Predefined area risk levels (stored in database)
  - Route type indicators
- Display score prominently before ride confirmation
- If score is low: show warning banner, suggest safer alternative route, allow user to override with confirmation

### SOS System
- Persistent SOS button visible during active rides
- On trigger: logs alert to database, marks ride as "emergency"
- Admin monitoring dashboard shows SOS alerts in real-time (Supabase Realtime)
- Simulated escalation flow

---

## Phase 4: Admin Dashboard

### Driver Verification Panel
- List of pending driver applications with uploaded documents
- Approve / Reject / Request re-upload actions
- Suspend or reactivate existing drivers

### Monitoring Dashboard
- List of active rides with status
- SOS alert feed (real-time)
- Basic analytics: total rides, active drivers, safety score distribution

---

## Phase 5: Supporting Features

### Guardian/Family Tracking
- Optional toggle to generate a shareable trip link
- Link shows live ride status on a simplified map view
- Can be disabled anytime

### Payments (Mock)
- Payment mode selection: UPI / Wallet / Cash
- Mock payment flow with states: Pending → Success / Failed
- Ride history page with past trips and payment status

### Driver Dashboard
- View incoming ride requests
- Accept/decline rides
- Toggle availability and night ride preference
- View earnings summary

---

## Pages Summary (11+)
1. Landing Page
2. Auth Page (Login / Signup with role selection)
3. Driver Signup & Document Upload
4. Rider Dashboard (Book a Ride)
5. Ride Booking Page (with map)
6. Live Ride Tracking Page
7. SOS System (integrated in ride view)
8. Guardian Tracking (shareable link page)
9. Admin – Driver Verification Panel
10. Admin – Monitoring Dashboard
11. Payments & Ride History
12. Driver Dashboard

---

## Technical Approach
- **Frontend**: React + Tailwind CSS + Leaflet/OpenStreetMap
- **Backend**: Supabase (PostgreSQL, Auth, Realtime, Edge Functions, Storage)
- **Maps**: Leaflet with OpenStreetMap tiles (free, no API key needed)
- **Real-time**: Supabase Realtime for ride status updates and SOS alerts
- **File storage**: Supabase Storage for driver document uploads
- **Safety scores**: Rule-based calculation in edge functions

