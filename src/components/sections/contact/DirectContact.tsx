/**
 * DirectContact: LinkedIn and location are always shown. Email and phone
 * appear only when configured (plan 12.1).
 */
import { TextLink } from "@/components/ui/TextLink";
import { directContact } from "@/data/contact";
import { site } from "@/data/site";

export function DirectContact() {
  const rows: Array<{ label: string; value: React.ReactNode }> = [];

  if (site.contact.email) {
    rows.push({
      label: directContact.labels.email,
      value: (
        <TextLink href={`mailto:${site.contact.email}`}>{site.contact.email}</TextLink>
      ),
    });
  }
  if (site.contact.phone) {
    rows.push({
      label: directContact.labels.phone,
      value: (
        <TextLink href={`tel:${site.contact.phone.replace(/\s+/g, "")}`}>
          {site.contact.phone}
        </TextLink>
      ),
    });
  }
  rows.push({
    label: directContact.labels.linkedin,
    value: (
      <TextLink href={site.contact.linkedin} external>
        {site.contact.linkedinLabel}
      </TextLink>
    ),
  });
  rows.push({ label: directContact.labels.location, value: site.location });

  return (
    <div>
      <h2 className="type-h3 text-fg">{directContact.heading}</h2>
      <p className="type-body mt-2 text-fg-muted">{directContact.intro}</p>
      <dl className="mt-8 flex flex-col">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-1 gap-1 border-t border-line py-4 sm:grid-cols-[160px_1fr]"
          >
            <dt className="type-eyebrow pt-1 text-fg-eyebrow">{row.label}</dt>
            <dd className="type-body text-fg">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
