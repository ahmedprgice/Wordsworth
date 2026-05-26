import { FormEvent, useState } from 'react';
import { ArrowRight, BadgeCheck, Building2, CheckCircle2, Globe2, GraduationCap, Handshake, Mail, School, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/Input';

export function SchoolPartnershipPage() {
  const [schoolName, setSchoolName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!email.trim()) {
      setStatus({ type: 'error', message: 'School email is required.' });
      return;
    }

    setIsSubmitting(true);
    try {
      const composedMessage = [
        `School Name: ${schoolName || '-'}`,
        `Contact Person: ${contactPerson || '-'}`,
        '',
        'Partnership Notes:',
        message || '-',
      ].join('\n');

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          subject: 'School Partnership Inquiry',
          source: 'Home Visa Guide Popup',
          message: composedMessage,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || 'Failed to submit partnership request.');
      }

      setStatus({ type: 'success', message: 'Thanks. Our partnership team will contact your school shortly.' });
      setSchoolName('');
      setContactPerson('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#edf3ff] via-white to-[#f7faff]">
      <section className="relative min-h-[860px] overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(8,31,117,0.56), rgba(8,31,117,0.25)), url('/assets/images/partnership-hero-a.jpg')",
              clipPath: 'polygon(0 0, 100% 0, 0 100%)',
            }}
          />
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(245,162,31,0.42), rgba(11,47,154,0.30)), url('/assets/images/partnership-hero-b.jpg')",
              clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
            }}
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 flex items-center justify-center min-h-[860px]">
          <Card className="w-full max-w-2xl rounded-2xl border border-white/40 bg-white/94 p-6 sm:p-8 text-gray-900 shadow-[0_30px_70px_rgba(5,16,73,0.45)] backdrop-blur-[2px]">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-blue-50 px-4 py-1.5 text-sm font-medium text-brand-blue">
                <Handshake className="w-4 h-4" />
                Institutional Partnership Program
              </span>
              <h1 className="mt-4 text-gray-900 text-3xl sm:text-4xl leading-tight">
                Partner With Wordsworth Language Centre
              </h1>
              <p className="mt-3 text-gray-600">
                Share your school details and our partnership team will contact you directly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <Input
                label="School Name"
                placeholder="Your school name"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
              />
              <Input
                label="Contact Person"
                placeholder="Full name"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
              />
              <Input
                label="School Email *"
                type="email"
                placeholder="school@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div>
                <label htmlFor="partnership-message" className="block mb-2 text-gray-700">Partnership Goals</label>
                <textarea
                  id="partnership-message"
                  className="w-full min-h-28 rounded-lg border-2 border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:border-brand-blue"
                  placeholder="Tell us your expected student volume, timeline, and goals..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              {status && (
                <p className={status.type === 'success' ? 'text-sm text-green-700' : 'text-sm text-red-600'}>
                  {status.message}
                </p>
              )}

              <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className="w-full justify-center">
                {isSubmitting ? 'Submitting...' : 'Submit Partnership Request'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            <p className="mt-4 text-xs text-gray-500 inline-flex items-center gap-2">
              <Mail className="w-4 h-4" />
              This private page is for schools and institutional partners only.
            </p>
          </Card>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="rounded-xl border border-blue-100 bg-white p-5">
              <div className="flex items-center gap-3 text-brand-blue mb-2"><GraduationCap className="w-5 h-5" /> Academic Quality</div>
              <p className="text-gray-600 text-sm">Structured English programs aligned with real learning progression.</p>
            </Card>
            <Card className="rounded-xl border border-blue-100 bg-white p-5">
              <div className="flex items-center gap-3 text-brand-blue mb-2"><Users className="w-5 h-5" /> Admissions Support</div>
              <p className="text-gray-600 text-sm">Dedicated support for your counselors and nominated coordinators.</p>
            </Card>
            <Card className="rounded-xl border border-blue-100 bg-white p-5">
              <div className="flex items-center gap-3 text-brand-blue mb-2"><Globe2 className="w-5 h-5" /> International Pathway</div>
              <p className="text-gray-600 text-sm">Strong pathway model for students planning international study steps.</p>
            </Card>
            <Card className="rounded-xl border border-blue-100 bg-white p-5">
              <div className="flex items-center gap-3 text-brand-blue mb-2"><BadgeCheck className="w-5 h-5" /> Reliable Execution</div>
              <p className="text-gray-600 text-sm">Professional communication, clear timelines, and accountable follow-up.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="rounded-2xl border border-blue-100 bg-white p-6 sm:p-8 md:p-10 shadow-[0_18px_42px_rgba(6,17,90,0.10)]">
            <h2 className="text-gray-900">How The Partnership Starts</h2>
            <div className="mt-6 grid md:grid-cols-3 gap-5">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <div className="flex items-center gap-2 text-brand-blue mb-2"><School className="w-5 h-5" /> Step 1</div>
                <h3 className="text-gray-900">Initial Discussion</h3>
                <p className="text-sm text-gray-600 mt-2">We review your school profile, student needs, and preferred intake model.</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <div className="flex items-center gap-2 text-brand-blue mb-2"><Building2 className="w-5 h-5" /> Step 2</div>
                <h3 className="text-gray-900">Partnership Setup</h3>
                <p className="text-sm text-gray-600 mt-2">We align process, documents, communication channels, and timelines.</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <div className="flex items-center gap-2 text-brand-blue mb-2"><CheckCircle2 className="w-5 h-5" /> Step 3</div>
                <h3 className="text-gray-900">Student Onboarding</h3>
                <p className="text-sm text-gray-600 mt-2">Your students move into a clear onboarding path with ongoing support.</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
