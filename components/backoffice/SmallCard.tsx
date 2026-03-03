interface Props {
  title: string
  value: string | number
  icon?: React.ReactNode
}

export default function SmallCard({ title, value, icon }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
      <div className="bg-muted p-3 rounded-lg">
        {icon}
      </div>

      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <h3 className="text-xl font-semibold">{value}</h3>
      </div>
    </div>
  )
}
