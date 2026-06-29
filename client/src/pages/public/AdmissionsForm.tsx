import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import PublicLayout from "@/components/PublicLayout";
import PageHeader from "@/components/PageHeader";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { CheckCircle2, FileText } from "lucide-react";

export default function AdmissionsForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    // Parent/Guardian Details
    parentFirstName: "",
    parentLastName: "",
    parentEmail: "",
    parentPhone: "",
    parentAddress: "",
    parentPostcode: "",
    relationship: "mother",
    // Second Parent/Guardian
    secondParentName: "",
    secondParentPhone: "",
    secondParentEmail: "",
    // Child Details
    childFirstName: "",
    childLastName: "",
    childDob: "",
    childGender: "",
    // Medical & Dietary
    allergies: "",
    medicalConditions: "",
    dietaryRequirements: "",
    doctorName: "",
    doctorPhone: "",
    // Emergency Contact
    emergencyName: "",
    emergencyRelationship: "",
    emergencyPhone: "",
    // Sessions
    preferredStartDate: "",
    preferredSessions: "",
    fundingCode: "",
    // Consents
    consentPhotos: false,
    consentOutings: false,
    consentMedical: false,
    consentDataProcessing: false,
    consentTerms: false,
    // Additional
    howDidYouHear: "",
    additionalNotes: "",
  });

  const update = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const registerChild = trpc.children.register.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Registration submitted successfully!");
    },
    onError: (err) => toast.error(err.message),
  });

  const handleSubmit = () => {
    registerChild.mutate({
      firstName: formData.childFirstName,
      lastName: formData.childLastName,
      dateOfBirth: formData.childDob,
      gender: (formData.childGender || undefined) as "male" | "female" | "other" | undefined,
      allergies: formData.allergies || undefined,
      medicalInfo: formData.medicalConditions || undefined,
      dietaryRequirements: formData.dietaryRequirements || undefined,
      emergencyContact: `${formData.emergencyName} (${formData.emergencyRelationship})`,
      emergencyPhone: formData.emergencyPhone,
      notes: `Parent: ${formData.parentFirstName} ${formData.parentLastName}, ${formData.parentEmail}, ${formData.parentPhone}. Address: ${formData.parentAddress} ${formData.parentPostcode}. Preferred start: ${formData.preferredStartDate}. Sessions: ${formData.preferredSessions}. Funding: ${formData.fundingCode}. Consents: Photos=${formData.consentPhotos}, Outings=${formData.consentOutings}, Medical=${formData.consentMedical}. Source: ${formData.howDidYouHear}. Notes: ${formData.additionalNotes}`,
    });
  };

  if (submitted) {
    return (
      <PublicLayout>
        <div className="container py-20 text-center max-w-lg mx-auto">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="heading-3 mb-4">Registration Submitted</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for completing the registration form for {formData.childFirstName}. Our team will review your application and be in touch within 2 working days to confirm next steps.
          </p>
          <p className="text-sm text-muted-foreground">
            A confirmation email has been sent to {formData.parentEmail}.
          </p>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <PageHeader
        title="Digital Registration Form"
        subtitle="Complete this form to register your child at Little Ava Nursery. All information is handled securely in accordance with GDPR."
        breadcrumb="Admissions > Registration Form"
      />

      <section className="container py-12 max-w-3xl mx-auto">
        {/* Progress */}
        <div className="flex items-center justify-between mb-8">
          {["Parent Details", "Child Details", "Medical & Dietary", "Sessions & Consent"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${step > i + 1 ? "bg-primary text-white" : step === i + 1 ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
                {step > i + 1 ? "✓" : i + 1}
              </div>
              <span className="text-xs hidden sm:inline">{label}</span>
            </div>
          ))}
        </div>

        {/* Step 1: Parent Details */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Parent/Guardian Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>First Name *</Label><Input required value={formData.parentFirstName} onChange={(e) => update("parentFirstName", e.target.value)} /></div>
                <div><Label>Last Name *</Label><Input required value={formData.parentLastName} onChange={(e) => update("parentLastName", e.target.value)} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Email *</Label><Input type="email" required value={formData.parentEmail} onChange={(e) => update("parentEmail", e.target.value)} /></div>
                <div><Label>Phone *</Label><Input value={formData.parentPhone} onChange={(e) => update("parentPhone", e.target.value)} /></div>
              </div>
              <div>
                <Label>Relationship to Child</Label>
                <Select value={formData.relationship} onValueChange={(v) => update("relationship", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mother">Mother</SelectItem>
                    <SelectItem value="father">Father</SelectItem>
                    <SelectItem value="guardian">Guardian</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Home Address *</Label><Textarea value={formData.parentAddress} onChange={(e) => update("parentAddress", e.target.value)} placeholder="Full address" /></div>
              <div><Label>Postcode *</Label><Input value={formData.parentPostcode} onChange={(e) => update("parentPostcode", e.target.value)} /></div>

              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium text-sm mb-3">Second Parent/Guardian (Optional)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div><Label>Name</Label><Input value={formData.secondParentName} onChange={(e) => update("secondParentName", e.target.value)} /></div>
                  <div><Label>Phone</Label><Input value={formData.secondParentPhone} onChange={(e) => update("secondParentPhone", e.target.value)} /></div>
                  <div><Label>Email</Label><Input value={formData.secondParentEmail} onChange={(e) => update("secondParentEmail", e.target.value)} /></div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => setStep(2)}>Next: Child Details</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Child Details */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Child Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>First Name *</Label><Input required value={formData.childFirstName} onChange={(e) => update("childFirstName", e.target.value)} /></div>
                <div><Label>Last Name *</Label><Input required value={formData.childLastName} onChange={(e) => update("childLastName", e.target.value)} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Date of Birth *</Label><Input type="date" required value={formData.childDob} onChange={(e) => update("childDob", e.target.value)} /></div>
                <div>
                  <Label>Gender</Label>
                  <Select value={formData.childGender} onValueChange={(v) => update("childGender", v)}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={() => setStep(3)}>Next: Medical & Dietary</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Medical & Dietary */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Medical & Dietary Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div><Label>Allergies</Label><Textarea value={formData.allergies} onChange={(e) => update("allergies", e.target.value)} placeholder="List any known allergies (food, environmental, medication)" /></div>
              <div><Label>Medical Conditions</Label><Textarea value={formData.medicalConditions} onChange={(e) => update("medicalConditions", e.target.value)} placeholder="Any medical conditions, ongoing treatments, or special needs" /></div>
              <div><Label>Dietary Requirements</Label><Input value={formData.dietaryRequirements} onChange={(e) => update("dietaryRequirements", e.target.value)} placeholder="e.g., Vegetarian, Halal, Gluten-free" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Doctor/GP Name</Label><Input value={formData.doctorName} onChange={(e) => update("doctorName", e.target.value)} /></div>
                <div><Label>Doctor/GP Phone</Label><Input value={formData.doctorPhone} onChange={(e) => update("doctorPhone", e.target.value)} /></div>
              </div>

              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium text-sm mb-3">Emergency Contact (other than parents)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div><Label>Name *</Label><Input required value={formData.emergencyName} onChange={(e) => update("emergencyName", e.target.value)} /></div>
                  <div><Label>Relationship *</Label><Input required value={formData.emergencyRelationship} onChange={(e) => update("emergencyRelationship", e.target.value)} placeholder="e.g., Grandmother" /></div>
                  <div><Label>Phone *</Label><Input required value={formData.emergencyPhone} onChange={(e) => update("emergencyPhone", e.target.value)} /></div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                <Button onClick={() => setStep(4)}>Next: Sessions & Consent</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Sessions & Consent */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Sessions & Consent</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Preferred Start Date</Label><Input type="date" value={formData.preferredStartDate} onChange={(e) => update("preferredStartDate", e.target.value)} /></div>
                <div>
                  <Label>Preferred Sessions</Label>
                  <Select value={formData.preferredSessions} onValueChange={(v) => update("preferredSessions", v)}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full_day">Full Day (6:30 AM - 6:00 PM)</SelectItem>
                      <SelectItem value="morning">Morning (6:30 AM - 1:00 PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (1:00 PM - 6:00 PM)</SelectItem>
                      <SelectItem value="flexible">Flexible / To discuss</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div><Label>Government Funding Code (if applicable)</Label><Input value={formData.fundingCode} onChange={(e) => update("fundingCode", e.target.value)} placeholder="e.g., 30 hours code" /></div>
              <div><Label>How did you hear about us?</Label><Input value={formData.howDidYouHear} onChange={(e) => update("howDidYouHear", e.target.value)} placeholder="e.g., Google, friend recommendation, local advert" /></div>
              <div><Label>Additional Notes</Label><Textarea value={formData.additionalNotes} onChange={(e) => update("additionalNotes", e.target.value)} placeholder="Anything else you'd like us to know" /></div>

              <div className="border-t pt-4 mt-4">
                <h4 className="font-medium text-sm mb-4">Consent & Agreements</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Checkbox id="photos" checked={formData.consentPhotos} onCheckedChange={(v) => update("consentPhotos", !!v)} />
                    <label htmlFor="photos" className="text-sm leading-tight">I consent to photographs and videos of my child being taken for learning journals, displays, and the nursery's private parent gallery.</label>
                  </div>
                  <div className="flex items-start gap-3">
                    <Checkbox id="outings" checked={formData.consentOutings} onCheckedChange={(v) => update("consentOutings", !!v)} />
                    <label htmlFor="outings" className="text-sm leading-tight">I consent to my child participating in supervised local outings and walks.</label>
                  </div>
                  <div className="flex items-start gap-3">
                    <Checkbox id="medical" checked={formData.consentMedical} onCheckedChange={(v) => update("consentMedical", !!v)} />
                    <label htmlFor="medical" className="text-sm leading-tight">I consent to the nursery seeking emergency medical treatment for my child if I cannot be contacted.</label>
                  </div>
                  <div className="flex items-start gap-3">
                    <Checkbox id="data" checked={formData.consentDataProcessing} onCheckedChange={(v) => update("consentDataProcessing", !!v)} />
                    <label htmlFor="data" className="text-sm leading-tight">I understand that my personal data and my child's data will be processed in accordance with the nursery's Privacy Policy and UK GDPR regulations. *</label>
                  </div>
                  <div className="flex items-start gap-3">
                    <Checkbox id="terms" checked={formData.consentTerms} onCheckedChange={(v) => update("consentTerms", !!v)} />
                    <label htmlFor="terms" className="text-sm leading-tight">I have read and agree to the nursery's Terms & Conditions, including the fees policy and notice period. *</label>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(3)}>Back</Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.consentDataProcessing || !formData.consentTerms || registerChild.isPending}
                >
                  {registerChild.isPending ? "Submitting..." : "Submit Registration"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </section>
    </PublicLayout>
  );
}
