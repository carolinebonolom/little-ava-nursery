# Little Ava Nursery - Project TODO

## Infrastructure & Branding
- [x] Database schema (users, children, rooms, activities, bookings, waiting list, absences, news, gallery, staff)
- [x] Global styles, color palette, typography (calm nursery-appropriate)
- [x] Logo integration across all pages
- [x] Navigation structure (public + portal)

## Public Website Pages
- [x] Home page with hero, features overview, CTAs
- [x] About Us page
- [x] Vision & Values page
- [x] Meet the Team page
- [x] Rooms & Age Groups page (3 months - 5 years)
- [x] Curriculum & Learning page
- [x] Daily Routine page
- [x] Meals & Nutrition page
- [x] Fees & Funding page
- [x] Opening Hours page
- [x] Admissions & Registration page
- [x] Waiting List page (public sign-up)
- [x] Term Dates & Closures page
- [x] Safeguarding page
- [x] SEND (Special Educational Needs) page
- [x] News & Events page
- [x] Gallery page (public)
- [x] Testimonials page
- [x] Careers page
- [x] Contact Us page
- [x] FAQ page
- [x] Policies & Documents page
- [x] Privacy Policy page
- [x] Cookie Policy page
- [x] Terms & Conditions page

## Parent Portal
- [x] Parent registration and login
- [x] Child profile management
- [x] Session booking and requests
- [x] Waiting list sign-up from portal
- [x] Absence reporting
- [x] Invoice and document access
- [x] Parent dashboard overview

## Real-Time Activity Feed
- [x] Staff can log meals, drinks, nappy changes, naps, activities
- [x] Parents can view timestamped activity entries per child
- [x] Activity notifications to parents

## Staff & Admin Dashboard
- [x] Staff login with role-based access
- [x] Log child activities
- [x] Manage attendance
- [x] View child profiles
- [x] Admin: manage staff, rooms, settings
- [x] Admin: view analytics and reports

## Notifications
- [x] Push notifications for activity updates
- [x] Session confirmations
- [x] Absence acknowledgements
- [x] News and announcements

## AI Features
- [x] AI-powered chatbot for FAQs
- [x] Chatbot guides users to correct pages/forms

## Booking & Admissions
- [x] Book a Visit form
- [x] Trial session requests
- [x] Digital admissions/registration form (paperless)

## Compliance & Policies
- [x] Ofsted/DfE compliance section
- [x] Downloadable policies
- [x] GDPR-compliant consent and data handling
- [x] Safeguarding information
- [x] SEND support details

## Media Gallery
- [x] Staff upload photos to child profiles
- [x] Privacy controls (only visible to authorised parents)

## Scalability
- [x] Multi-location support architecture
- [x] Mobile-responsive design throughout

## Enhancement Phase 2 - New Features

### Site Information Updates
- [x] Add company number 17116408 to footer and relevant pages
- [x] Add phone number +447386096634 with WhatsApp integration
- [x] Update domain reference to littleavanursery.co.uk
- [x] WhatsApp Business button on contact page and floating widget

### Newsletter System
- [x] Newsletter subscription form on website
- [x] Admin can compose and send newsletters to subscribers
- [x] Unsubscribe functionality

### Staff Training & Compliance Tracker
- [x] Staff training records (DBS, First Aid, Safeguarding, Food Hygiene, Paediatric First Aid)
- [x] Expiry date tracking with reminders
- [x] Training compliance dashboard for management
- [x] Certificate upload capability (S3 storage integration with admin UI)

### Digital Document Signing
- [x] Send documents to parents/staff for e-signature
- [x] Parents can sign consent forms, contracts, policies digitally
- [x] Staff can sign employment documents
- [x] Document return tracking and status

### Incident & Accident Reporting
- [x] Digital incident/accident form for staff
- [x] Parent notification of incidents
- [x] Incident log for Ofsted compliance

### Medication Administration Log
- [x] Record medication given to children
- [x] Parent consent for medication
- [x] Medication schedule tracking

### Visitor Sign-In Book (Digital)
- [x] Digital visitor registration
- [x] Sign-in/sign-out times
- [x] Purpose of visit recording
- [x] Fire drill/evacuation records

### Child Development Milestones
- [x] EYFS milestone tracking per child
- [x] Progress notes and observations
- [x] Parent visibility of milestones

### Additional Research-Based Features
- [x] Staff shift scheduling/rota management
- [x] Parent satisfaction surveys
- [x] Emergency contact quick-access view
- [x] Occupancy planner (visual room capacity) - full UI with progress bars and colour-coded status
- [x] Enquiry management pipeline

### Gap Fixes (Phase 2.5)
- [x] Add unsubscribe link in newsletter emails and unsubscribe page
- [x] Build document management UI for admin to send documents
- [x] Build parent-facing document signing interface in parent dashboard
- [x] Trigger parent notification when incident is reported
- [x] Build fire drill logging UI and router procedures
- [x] Build milestone/observations UI for staff to log EYFS milestones
- [x] Build parent-facing milestone view in parent dashboard


## CRITICAL RESTRUCTURING (Phase 3)
- [x] Implement role-based authentication: parent, staff, admin separate logins
- [x] Add parent registration form with email/password
- [x] Add staff login (shared, no individual profiles)
- [x] Add admin login
- [x] Rebuild parent dashboard: only show own children, read-only activity feed
- [x] Rebuild staff dashboard: clock in/out, activity logging (meals, nappy, drinks, snacks, activities)
- [x] Ensure activity updates only go to correct parents (child-specific routing)
- [x] Add downloadable policies (Privacy, Cookie, Terms, Safeguarding, SEND, etc.) - 20 policies with full text content
- [x] Fix all policy links to download/view
- [x] Rebuild admin dashboard: document management, send to parents/staff
- [x] Test all logins and access control
- [x] Test activity logging and parent notifications
- [x] Verify role-based access control on all dashboards

## Gap Fixes (Phase 3.5)
- [x] Restrict activities.log to staffProcedure (prevent parents from logging activities)
- [x] Extend admin document-management UI to target parent recipients
- [x] Add automated tests for login/access-control flows (9 tests passing)

## Bug Fixes & Changes (User Feedback Round 1)
- [x] Fix "Parent Portal" button in nav - currently shows as management portal, should go to parent login
- [x] Remove Daily Reports, Photo Gallery, Nap Updates, Meals Logged stats from public homepage - these belong inside parent portal only
- [x] Set up management login with email mendy_caroline@yahoo.com and password "password" (changeable later)
- [x] Allow management to change their email and password from the dashboard
- [x] Simplify staff compliance: just show training up-to-date vs expired (remove certificate upload feature)
- [x] Move all staff compliance info to management dashboard only (not public, not staff-facing)
- [x] Ensure staff can access children profiles and log activities (meals, nappy, drinks, etc.)
- [x] Ensure parents receive notifications when staff log activities for their children
- [x] Verify parent portal shows activity feed from staff logging

## Gap Fixes (Feedback Round 1 - Follow-up)
- [x] Add account settings UI in admin dashboard (change email/password)
- [x] Add admin UI to create/manage staff accounts with login credentials
- [x] Verify Parent Portal nav button routes to parent login flow (nav → /parent-portal → redirects to /login/parent if not logged in)

## Bug Fixes (Feedback Round 2)
- [x] Add visible Management Login link to the website (in footer Quick Links section)
- [x] Add visible Staff Login link to the website (in footer Quick Links section)

## Restructure (Feedback Round 3)
- [x] Change staff login to room-based (one login per room, e.g. babyroom1/password)
- [x] Management creates room logins from Settings tab (not individual staff accounts)
- [x] Management can add children with full details and assign to a room
- [x] Management can move children between rooms
- [x] Staff dashboard shows only children in their room
- [x] Staff can log activities (meals, nappy, drinks, naps) for children in their room
- [x] Parents can register their own account and get linked to their child
- [x] Parents receive notifications when staff log activities for their child
- [x] All buttons work correctly (no broken functionality)

## Fixes (Feedback Round 4)
- [x] Pre-create room logins with room names as usernames and "test1" as password for all rooms
- [x] Fix room login creation in Settings so management can change room passwords
- [x] Add staff management: management can add individual staff with personal details and compliance checklist
- [x] Staff compliance checklist: DBS, First Aid, Safeguarding, Food Hygiene, Paediatric First Aid - up-to-date vs expired
- [x] Restrict parent portal: remove ability to add children
- [x] Parent portal: only view children profile, send sickness reports, request sessions
- [x] Clean up staff dashboard: only show room children + activity logging (nothing else)
- [x] Clean up parent dashboard: only show children profile + sickness + session requests + notifications
- [x] Clean up admin dashboard: ensure all management features are accessible and relevant

## Staff & Parent Dashboard Expansion (Feedback Round 5)
- [ ] Staff Dashboard: Add Activity Log tab (already exists, verify)
- [ ] Staff Dashboard: Add Attendance tab (mark children present/absent for the day)
- [ ] Staff Dashboard: Add Visits tab (log visitor interactions with children)
- [ ] Staff Dashboard: Add Children tab (view children in their room - already exists, verify)
- [ ] Staff Dashboard: Add Absences tab (record child absences with reason)
- [ ] Staff Dashboard: Add Messages tab (send messages to parents)
- [ ] Staff Dashboard: Add News tab (view/post nursery news)
- [ ] Staff Dashboard: Add Incidents tab (log incidents for children)
- [ ] Staff Dashboard: Add Medication tab (log medication given to children with time)
- [ ] Staff Dashboard: Add Visitors tab (log visitors to the room)
- [ ] Parent Dashboard: Add Activity Log tab (view activities for their child)
- [ ] Parent Dashboard: Add Messages tab (receive messages from nursery)
- [ ] Parent Dashboard: Add News tab (view nursery news)
- [ ] Parent Dashboard: Add Incidents tab (view incidents about their child)
- [ ] Parent Dashboard: Add Medication tab (view medication given/prescribed with times + disclaimer note)
- [ ] Medication disclaimer: "Not all medication can be given or administered to the child"
- [ ] All staff logging triggers parent notifications for their child
