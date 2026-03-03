interface Props {
  title: string;
  value: string;
}

export default function LargeCard({ title, value }: Props) {
  return (
    <div className="rounded-xl border p-6 bg-white">
      <p className="text-muted-foreground">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}
