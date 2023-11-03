export function StepIndicators({
  currentStepIndex,
  numberOfSteps,
}: {
  currentStepIndex: number
  numberOfSteps: number
}) {
  return (
    <div className="flex gap-2 items-center">
      {Array.from({ length: numberOfSteps }).map((_, i) => {
        if (i < currentStepIndex) {
          return <Done key={i} />
        }
        if (i === currentStepIndex) {
          return <Doing key={i} />
        }
        return <Todo key={i} />
      })}
    </div>
  )
}

function Done() {
  return <div className="bg-gray-200 rounded-full h-2 w-2"></div>
}

function Doing() {
  return <div className="bg-gray-900 rounded-full h-2.5 w-2.5"></div>
}

function Todo() {
  return <div className="bg-gray-200 rounded-full h-2 w-2"></div>
}
