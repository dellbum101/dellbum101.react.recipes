export async function getPlanForDay(day: Date) {
  const response = await fetch(
    `http://localhost:3000/api/planner/getPlanForDay?day=${day
      .toISOString()
      .substring(0, 10)}`
  )
  return response.json()
}
