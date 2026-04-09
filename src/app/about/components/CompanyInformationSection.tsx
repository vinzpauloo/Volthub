import { companyInformation } from "./data";

export default function CompanyInformationSection() {
  const {
    legalName,
    tradeName,
    incorporationDate,
    incorporationPlace,
    registeredOffice,
    founders,
    registrations,
  } = companyInformation;

  return (
    <section
      aria-labelledby="company-information-heading"
      className="bg-white rounded-none md:rounded-3xl shadow-lg p-6 md:p-10 border border-gray-100"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
            Company Information
          </p>
          <h2
            id="company-information-heading"
            className="text-3xl font-semibold text-gray-900"
          >
            Registered Philippine Corporation
          </h2>
          <p className="text-gray-600 mt-3">
            VoltHub is a duly registered Philippine domestic corporation.
            Our official registration details are provided below for
            transparency and verification.
          </p>
        </div>

        <dl className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2 rounded-2xl border border-gray-100 bg-gray-50 p-6">
            <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Legal Name
            </dt>
            <dd className="mt-2 text-lg font-semibold text-gray-900">
              {legalName}
            </dd>
            <dd className="mt-1 text-sm text-gray-600">
              doing business as &ldquo;{tradeName}&rdquo;
            </dd>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
            <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Incorporated
            </dt>
            <dd className="mt-2 text-base text-gray-900">
              {incorporationDate}
            </dd>
            <dd className="mt-1 text-sm text-gray-600">
              {incorporationPlace}
            </dd>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
            <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Founders
            </dt>
            <dd className="mt-2 text-base text-gray-900">
              <ul className="space-y-1">
                {founders.map((founder) => (
                  <li key={founder}>{founder}</li>
                ))}
              </ul>
            </dd>
          </div>

          <div className="md:col-span-2 rounded-2xl border border-gray-100 bg-gray-50 p-6">
            <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Registered Office
            </dt>
            <dd className="mt-2 text-base text-gray-900 leading-relaxed">
              {registeredOffice}
            </dd>
          </div>

          {registrations.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-gray-100 bg-gray-50 p-6"
            >
              <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                {item.label}
              </dt>
              <dd className="mt-2 text-base text-gray-900 break-words">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
