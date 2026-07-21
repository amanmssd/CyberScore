# CyberScore Product Roadmap

## Phase 1 — Core Assessment Experience

Status: Completed

### Completed

- Landing page
- Multi-step cybersecurity assessment
- Weighted category scoring
- Results dashboard
- Cyber Journey progression
- Top priorities
- Improvement checklist
- Recharts score visualization
- Responsive design
- Security Health category card
- Expandable category details
- Animated score counter
- Animated progress bars
- Smooth accordion transitions
- Checklist completion animations
- Live dashboard score recalculation
- Dynamic category recalculation

### Remaining polish

- Accessibility audit
- Additional mobile testing
- Empty and error states where needed
- Optional local draft persistence

## Phase 2A — Authentication Foundation

Status: Completed

### Completed

- Supabase client setup
- Environment variable structure
- React AuthProvider
- Session initialization
- Auth state listener
- Google OAuth frontend integration
- Sign-out flow
- Optional sign-in after assessment completion
- Save progress authentication interface
- Visible loading and configuration-error states
- Authentication blank-screen repair
- Privacy-conscious account interface with no identity details displayed

### Important

- Authentication UI is implemented, but OAuth providers still require configuration in Supabase and their external provider dashboards.
- No assessment records are saved yet.

## Phase 2B — OAuth Provider Configuration

Status: Next

### Planned

- Configure Google provider in Supabase
- Configure Google OAuth consent screen and credentials
- Implement Microsoft/Azure OAuth frontend integration
- Configure Microsoft/Azure provider in Supabase
- Configure Microsoft Entra app registration
- Add localhost redirect URLs
- Add production redirect URLs
- Test Google sign-in
- Test Microsoft sign-in
- Test sign-out
- Test session restoration after refresh
- Test canceled and failed OAuth attempts

## Phase 2C — Database and Row Level Security

Status: Planned

### Planned

- Design assessments table
- Decide whether category scores should use JSONB or normalized child rows
- Create optional profiles table only if needed
- Associate assessments with auth.users
- Enable Row Level Security
- Add SELECT policy for a user’s own records
- Add INSERT policy for a user’s own records
- Add UPDATE and DELETE policies only where required
- Add created_at and updated_at timestamps
- Add appropriate indexes
- Test policies using multiple accounts
- Confirm anonymous users cannot access private assessment data

## Phase 2D — Assessment Persistence

Status: Planned

### Planned

- Preserve completed assessment results through OAuth redirect
- Save the completed assessment after successful sign-in
- Prevent accidental duplicate saves
- Show clear save success and failure feedback
- Load the user’s saved assessments
- Display assessment history
- Support retaking an assessment
- Show score changes over time
- Allow users to delete their own history
- Handle expired sessions safely

## Phase 3 — Security Tools and Education

Status: Planned

### Planned

- Password strength analyzer
- Password breach checking through a privacy-conscious API design
- MFA setup guides
- Training videos
- Security learning content
- Recommendation-specific resources
- Progress analytics
- Category trends
- Achievement and milestone system

## Phase 4 — Premium SaaS Features

Status: Planned

### Planned

- Stripe integration
- Subscription plans
- Premium reports
- Advanced assessment history
- Personalized recommendations
- Exportable reports
- Premium educational content
- Subscription management

## Phase 5 — Organization and Enterprise Features

Status: Planned

### Planned

- Organization accounts
- Team dashboards
- Aggregated reporting
- Role-based access
- Employee assessment campaigns
- Security training administration
- Enterprise integrations
- Administrative analytics
- Privacy and compliance controls

## Technology Direction

- Frontend: React, TypeScript, Vite, and Recharts
- Backend: Supabase, PostgreSQL, and planned Edge Functions
- Authentication: Google OAuth and Microsoft/Azure OAuth through Supabase Auth
- Local persistence: optional draft and checklist state only
- Cloud persistence: Supabase database with Row Level Security
- Payments: Stripe planned for Phase 4

## Long-Term Vision

CyberScore aims to become a personal cybersecurity companion that helps users:

- Understand their security posture
- Track improvement over time
- Learn cybersecurity best practices
- Build stronger digital habits
- Protect their online identity through actionable guidance
