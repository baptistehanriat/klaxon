export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-between px-2.5 py-0.5  items-center text-xs font-semibold bg-green-50 rounded-lg">
      {children}
    </div>
  )
}
