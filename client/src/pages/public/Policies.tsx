import PublicLayout from "@/components/PublicLayout";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye } from "lucide-react";
import { useLocation } from "wouter";
import { toast } from "sonner";

const policyContents: Record<string, string> = {
  "Safeguarding & Child Protection Policy": `LITTLE AVA NURSERY
SAFEGUARDING & CHILD PROTECTION POLICY

Company Registration: 17116408 | Location: West Midlands, England

1. POLICY STATEMENT
Little Ava Nursery is committed to safeguarding and promoting the welfare of all children in our care. We recognise our responsibility to protect children from harm and to ensure their safety and wellbeing at all times.

2. AIMS
- To provide a safe, caring environment for all children
- To identify children who may be suffering or at risk of significant harm
- To take appropriate action to ensure children are kept safe at home and at the nursery
- To work with other agencies to safeguard children

3. DESIGNATED SAFEGUARDING LEAD (DSL)
The nursery manager is the Designated Safeguarding Lead. All concerns must be reported to the DSL immediately.

4. RECRUITMENT & VETTING
All staff undergo enhanced DBS checks before employment. References are verified and qualifications confirmed. Staff are not left unsupervised with children until all checks are complete.

5. RECOGNISING ABUSE
Staff are trained to recognise signs of:
- Physical abuse
- Emotional abuse
- Sexual abuse
- Neglect

6. REPORTING CONCERNS
Any member of staff who has concerns about a child must:
1. Record their concerns immediately using the nursery's concern form
2. Report to the Designated Safeguarding Lead
3. Not investigate the matter themselves
4. Maintain confidentiality

7. WORKING WITH PARENTS
We work in partnership with parents to ensure the safety of children. We will share concerns with parents unless doing so would place the child at further risk.

8. MOBILE PHONES & CAMERAS
Personal mobile phones must not be used in childcare areas. Only nursery devices may be used for photographs, with parental consent.

9. WHISTLEBLOWING
Staff who have concerns about a colleague's behaviour must report this to the manager or directly to Ofsted/LADO if the concern involves the manager.

10. REVIEW
This policy is reviewed annually or following any safeguarding incident.

Last reviewed: June 2026
Next review: June 2027`,

  "Health & Safety Policy": `LITTLE AVA NURSERY
HEALTH & SAFETY POLICY

Company Registration: 17116408 | Location: West Midlands, England

1. POLICY STATEMENT
Little Ava Nursery is committed to providing a safe and healthy environment for all children, staff, and visitors.

2. RESPONSIBILITIES
The nursery manager has overall responsibility for health and safety. All staff share responsibility for maintaining a safe environment.

3. RISK ASSESSMENTS
Risk assessments are carried out for:
- All rooms and outdoor areas (daily visual checks)
- Activities and outings
- Equipment and resources
- Individual children with additional needs

4. FIRE SAFETY
- Fire drills are conducted at least once per half term
- Fire exits are clearly marked and kept clear
- Fire extinguishers are checked annually
- Evacuation procedures are displayed in all rooms

5. FIRST AID
- At least one paediatric first aider is on duty at all times
- First aid kits are checked monthly and restocked as needed
- All accidents are recorded and parents informed

6. HYGIENE
- Hand washing procedures are followed by all staff and children
- Nappy changing areas are cleaned after each use
- Toys and equipment are cleaned regularly
- Kitchen areas meet food hygiene standards

7. ILLNESS & INFECTION CONTROL
- Children who are unwell must not attend nursery
- NHS exclusion periods are followed for infectious illnesses
- Parents are contacted immediately if a child becomes unwell

8. OUTDOOR SAFETY
- Outdoor areas are checked daily before use
- Sun safety measures are in place (hats, sunscreen, shade)
- Appropriate clothing is required for outdoor play

Last reviewed: June 2026
Next review: June 2027`,

  "Behaviour Management Policy": `LITTLE AVA NURSERY
BEHAVIOUR MANAGEMENT POLICY

Company Registration: 17116408 | Location: West Midlands, England

1. POLICY STATEMENT
We believe that children learn best when they feel safe, secure, and valued. Our approach to behaviour management is positive and supportive.

2. PRINCIPLES
- We focus on positive reinforcement and praise
- We set clear, consistent boundaries appropriate to children's age and development
- We model respectful behaviour
- We never use physical punishment or humiliation
- We work in partnership with parents

3. STRATEGIES
- Distraction and redirection for younger children
- Clear, simple explanations of expectations
- Consistent routines to provide security
- Praise and encouragement for positive behaviour
- Natural consequences where appropriate

4. CHALLENGING BEHAVIOUR
When a child displays challenging behaviour:
1. Staff remain calm and use a quiet, firm voice
2. The behaviour is addressed, not the child
3. The child is offered alternative activities
4. Persistent issues are discussed with parents
5. Individual behaviour plans may be created

5. PHYSICAL INTERVENTION
Physical intervention is only used as a last resort to prevent:
- A child from hurting themselves
- A child from hurting others
- Significant damage to property

Any physical intervention is recorded and parents are informed the same day.

Last reviewed: June 2026
Next review: June 2027`,

  "Equal Opportunities & Inclusion Policy": `LITTLE AVA NURSERY
EQUAL OPPORTUNITIES & INCLUSION POLICY

Company Registration: 17116408 | Location: West Midlands, England

1. POLICY STATEMENT
Little Ava Nursery is committed to providing an inclusive environment where every child, family, and staff member is valued and respected regardless of their background.

2. PROTECTED CHARACTERISTICS
We do not discriminate on the basis of:
- Age, disability, gender reassignment
- Marriage/civil partnership, pregnancy/maternity
- Race, religion/belief, sex, sexual orientation

3. INCLUSIVE PRACTICE
- Resources reflect diversity in culture, ethnicity, gender, and ability
- Activities are adapted to meet individual needs
- We celebrate cultural events and festivals
- Staff receive equality and diversity training
- We challenge discriminatory behaviour or language

4. SPECIAL EDUCATIONAL NEEDS & DISABILITIES (SEND)
- We have a designated SENCO (Special Educational Needs Coordinator)
- Individual support plans are created where needed
- We work with external agencies and specialists
- Reasonable adjustments are made to ensure access for all

5. RECRUITMENT
We are an equal opportunities employer and welcome applications from all sections of the community.

Last reviewed: June 2026
Next review: June 2027`,


  "Complaints Procedure": `LITTLE AVA NURSERY
COMPLAINTS PROCEDURE

Company Registration: 17116408 | Location: West Midlands, England

1. POLICY STATEMENT
We aim to provide the highest quality childcare. If parents have concerns or complaints, we want to hear about them so we can resolve issues quickly and improve our service.

2. INFORMAL RESOLUTION
In the first instance, we encourage parents to speak directly with their child's key person or the room leader. Many concerns can be resolved through open communication.

3. FORMAL COMPLAINT PROCESS
Stage 1: Written complaint to the nursery manager within 28 days of the issue
Stage 2: Manager investigates and responds within 10 working days
Stage 3: If unresolved, complaint is escalated to the nursery owner
Stage 4: If still unresolved, parents may contact Ofsted

4. OFSTED CONTACT
Ofsted
Piccadilly Gate, Store Street, Manchester M1 2WD
Tel: 0300 123 1231

5. RECORDS
All complaints are recorded, including:
- Date and nature of complaint
- Action taken
- Outcome
- Parent satisfaction with resolution

Complaint records are available for Ofsted inspection.

Last reviewed: June 2026
Next review: June 2027`,

  "Medication Administration Policy": `LITTLE AVA NURSERY
MEDICATION ADMINISTRATION POLICY

Company Registration: 17116408 | Location: West Midlands, England

1. POLICY STATEMENT
We will only administer medication that has been prescribed by a doctor, dentist, nurse, or pharmacist. Non-prescription medication will only be administered with prior written agreement.

2. REQUIREMENTS
- Medication must be in its original container with pharmacy label
- It must be within its expiry date
- Written consent from parent/carer is required (signed medication form)
- Dosage instructions must be clearly stated

3. ADMINISTRATION
- Two members of staff must be present when medication is given
- The time, dose, and staff member administering are recorded
- Parents sign the medication record at collection

4. STORAGE
- Medication is stored securely, out of children's reach
- Items requiring refrigeration are stored in a designated container
- Emergency medication (e.g., EpiPens, inhalers) is accessible to staff at all times

5. LONG-TERM MEDICATION
For children requiring regular medication, an individual healthcare plan is created in partnership with parents and health professionals.

Last reviewed: June 2026
Next review: June 2027`,

  "Food & Nutrition Policy": `LITTLE AVA NURSERY
FOOD & NUTRITION POLICY

Company Registration: 17116408 | Location: West Midlands, England

1. POLICY STATEMENT
We provide healthy, balanced, and nutritious meals and snacks for all children. We promote positive attitudes towards food and healthy eating habits.

2. MENU PLANNING
- Menus are planned on a rotating basis
- We follow government guidelines for early years nutrition
- Fresh fruit and vegetables are offered daily
- Water is available throughout the day
- We accommodate dietary requirements and allergies

3. ALLERGIES & DIETARY NEEDS
- All allergies and dietary requirements are recorded at registration
- Allergy information is displayed in the kitchen
- Staff are trained in allergy awareness
- Alternative meals are provided where needed

4. MEALTIMES
- Mealtimes are social occasions where children sit together
- Staff eat with children to model healthy eating
- Children are encouraged but never forced to eat
- Independence is promoted (self-serving where appropriate)

5. FOOD HYGIENE
- Kitchen staff hold Level 2 Food Hygiene certificates
- Food preparation areas meet Environmental Health standards
- Temperature checks are recorded daily

Last reviewed: June 2026
Next review: June 2027`,

  "Accident & Incident Policy": `LITTLE AVA NURSERY
ACCIDENT & INCIDENT POLICY

Company Registration: 17116408 | Location: West Midlands, England

1. POLICY STATEMENT
The safety of children is our highest priority. Despite all precautions, accidents may occur. This policy outlines our procedures for dealing with accidents and incidents.

2. FIRST AID
- At least one paediatric first aider is on duty at all times
- First aid is administered promptly and appropriately
- The child's wellbeing and comfort are prioritised

3. RECORDING
All accidents are recorded including:
- Child's name, date, and time
- Nature of injury and how it occurred
- First aid given
- Staff member(s) involved
- Parent notification

4. PARENT NOTIFICATION
- Minor injuries: parents informed at collection and sign accident form
- Significant injuries: parents contacted immediately by phone
- Head injuries: parents always contacted immediately

5. REPORTING TO AUTHORITIES
Serious accidents are reported to:
- Ofsted (within 14 days)
- RIDDOR (where applicable)
- Local Authority (where applicable)

6. PRE-EXISTING INJURIES
If a child arrives with an injury, this is recorded and parents asked to sign a pre-existing injury form.

Last reviewed: June 2026
Next review: June 2027`,

  "Fire Safety & Emergency Evacuation Policy": `LITTLE AVA NURSERY
FIRE SAFETY & EMERGENCY EVACUATION POLICY

Company Registration: 17116408 | Location: West Midlands, England

1. POLICY STATEMENT
Little Ava Nursery takes fire safety extremely seriously. We have comprehensive procedures to protect all children, staff, and visitors in the event of a fire or emergency.

2. PREVENTION
- Electrical equipment is PAT tested annually
- Fire risk assessment is reviewed annually
- Staff receive fire safety training
- Flammable materials are stored safely
- No smoking on premises

3. DETECTION & WARNING
- Smoke detectors in all rooms, tested weekly
- Fire alarm system tested weekly
- Carbon monoxide detectors installed

4. EVACUATION PROCEDURE
1. Person discovering fire raises alarm
2. All staff follow evacuation procedure for their room
3. Children are escorted to assembly point
4. Register is taken to confirm all children and staff present
5. Fire service is called (999)
6. No one re-enters the building until declared safe

5. FIRE DRILLS
- Conducted at least once per half term
- Varied times and scenarios
- Results recorded and reviewed
- Target evacuation time: under 3 minutes

6. ASSEMBLY POINT
The designated assembly point is clearly marked and known to all staff.

Last reviewed: June 2026
Next review: June 2027`,

  "Staff Recruitment & Vetting Policy": `LITTLE AVA NURSERY
STAFF RECRUITMENT & VETTING POLICY

Company Registration: 17116408 | Location: West Midlands, England

1. POLICY STATEMENT
We are committed to recruiting staff who are suitable to work with children. Our robust recruitment procedures help ensure the safety of all children.

2. RECRUITMENT PROCESS
- Clear job descriptions and person specifications
- Advertisements state commitment to safeguarding
- Application forms (not just CVs)
- Face-to-face interviews with safeguarding questions
- Practical tasks/trial sessions where appropriate

3. VETTING CHECKS
Before employment begins:
- Enhanced DBS check with barred list
- Two satisfactory references (one from most recent employer)
- Proof of identity and right to work
- Qualification verification
- Health declaration

4. ONGOING SUITABILITY
- DBS checks renewed every 3 years
- Annual staff appraisals
- Regular supervision meetings
- Ongoing training requirements
- Staff must declare any changes to circumstances

5. DISQUALIFICATION
Staff must declare if they or anyone in their household has been disqualified from working with children.

Last reviewed: June 2026
Next review: June 2027`,

  "Whistleblowing Policy": `LITTLE AVA NURSERY
WHISTLEBLOWING POLICY

Company Registration: 17116408 | Location: West Midlands, England

1. POLICY STATEMENT
Little Ava Nursery encourages all staff to raise concerns about any aspect of the nursery's work. Staff will not be penalised for raising genuine concerns.

2. WHAT TO REPORT
- Concerns about a colleague's behaviour towards children
- Unsafe practices
- Failure to follow policies and procedures
- Financial irregularities
- Any illegal activity

3. HOW TO REPORT
1. Speak to the nursery manager in the first instance
2. If the concern involves the manager, contact the owner directly
3. If internal reporting is not appropriate, contact:
   - Ofsted: 0300 123 1231
   - Local Authority Designated Officer (LADO)
   - NSPCC Whistleblowing Helpline: 0800 028 0285

4. PROTECTION
Staff who raise concerns in good faith are protected from:
- Dismissal
- Victimisation
- Any form of retaliation

5. CONFIDENTIALITY
Concerns will be treated confidentially wherever possible.

Last reviewed: June 2026
Next review: June 2027`,

  "Social Media & Photography Policy": `LITTLE AVA NURSERY
SOCIAL MEDIA & PHOTOGRAPHY POLICY

Company Registration: 17116408 | Location: West Midlands, England

1. POLICY STATEMENT
We recognise the importance of protecting children's images and personal information online. This policy sets out our approach to photography and social media use.

2. PHOTOGRAPHY AT NURSERY
- Only nursery devices are used for photographs
- Personal mobile phones must not be used in childcare areas
- Written parental consent is obtained for all photography
- Photos are stored securely and deleted when no longer needed

3. SOCIAL MEDIA
- Nursery social media accounts are managed by authorised staff only
- Children are never identified by name on social media
- Only children with specific photo consent are featured
- Parents may withdraw consent at any time

4. PARENTS & VISITORS
- Parents must not photograph or film other children at nursery events
- Visitors must hand in mobile phones at reception
- CCTV is in operation for security purposes

5. STAFF PERSONAL USE
- Staff must not post about the nursery or children on personal accounts
- Staff must not be friends with parents on social media
- Breaches of this policy are treated as a disciplinary matter

Last reviewed: June 2026
Next review: June 2027`,

  "Settling In Policy": `LITTLE AVA NURSERY
SETTLING IN POLICY

Company Registration: 17116408 | Location: West Midlands, England

1. POLICY STATEMENT
We understand that starting nursery is a significant transition for children and families. Our settling-in process is designed to be gradual and supportive.

2. BEFORE STARTING
- Home visit or nursery visit arranged
- All About Me form completed by parents
- Key person allocated
- Settling-in schedule agreed with parents

3. SETTLING-IN SESSIONS
Week 1: Short visits (1-2 hours) with parent present
Week 2: Short visits with parent leaving briefly
Week 3: Longer sessions building to full booked hours
(Timescales are flexible based on individual needs)

4. KEY PERSON ROLE
- Builds relationship with child and family
- Provides consistent care and comfort
- Communicates daily with parents
- Adapts approach to individual needs

5. SUPPORTING CHILDREN
- Comfort objects from home are welcome
- Familiar routines are maintained where possible
- Plenty of reassurance and physical comfort
- Gradual introduction to nursery routines

6. COMMUNICATION
Parents receive daily updates during the settling-in period. We encourage open communication about any concerns.

Last reviewed: June 2026
Next review: June 2027`,

  "Key Person Policy": `LITTLE AVA NURSERY
KEY PERSON POLICY

Company Registration: 17116408 | Location: West Midlands, England

1. POLICY STATEMENT
Every child at Little Ava Nursery is assigned a key person who takes responsibility for their care, development, and communication with parents.

2. ROLE OF THE KEY PERSON
- Building a warm, trusting relationship with the child
- Observing and assessing the child's development
- Planning activities to support next steps
- Maintaining the child's learning journal
- Communicating regularly with parents
- Supporting transitions (room moves, school readiness)

3. ALLOCATION
Key persons are allocated based on:
- Room placement and age group
- Staff availability and ratios
- Where possible, continuity of care

4. BUDDY SYSTEM
Each child also has a buddy key person who:
- Knows the child well
- Can provide consistent care during key person absence
- Supports smooth transitions

5. PARTNERSHIP WITH PARENTS
The key person:
- Conducts settling-in sessions
- Shares observations and progress
- Discusses any concerns
- Involves parents in planning

Last reviewed: June 2026
Next review: June 2027`,

  "Nappy Changing & Intimate Care Policy": `LITTLE AVA NURSERY
NAPPY CHANGING & INTIMATE CARE POLICY

Company Registration: 17116408 | Location: West Midlands, England

1. POLICY STATEMENT
We ensure that nappy changing and intimate care are carried out with sensitivity, respect, and dignity for every child.

2. PROCEDURES
- Children are changed promptly when needed
- Nappy changes are recorded (time, staff member, condition)
- Parents are informed of any concerns (e.g., nappy rash)
- Children's preferences and comfort are respected

3. HYGIENE
- Staff wear disposable gloves and aprons
- Changing mats are cleaned after each use
- Hands are washed before and after
- Soiled items are stored in sealed bags

4. SAFEGUARDING
- Nappy changing areas are visible but private
- Staff never change children behind closed doors
- Any marks or injuries are recorded and reported
- Children are never left unattended on changing tables

5. TOILET TRAINING
- We work with parents to support toilet training
- Children are encouraged and praised, never punished for accidents
- Spare clothes are available
- Progress is communicated to parents

Last reviewed: June 2026
Next review: June 2027`,

  "Sleep & Rest Policy": `LITTLE AVA NURSERY
SLEEP & REST POLICY

Company Registration: 17116408 | Location: West Midlands, England

1. POLICY STATEMENT
We recognise that adequate rest and sleep are essential for children's health, growth, and development. We provide safe, comfortable sleeping arrangements.

2. SAFE SLEEP
- Babies are always placed on their backs to sleep
- Sleep area is well-ventilated and at appropriate temperature
- Cots meet British Safety Standards
- No loose bedding, pillows, or toys in cots for babies under 12 months
- Sleeping children are checked every 10 minutes

3. INDIVIDUAL NEEDS
- Sleep routines from home are followed where possible
- Parents' wishes regarding sleep are respected
- Children are never forced to sleep
- Quiet rest activities are available for non-sleepers

4. RECORDING
- Sleep times are recorded for each child
- Parents are informed of sleep patterns
- Any concerns are discussed with parents

5. OLDER CHILDREN
- Rest time is available after lunch
- Quiet activities (books, puzzles) for those who don't sleep
- Children's individual needs are accommodated

Last reviewed: June 2026
Next review: June 2027`,

  "Outdoor Play Policy": `LITTLE AVA NURSERY
OUTDOOR PLAY POLICY

Company Registration: 17116408 | Location: West Midlands, England

1. POLICY STATEMENT
We believe outdoor play is essential for children's physical, emotional, and cognitive development. Children have daily access to outdoor learning environments.

2. PROVISION
- Free-flow access to outdoor areas where possible
- Planned outdoor activities daily
- All-weather approach (we go outside in most conditions)
- Outdoor area offers varied experiences (climbing, digging, nature, creative)

3. SAFETY
- Outdoor areas are checked daily before use
- Equipment is age-appropriate and regularly inspected
- Appropriate adult-to-child ratios are maintained
- Gates and boundaries are secure

4. WEATHER CONSIDERATIONS
- Sun safety: hats, sunscreen (with parental consent), shade available
- Cold weather: appropriate clothing, reduced time if extreme
- Wet weather: waterproofs provided, puddle play encouraged
- Extreme weather: indoor alternatives provided

5. CLOTHING
Parents are asked to provide:
- Waterproof coat and wellies
- Sun hat for summer
- Warm layers for winter
- Spare clothes

Last reviewed: June 2026
Next review: June 2027`,

  "Data Protection & Privacy Policy": `LITTLE AVA NURSERY
DATA PROTECTION & PRIVACY POLICY

Company Registration: 17116408 | Location: West Midlands, England

1. POLICY STATEMENT
Little Ava Nursery is committed to protecting the privacy and personal data of children, families, and staff in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.

2. DATA CONTROLLER
Little Ava Nursery is the data controller. Our Data Protection Officer can be contacted at info@littleavanursery.co.uk.

3. DATA WE COLLECT
- Children: name, date of birth, medical information, dietary needs, development records, photographs
- Parents/Carers: name, address, contact details, emergency contacts, financial information for billing
- Staff: employment records, DBS information, qualifications, training records

4. LAWFUL BASIS
We process data under the following lawful bases:
- Contract: to provide childcare services
- Legal obligation: Ofsted requirements, safeguarding duties
- Legitimate interests: nursery administration, safety
- Consent: photographs, marketing communications

5. DATA SHARING
We may share data with:
- Ofsted (regulatory requirement)
- Local Authority (funded hours, safeguarding)
- Schools (transition reports, with consent)
- Emergency services (in emergencies)

6. DATA RETENTION
Records are retained for the periods required by law:
- Children's records: until child reaches 25 years
- Accident records: 25 years
- Staff records: 6 years after employment ends
- Financial records: 7 years

7. YOUR RIGHTS
Under UK GDPR, you have the right to:
- Access your personal data
- Rectify inaccurate data
- Erase data (where applicable)
- Restrict processing
- Data portability
- Object to processing

8. DATA SECURITY
- Electronic data is password protected and encrypted
- Paper records are stored in locked cabinets
- Access is restricted to authorised personnel
- Staff receive data protection training

9. BREACHES
Any data breach will be reported to the ICO within 72 hours where required, and affected individuals will be notified.

Last reviewed: June 2026
Next review: June 2027`,

  "Parental Involvement Policy": `LITTLE AVA NURSERY
PARENTAL INVOLVEMENT POLICY

Company Registration: 17116408 | Location: West Midlands, England

1. POLICY STATEMENT
We believe that parents are children's first and most important educators. We actively encourage parental involvement in all aspects of nursery life.

2. COMMUNICATION
- Daily updates via our website and direct nursery communication
- Regular newsletters
- Notice boards and displays
- Open-door policy for discussions
- Formal parent consultations twice yearly

3. INVOLVEMENT OPPORTUNITIES
- Stay and play sessions
- Parent workshops and information evenings
- Volunteering opportunities
- Contributing to learning (sharing skills, cultures, experiences)
- Fundraising events
- Feedback surveys

4. INFORMATION SHARING
We share with parents:
- Daily activity reports (meals, naps, activities)
- Developmental observations and next steps
- Photographs of learning
- Termly progress summaries
- Transition reports

5. SUPPORTING FAMILIES
- Signposting to support services
- Information about funded hours and benefits
- Support during difficult times
- Flexible communication methods

Last reviewed: June 2026
Next review: June 2027`,
};

const policies = [
  { name: "Safeguarding & Child Protection Policy", category: "Safeguarding", link: "/safeguarding" },
  { name: "Health & Safety Policy", category: "Health & Safety", link: null },
  { name: "Behaviour Management Policy", category: "Behaviour", link: null },
  { name: "Equal Opportunities & Inclusion Policy", category: "Inclusion", link: null },
  { name: "Complaints Procedure", category: "Complaints", link: null },
  { name: "Data Protection & Privacy Policy", category: "Data", link: "/privacy-policy" },
  { name: "Medication Administration Policy", category: "Health & Safety", link: null },
  { name: "Food & Nutrition Policy", category: "Nutrition", link: "/meals-nutrition" },
  { name: "Accident & Incident Policy", category: "Health & Safety", link: null },
  { name: "Fire Safety & Emergency Evacuation Policy", category: "Health & Safety", link: null },
  { name: "Staff Recruitment & Vetting Policy", category: "Staffing", link: null },
  { name: "Whistleblowing Policy", category: "Safeguarding", link: null },
  { name: "Social Media & Photography Policy", category: "Data", link: null },
  { name: "Settling In Policy", category: "Care", link: null },
  { name: "Key Person Policy", category: "Care", link: null },
  { name: "Nappy Changing & Intimate Care Policy", category: "Care", link: null },
  { name: "Sleep & Rest Policy", category: "Care", link: null },
  { name: "Outdoor Play Policy", category: "Learning", link: null },
  { name: "Parental Involvement Policy", category: "Parents", link: null },
];

export default function Policies() {
  const [, navigate] = useLocation();

  const handleDownload = (policyName: string) => {
    const content = policyContents[policyName];
    if (!content) {
      toast.error("Policy document not yet available for download.");
      return;
    }
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Little_Ava_Nursery_${policyName.replace(/[^a-zA-Z0-9]/g, "_")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Downloaded: ${policyName}`);
  };

  return (
    <PublicLayout>
      <PageHeader
        title="Policies & Documents"
        subtitle="Our comprehensive policies ensure the highest standards of care and compliance."
        breadcrumb="Home / Information / Policies & Documents"
      />

      <section className="section-padding">
        <div className="container max-w-4xl">
          <p className="text-muted-foreground leading-relaxed mb-4">
            Little Ava Nursery maintains comprehensive policies that guide our practice and ensure we meet all regulatory requirements set by Ofsted and the Department for Education. These policies are reviewed regularly and are available for parents to view at any time.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Click "Download" to save a copy of any policy, or "View" to read the full version online where available.
          </p>

          <div className="space-y-3">
            {policies.map((policy) => (
              <Card key={policy.name} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <span className="text-sm font-medium">{policy.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">({policy.category})</span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {policy.link && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(policy.link!)}
                        className="gap-1"
                      >
                        <Eye className="h-3 w-3" /> View
                      </Button>
                    )}
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleDownload(policy.name)}
                      className="gap-1 bg-teal-600 hover:bg-teal-700"
                    >
                      <Download className="h-3 w-3" /> Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-4 bg-teal-50 border border-teal-200 rounded-lg">
            <h3 className="font-semibold text-teal-900 mb-2">Additional Documents</h3>
            <div className="grid sm:grid-cols-2 gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate("/privacy-policy")} className="justify-start gap-2">
                <FileText className="h-4 w-4" /> Privacy Policy
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate("/cookie-policy")} className="justify-start gap-2">
                <FileText className="h-4 w-4" /> Cookie Policy
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate("/terms")} className="justify-start gap-2">
                <FileText className="h-4 w-4" /> Terms & Conditions
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate("/safeguarding")} className="justify-start gap-2">
                <FileText className="h-4 w-4" /> Safeguarding Information
              </Button>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-8 italic">
            Hard copies of all policies are available at the nursery upon request. If you'd like to discuss any of our policies, please <a href="/contact" className="text-primary hover:underline">contact us</a>.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}
