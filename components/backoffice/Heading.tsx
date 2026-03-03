interface Props {
  title: string
  description?: string
}

export default function Heading({ title, description }: Props) {
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
        {title}
      </h1>

      {description && (
        <p className="text-muted-foreground mt-1">
          {description}
        </p>
      )}
    </div>
  )
}
