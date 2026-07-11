import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function HeroStat({ value, label }: { value: string | number; label: string }) {
  return (
    <div>
      <strong className="block text-lg text-yellow-300">{value}</strong>
      <span className="text-[9px] uppercase tracking-[.14em] text-slate-500">{label}</span>
    </div>
  );
}

export function MetricGrid({ metrics }: { metrics: Array<[string | number, string]> }) {
  return (
    <div className="grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
      {metrics.map(([value, label]) => (
        <Card key={label} className="p-5">
          <strong className="block text-2xl text-cyan-300">{value}</strong>
          <span className="text-[10px] uppercase tracking-[.16em] text-slate-500">{label}</span>
        </Card>
      ))}
    </div>
  );
}

export function InfoCard({ code, title, children }: { code: string; title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <p className="section-code">{code}</p>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export function ListingData({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/[.025] p-2">
      <small className="block text-[9px] uppercase text-slate-500">{label}</small>
      <strong>{value}</strong>
    </div>
  );
}

export function FormShell({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4">{children}</div>;
}

export function Input({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-xs uppercase tracking-[.24em] text-slate-400">
      {label}
      <input className="p-4" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

export function Select({ label, value, values, onChange }: { label: string; value: string; values: string[]; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-2 text-xs uppercase tracking-[.24em] text-slate-400">
      {label}
      <select className="p-4" value={value} onChange={(event) => onChange(event.target.value)}>
        {values.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
    </label>
  );
}
